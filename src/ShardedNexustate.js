import Nexustate, { DEFAULT_STORAGE_KEY } from './Nexustate';
import { values, getTypeString } from 'objer';

export default class ShardedNexustate {
  constructor() {
    this.dataManagerShards = {
      default: new Nexustate(),
      cache: new Nexustate({ noPersist: true }),
    };
    this.defaultOptions = {};
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
      const storageKey = shard === 'default' ? DEFAULT_STORAGE_KEY : `${DEFAULT_STORAGE_KEY}_${shard}`;
      const passOptions = Object.assign({ storageKey }, this.defaultOptions || {}, options || {});
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
    (shardList || []).forEach(shard => {
      const typeString = getTypeString(shard);
      let loadedShard = null;
      if (typeString === 'object') {
        const { name, options } = shard;
        loadedShard = this.getShard(name, options);
      } else if (typeString === 'string') {
        loadedShard = this.getShard(shard);
      }

      if (loadedShard) {
        loadedShard.load();
      }
    });
  }
}
