import Nexustate from './Nexustate';
import { values, getTypeString } from 'objer';

export default class ShardedNexustate {
  constructor({ saveCallback, loadCallback } = {}) {
    this.dataManagerShards = {};
    this.defaultOptions = {
      saveCallback,
      loadCallback
    };
  }

  setAllPersistenceFunctions(saveCallback, loadCallback) {
    this.defaultOptions.saveCallback = saveCallback;
    this.defaultOptions.loadCallback = loadCallback;
    values(this.dataManagerShards).forEach(manager => {
      manager.setPersistenceFunctions(saveCallback, loadCallback)
    });
  }

  getShard = (shard = 'default', options) => {
    if (!this.dataManagerShards[shard]) {
      const passOptions = Object.assign({ storageKey: shard }, this.defaultOptions || {}, options || {});
      this.dataManagerShards[shard] = new Nexustate(passOptions);
    }
    return this.dataManagerShards[shard];
  }

  createShard = (shard, options) => {
    return this.getShard(shard, options);
  }

  getAllShards = () => {
    return this.dataManagerShards;
  }

  loadShards = (shardList) => {
    const promises = [];
    (shardList || []).forEach(shard => {
      const typeString = getTypeString(shard);
      let loadedShard = null;
      if (typeString === 'object') {
        const { name, persist } = shard;
        loadedShard = this.getShard(name, { persist });
        loadedShard.setOptions({ persist });
      } else if (typeString === 'string') {
        loadedShard = this.getShard(shard);
      }

      if (loadedShard) {
        const loadResult = loadedShard.load();
        const loadResultType = getTypeString(loadResult);
        if (loadResultType === 'promise' || loadResult instanceof Promise) {
          promises.push(loadResult);
        } else {
          promises.push(Promise.resolve(loadResult));
        }
      }
    });
    return Promise.all(promises);
  }
}
