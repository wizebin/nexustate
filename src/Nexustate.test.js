import Nexustate, { getLocalStorageLoadFunc, getLocalStorageSaveFunc } from './Nexustate';
import { expect } from 'chai';
import { equal } from 'assert';
const TEST_STORAGE_KEY = 'TESTTESTTEST';

describe('Nexustate', () => {
  describe('Save and load', () => {
    it('saves and loads as expected', () => {
      const manager = new Nexustate({ persist: true, storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      const manager2 = new Nexustate({ persist: true, storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });

      manager.assign(null, { hello: 'world' }, { immediatePersist: true });

      expect(manager.get('hello')).to.deep.equal('world');
      expect(manager2.get('hello')).to.deep.equal(undefined);

      manager.save();
      manager2.load();

      expect(manager.get('hello')).to.deep.equal('world');
      expect(manager2.get('hello')).to.deep.equal('world');
    });

    it('loads promises', (done) => {
      const manager = new Nexustate({ persist: true, storageKey: TEST_STORAGE_KEY, loadCallback: () => Promise.resolve({ a: 'b' }) });

      manager.load().then(() => {
        expect(manager.get('a')).to.deep.equal('b');
        done();
      });
    });

    it('does not persist when the user configures that', () => {
      const manager = new Nexustate({ persist: false, storageKey: TEST_STORAGE_KEY });
      const manager2 = new Nexustate({ persist: false, storageKey: TEST_STORAGE_KEY, loadCallback: () => ({}) });

      manager.assign(null, { NO: 'SAVING' }, { immediatePersist: true });
      manager2.load();

      expect(manager.get('NO')).to.deep.equal('SAVING');
      expect(manager2.get('NO')).to.deep.equal(undefined);
    });

    it('notifies listeners of changes', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.setKey(['a', 'b'], 'Hello world');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal('Hello world');
    });

    it('notifies null key listeners of changes', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: null, callback, alias: 'boop' });
      manager.setKey(['a', 'b'], 'Hello world');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal({ a: { b: 'Hello world' } });
    });

    it('notifies blank key listeners of changes', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: [], callback, alias: 'boop' });
      manager.setKey(['a', 'b'], 'Hello world');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal({ a: { b: 'Hello world' } });
    });

    it('allows assign, set, and delete', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });

      manager.setKey(['a', 'b'], 'Hello world');
      manager.assign('a', { c: 'ohio' })
      expect(manager.get([])).to.deep.equal({ a: { b: 'Hello world', c: 'ohio' } });

      manager.set('a', { c: 'ohio' })
      expect(manager.get([])).to.deep.equal({ a: { c: 'ohio' } });

      manager.delete(['a', 'c'])
      expect(manager.get([])).to.deep.equal({ a: {} });
    });

    it('notifies children of deletion', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });

      manager.set([], { a: { b: { c: 'hi', d: { e: 'nested' } } } });

      let passedData = null;
      const callback = changes => { passedData = changes; };
      manager.listen({ key: 'a.b.c', callback, alias: 'boop' });
      manager.delete(['a', 'b']);

      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal(undefined);


      manager.set([], { a: { b: { c: 'hi', d: { e: 'nested' } } } });

      passedData = null;

      manager.listen({ key: 'a.b.d.e', callback, alias: 'flop' });
      manager.set('a.b.d', { f: 'not nested' });

      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].key).to.deep.equal('a.b.d.e');
      expect(passedData[0].value).to.deep.equal(undefined);
    });

    it('notifies listeners of multiple changes in one event', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.setKey(['a', 'b', 'c'], 'first');
      manager.setKey(['a', 'b', 'd'], 'second');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal({ c: 'first', d: 'second' });
    });

    it('notifies listeners of multiple changes with transforms correctly', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      const passedData = [];
      const callback = changes => { passedData.push(changes); };

      manager.listen({ key: 'a.b.c', callback, alias: 'boop', transform: value => `___${value}` });
      manager.listen({ key: 'a.b.d', callback, alias: 'conrad', transform: value => `___${value}` });
      manager.setKey(['a', 'b', 'c'], 'first');
      manager.setKey(['a', 'b', 'd'], 'second');
      expect(passedData.length).to.deep.equal(2);
      expect(passedData[0][0].value).to.deep.equal('___first');
      expect(passedData[1][0].value).to.deep.equal('___second');
    });

    it('notifies listeners of multiple changes with transforms correctly when using object notation', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      const passedData = [];
      const callback = changes => { passedData.push(changes); };

      manager.listen({ key: 'a.b.c', callback, alias: 'boop', transform: value => `+++${value}` });
      manager.listen({ key: 'a.b.d', callback, alias: 'conrad', transform: value => `+++${value}` });
      manager.setKey(['a', 'b'], { c: 'first', d: 'second' });
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0][0].value).to.deep.equal('+++first');
      expect(passedData[0][1].value).to.deep.equal('+++second');
    });

    it('notifies listeners of changes to subpaths', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: 'a', callback, alias: 'boop' });
      manager.setKey(['a', 'b'], 'Hello world');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal({ b: 'Hello world' });
    });

    it('only notifies listeners of changes once when the user re-listens', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let counter = 0;
      const callback = () => { counter += 1; };

      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.setKey(['a', 'b'], 'Hello world');
      expect(counter).to.deep.equal(1);
    });

    it('skips notifying parents of updates when they request noChildUpdates', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let counter = 0;
      const callback = () => { counter += 1; };

      manager.listen({ key: 'a.b', callback, alias: 'boop', noChildUpdates: true });
      manager.setKey(['a', 'b'], { c: 5 }); // Should get a notification
      expect(counter).to.deep.equal(1);
      manager.setKey(['a', 'b', 'c'], 6); // Should not get a notification
      expect(counter).to.deep.equal(1);
      manager.setKey(['a'], { b: { c: 5 } }); // Should get a notification
      expect(counter).to.deep.equal(2);
    });

    it('allows listeners to unlisten', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let untouchedData = null;

      const overwriteCallback = (data) => { untouchedData = data; };

      manager.listen({ key: 'a', callback: overwriteCallback, alias: 'bop' });
      manager.unlisten('a', overwriteCallback);
      manager.setKey(['a', 'b'], 'Hello world');
      expect(untouchedData).to.equal(null);
    });

    it('allows listeners to unlisten by component', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY, saveCallback: getLocalStorageSaveFunc(), loadCallback: getLocalStorageLoadFunc() });
      let untouchedData = null;

      const overwriteCallback = (data) => { untouchedData = data; };

      manager.listen({ key: 'a', component: 5, callback: overwriteCallback, alias: 'bop' });
      manager.listen({ key: 'a.b', component: 5, callback: overwriteCallback, alias: 'bop' });
      manager.unlistenComponent(5);
      manager.setKey(['a', 'b'], 'Hello world');
      expect(untouchedData).to.equal(null);
    });

    describe('wraps essential functions from storageManager', () => {
      it('wraps assureExists', () => {
        const manager = new Nexustate();
        let gotCalled = false;
        manager.listen({ key: 'a.b.c', callback: () => {gotCalled = true} });
        manager.assureExists('a.b.c', 'testme');
        expect(manager.get(null)).to.deep.equal({ a: { b: { c: 'testme' }}})
        expect(gotCalled).to.equal(true);
      });
      it('wraps has', () => {
        const manager = new Nexustate();
        expect(manager.has('a.b.c')).to.equal(false);
        manager.set('a.b.c', 2193923);
        let gotCalled = false;
        manager.listen({ key: 'a.b.c', callback: () => {gotCalled = true} });
        expect(manager.has('a.b.c')).to.equal(true);
        expect(gotCalled).to.equal(false);
      });
      it('wraps get with default', () => {
        const manager = new Nexustate();
        let gotCalled = false;
        manager.listen({ key: 'a.b.c', callback: () => {gotCalled = true} });
        expect(manager.get('a.b.c')).to.equal(undefined);
        expect(manager.get('a.b.c', 'defaut')).to.equal('defaut');
        expect(gotCalled).to.equal(false);
      });
      it('wraps assign', () => {
        const manager = new Nexustate();
        manager.set('d.e.f', { p: 1 });
        let gotCalled = false;
        manager.listen({ key: 'd.e.f', callback: () => {gotCalled = true} });
        manager.assign(['d', 'e', 'f'], { q: 9 });
        expect(manager.get('d.e.f')).to.deep.equal({ p: 1, q: 9 })
        expect(gotCalled).to.equal(true);
      });
    });
  });
});
