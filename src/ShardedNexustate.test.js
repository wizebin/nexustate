import ShardedNexustate from './ShardedNexustate';
import { expect } from 'chai';
import { equal } from 'assert';

describe('ShardedNexustate', () => {
  describe('general functionality', () => {
    it('allows the user to update all persistence mechanisms', () => {
      const shards = new ShardedNexustate();
      let tempSaving = null;
      let tempLoading = null;
      const defaultShard = shards.getShard();

      const originalSaveCallback = defaultShard.saveCallback;
      const originalLoadCallback = defaultShard.loadCallback;

      shards.setAllPersistenceFunctions(((...saving) => tempSaving = saving), ((...loading) => tempLoading = loading));

      expect(defaultShard.saveCallback).to.not.equal(originalSaveCallback);
      expect(defaultShard.loadCallback).to.not.equal(originalLoadCallback);

      expect(tempSaving).to.equal(null);

      defaultShard.setKey(['a', 'b'], 'hi');

      expect(tempSaving).to.deep.equal(['default', { a: { b: 'hi' } }]);
    });
    it('allows multiple independent shards', () => {
      const shards = new ShardedNexustate();

      let tempSaving = null;
      let tempLoading = null;

      const defaultShard = shards.getShard();

      shards.setAllPersistenceFunctions(
        ((...saving) => {
          tempSaving = saving;
        }),
        ((...loading) => {
          tempLoading = loading;
        }));

      const tempShard = shards.getShard('temp', { persist: true });

      defaultShard.setKey(['a', 'b'], 'hi', { immediatePersist: true }); // immediatePersist is important unless you want to delay

      expect(tempSaving).to.deep.equal(['default', { a: { b: 'hi' } }]);

      tempShard.setKey(['c', 'd'], 'bye', { immediatePersist: true }); // immediatePersist is important unless you want to delay

      expect(tempSaving).to.deep.equal(['temp', { c: { d: 'bye' } }]);
    });
  });
});
