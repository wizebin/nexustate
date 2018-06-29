import ShardedNexustate from './ShardedNexustate';
import { expect } from 'chai';
import { equal } from 'assert';

describe('ShardedNexustate', () => {
  describe('general functionality', () => {
    it('allows the user to update all persistence mechanisms', () => {
      const shards = new ShardedNexustate();
      let tempSaving = null;
      let tempLoading = null;
      const defaultShard = shards.getShard('default', { persist: true });

      const originalSaveCallback = defaultShard.saveCallback;
      const originalLoadCallback = defaultShard.loadCallback;

      shards.setAllPersistenceFunctions(((...saving) => tempSaving = saving), ((...loading) => tempLoading = loading));

      expect(defaultShard.saveCallback).to.not.equal(originalSaveCallback);
      expect(defaultShard.loadCallback).to.not.equal(originalLoadCallback);

      expect(tempSaving).to.equal(null);

      defaultShard.setKey(['a', 'b'], 'hi', { immediatePersist: true });

      expect(tempSaving).to.deep.equal(['default', { a: { b: 'hi' } }]);
    });
    it('allows multiple independent shards', () => {
      const shards = new ShardedNexustate();

      let tempSaving = null;
      let tempLoading = null;

      const defaultShard = shards.getShard('default', { persist: true });

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
    it('loads shards using loadShards', () => {
      const state = new ShardedNexustate({ saveCallback: () => {}, loadCallback: name => Promise.resolve({ name }) });
      state.loadShards([
        { name: 'default', persist: true },
        { name: 'test', persist: true },
        { name: 'third', persist: false },
      ]).then(result => {
        expect(state.getAllShards()).to.have.keys(['default', 'test', 'third']);

        expect(state.getShard('test').get([])).to.deep.equal({ name: 'test' });
        expect(state.getShard('default').get([])).to.deep.equal({ name: 'default' });
        expect(state.getShard('third').get([])).to.deep.equal({ name: 'third' });

        expect(state.getShard('test').persist).to.deep.equal(true);
        expect(state.getShard('default').persist).to.deep.equal(true);
        expect(state.getShard('third').persist).to.deep.equal(false);
      });

    });
  });
});
