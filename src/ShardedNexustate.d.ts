import Nexustate from './nexustate';

type nexustateOptions = {
  saveCallback: (string, any) => boolean,
  loadCallback: (string) => any,
  storageKey: string,
  persist: boolean
};

type shardOptionType = {
  name: string,
  options: nexustateOptions[],
}

type loadShardInputType = string[] | shardOptionType[];

declare class ShardedNexustate {
  getShard(string): Nexustate
  createShard(string, nexustateOptions): Nexustate
  getAllShards(): Nexustate[]
  setAllPersistenceFunctions(saveCallback, loadCallback): void
  loadShards(loadShardInputType)
}

export default ShardedNexustate;
