import getNexustate from './getNexustate';
import { expect } from 'chai';
import { getLocalStorageLoadFunc, getLocalStorageSaveFunc } from './Nexustate';
const TEST_STORAGE_KEY = 'TESTTESTTEST';

describe('getNexustate', () => {
  describe('default', () => {
    it('returns instances correctly', () => {
      const first = getNexustate();
      const second = getNexustate();

      expect(first).to.equal(second);
    });
    it('sets default options if uncreated', () => {
      const instance = getNexustate('something', { persist: false });
      const second = getNexustate('something', { persist: true });

      expect(instance.persist).to.equal(false);
      expect(second.persist).to.equal(false);
      expect(second.storageKey).to.not.equal(undefined);
    });
    it('sets storage key correctly', () => {
      const first = getNexustate();
      const second = getNexustate('anything', { persist: true, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      const third = getNexustate('third');

      expect(first.storageKey).to.equal('default');
      expect(second.storageKey).to.not.equal(first.storageKey);
      expect(third.storageKey).to.not.equal(second.storageKey);
      expect(third.storageKey).to.not.equal(first.storageKey);
    });
  });
});
