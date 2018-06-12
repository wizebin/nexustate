import Nexustate from './nexustate';

type nexustateOptions = {
  saveCallback: (string, any) => any,
  loadCallback: (string) => any,
  storageKey: string,
  noPErsist: boolean
};

declare class ShardedNexustate {
  getShard(string): Nexustate
  createShard(string, nexustateOptions): Nexustate
  setAllPersistenceFunctions(saveCallback, loadCallback): void
}

export default ShardedNexustate;
