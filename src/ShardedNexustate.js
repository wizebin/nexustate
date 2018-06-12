import getNexustate from './getNexustate';
import { values } from 'objer';

export default class ShardedNexustate {
  constructor() {
    this.dataManagerShards = {
      default: getNexustate(),
      cache: getNexustate('cache', { noPersist: true }),
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
      const passOptions = Object.assign({}, this.defaultOptions || {}, options || {});
      this.dataManagerShards[shard] = getNexustate(shard, passOptions);
    }
    return this.dataManagerShards[shard];
  }

  createShard = (shard, options) => {
    return this.getShard(shard, options);
  }
}
