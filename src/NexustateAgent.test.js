import NexustateAgent from './NexustateAgent';
import { expect } from 'chai';
import ShardedNexustate from './ShardedNexustate';

describe('Nexustate Agent', () => {
  describe('General Functionality', () => {
    it('Loads data from multiple shards', () => {
      let tempData;
      let tempData2;

      // Two agents in the application, each are listening to the global shardedNexustate from getShardedNexustate()
      const agent = new NexustateAgent({ onChange: data => (tempData = data) });
      const agent2 = new NexustateAgent({ onChange: data => (tempData2 = data) });

      // The agents are listening to the same data, but aliased to different keys
      agent.listen({ key: 'test', alias: 'foop' });
      agent2.listen({ key: 'test', alias: 'bar' });

      // The agents are using different transform functions
      agent.listen({ shard: 'second', key: 'barge', alias: 'foop2', transform: thing => 'first' + thing });
      agent2.listen({ shard: 'second', key: 'barge', alias: 'baz', transform: thing => 'second' + thing });

      agent.set('test', { a: 'b' });

      expect(tempData).to.deep.equal({ foop: { a: 'b' } });
      expect(tempData2).to.deep.equal({ bar: { a: 'b' } });

      agent.set('barge', 99, { shard: 'second' });

      // The data ends up in different forms depending on aliases and transform functions
      expect(tempData).to.deep.equal({ foop: { a: 'b' }, foop2: 'first99' });
      expect(tempData2).to.deep.equal({ bar: { a: 'b' }, baz: 'second99' });
    });
    it('Operates independently based on input shardedNexustate', () => {
      let tempData;
      let tempData2;

      const state1 = new ShardedNexustate();
      const state2 = new ShardedNexustate();

      const agent = new NexustateAgent({ onChange: data => (tempData = data), shardedNexustate: state1 });
      const agent2 = new NexustateAgent({ onChange: data => (tempData2 = data), shardedNexustate: state2 });

      agent.listen({ key: 'test', alias: 'foop' });
      agent2.listen({ key: 'test', alias: 'foop' });

      agent.listen({ shard: 'second', key: 'barge', alias: 'foop2', transform: thing => 'first' + thing });
      agent2.listen({ shard: 'second', key: 'barge', alias: 'foop2', transform: thing => 'first' + thing });

      agent.set('test', { a: 'b' });

      expect(tempData).to.deep.equal({ foop: { a: 'b' } });
      expect(tempData2).to.deep.equal(undefined);

      agent2.set('barge', 99, { shard: 'second' });

      // The data ends up in different forms depending on aliases and transform functions
      expect(tempData).to.deep.equal({ foop: { a: 'b' } });
      expect(tempData2).to.deep.equal({ foop2: 'first99' });
    });
  });
});
