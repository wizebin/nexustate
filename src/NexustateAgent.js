import { set } from 'objer';
import clone from 'clone';
import getShardedNexustate from './getShardedNexustate';

function getUnclonedComposedState(initialData, key, value) {
  if (key === null) return value;

  set(initialData, key, value);
  return initialData;
}

function getClonedComposedState(initialData, key, value) {
  return getUnclonedComposedState(clone(initialData), key, value);
}

export default class NexustateAgent {
  constructor({ shardedNexustate = null, cloneBeforeSet = false, onChange = null } = {}) {
    this.data = {};
    this.onChange = onChange;
    this.shardState = shardedNexustate || getShardedNexustate();

    if (cloneBeforeSet) {
      this.getComposedState = getClonedComposedState;
    } else {
      this.getComposedState = getUnclonedComposedState;
    }
  }

  createShard = (shard, options) => {
    return this.shardState.createShard(shard, options);
  }

  cleanup() {
    return this.unlistenFromAll();
  }

  unlisten = (key, { shard = 'default', resetState = false } = {}) => {
    const result = this.shardState.getShard(shard).unlisten(key, this.handleChange);
    if (resetState) this.data = {};
    return result;
  }

  unlistenFromAll = ({ resetState = true } = {}) => {
    const shards = values(this.shardState.getAllShards());
    for (let sharddex = 0; sharddex < shards.length; sharddex += 1) {
      shards[sharddex].unlistenComponent(this);
    }
    if (resetState) this.data = {};
  }

  setComposedState = (key, value) => {
    this.data = this.getComposedState(this.data, key, value)
  }

  listen = (listener = { shard: 'default', key: '', alias: null, transform: null, initialLoad: true, noChildUpdates: false, noParentUpdates: false }) => {
    const manager = this.shardState.getShard(listener.shard);
    const modifiedListener = { ...listener, callback: this.handleChange, component: this };
    manager.listen(modifiedListener);

    if (listener.initialLoad) {
      const listenData = manager.getForListener(modifiedListener);
      this.setComposedState(listenData.alias || listenData.key, listenData.value)
    }
  }

  multiListen = (listeners, { initialLoad = false } = {}) => {
    for (let listenerdex = 0; listenerdex < listeners.length; listenerdex += 1) {
      this.listenForChange(listeners[listenerdex]);
      if (initialLoad) {
        const manager = this.shardState.getShard(listeners[listenerdex].shard || 'default');
        const listenData = manager.getForListener(listeners[listenerdex]);
        this.setComposedState(listenData.alias || listenData.key, listenData.value)
      }
    }
  }

  handleChange = (changeEvents) => {
    for (let changedex = 0; changedex < changeEvents.length; changedex += 1) {
      const changeEvent = changeEvents[changedex];
      const { alias, key, value } = changeEvent;
        this.setComposedState(alias || key, value);
    }

    if (this.onChange) {
      this.onChange(this.data);
    }
  }

  get = (path, { shard = 'default' } = {}) => {
    return this.shardState.getShard(shard).get(path);
  }

  delete = (path, { shard = 'default' } = {}) => {
    return this.shardState.getShard(shard).delete(path);
  }

  set = (path, data, { shard = 'default' } = {}) => {
    return this.shardState.getShard(shard).setKey(path, data);
  }

  push = (path, data, { shard = 'default' } = {}) => {
    return this.shardState.getShard(shard).push(path, data);
  }

  getShard = (shard = 'default') => {
    return this.shardState.getShard(shard);
  }
}