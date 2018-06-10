import getNexustate from './getNexustate';
import { DEFAULT_STORAGE_KEY } from './Nexustate';
import { expect } from 'chai';
import { equal } from 'assert';
const TEST_STORAGE_KEY = 'TESTTESTTEST';

describe('getNexustate', () => {
  describe('default', () => {
    it('returns instances correctly', () => {
      const first = getNexustate();
      const second = getNexustate();

      expect(first).to.equal(second);
    });
    it('sets default options if uncreated', () => {
      const instance = getNexustate('something', { noPersist: true });
      const second = getNexustate('something', { noPersist: false });

      expect(instance.noPersist).to.equal(true);
      expect(second.noPersist).to.equal(true);
      expect(second.storageKey).to.not.equal(undefined);
    });
    it('sets storage key correctly', () => {
      const first = getNexustate();
      const second = getNexustate('anything', { noPersist: false });
      const third = getNexustate('third');

      expect(first.storageKey).to.equal(DEFAULT_STORAGE_KEY);
      expect(second.storageKey).to.not.equal(first.storageKey);
      expect(third.storageKey).to.not.equal(second.storageKey);
      expect(third.storageKey).to.not.equal(first.storageKey);
    });
  });
});
