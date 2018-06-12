import ShardedNexustate from './ShardedNexustate';

export function getShardedNexustate() {
  if (!getShardedNexustate.shardedNexustate) {
    getShardedNexustate.shardedNexustate = new ShardedNexustate();
  }

  return getShardedNexustate.shardedNexustate;
}
