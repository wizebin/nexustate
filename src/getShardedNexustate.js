import ShardedNexustate from './ShardedNexustate';

export default function getShardedNexustate() {
  if (!getShardedNexustate.shardedNexustate) {
    getShardedNexustate.shardedNexustate = new ShardedNexustate();
  }

  return getShardedNexustate.shardedNexustate;
}
