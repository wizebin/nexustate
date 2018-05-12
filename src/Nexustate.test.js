import Nexustate from './Nexustate';
import { expect } from 'chai';
import { equal } from 'assert';
const TEST_STORAGE_KEY = 'TESTTESTTEST';

describe('Nexustate', () => {
  describe('Save and load', () => {
    it('saves and loads as expected', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
      const manager2 = new Nexustate({ storageKey: TEST_STORAGE_KEY });

      manager.set({ hello: 'world' }, { immediatePersist: true });

      expect(manager.get('hello')).to.deep.equal('world');
      expect(manager2.get('hello')).to.deep.equal(undefined);

      manager.save();
      manager2.load();

      console.log(manager2.storageManager.data);

      expect(manager.get('hello')).to.deep.equal('world');
      expect(manager2.get('hello')).to.deep.equal('world');
    });

    it('does not persist when the user configures that', () => {
      const manager = new Nexustate({ noPersist: true, storageKey: TEST_STORAGE_KEY });
      const manager2 = new Nexustate({ noPersist: true, storageKey: TEST_STORAGE_KEY });

      manager.set({ NO: 'SAVING' }, { immediatePersist: true });
      manager2.load();

      expect(manager.get('NO')).to.deep.equal('SAVING');
      expect(manager2.get('NO')).to.deep.equal(undefined);
    });

    it('notifies listeners of changes', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.setKey(['a', 'b'], 'Hello world');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal('Hello world');
    });

    it('notifies listeners of multiple changes in one event', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: 'a.b', callback, alias: 'boop' });
      manager.setKey(['a', 'b', 'c'], 'first');
      manager.setKey(['a', 'b', 'd'], 'second');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal({ c: 'first', d: 'second' });
    });

    it('notifies listeners of multiple changes with transforms correctly', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
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
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
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
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
      let passedData = null;
      const callback = changes => { passedData = changes; };

      manager.listen({ key: 'a', callback, alias: 'boop' });
      manager.setKey(['a', 'b'], 'Hello world');
      expect(passedData.length).to.deep.equal(1);
      expect(passedData[0].value).to.deep.equal({ b: 'Hello world' });
    });

    it('only notifies listeners of changes once when the user re-listens', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
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

    it('allows listeners to unlisten', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
      let untouchedData = null;

      const overwriteCallback = (data) => { untouchedData = data; };

      manager.listen({ key: 'a', callback: overwriteCallback, alias: 'bop' });
      manager.unlisten('a', overwriteCallback);
      manager.setKey(['a', 'b'], 'Hello world');
      expect(untouchedData).to.equal(null);
    });

    it('allows listeners to unlisten by component', () => {
      const manager = new Nexustate({ storageKey: TEST_STORAGE_KEY });
      let untouchedData = null;

      const overwriteCallback = (data) => { untouchedData = data; };

      manager.listen({ key: 'a', component: 5, callback: overwriteCallback, alias: 'bop' });
      manager.listen({ key: 'a.b', component: 5, callback: overwriteCallback, alias: 'bop' });
      manager.unlistenComponent(5);
      manager.setKey(['a', 'b'], 'Hello world');
      expect(untouchedData).to.equal(null);
    });
  });
});
