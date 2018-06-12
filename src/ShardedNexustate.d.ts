import Nexustate from './nexustate';

declare class ShardedNexustate {
  getShard(string): Nexustate
  createShard(string): Nexustate
  setAllPersistenceFunctions(saveCallback, loadCallback): void
}

export default ShardedNexustate;
