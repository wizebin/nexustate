import changeWrapper from './changeWrapper';
import { expect } from 'chai';

describe('changeWrapper', () => {
  it('wraps basic changes', () => {
    let a = {};
    let hasChanged = false;
    const b = changeWrapper(a, (value) => { hasChanged = true });
    expect(hasChanged).to.equal(false);
    a.b = 6;
    expect(hasChanged).to.equal(false);
    b.b = 6;
    expect(hasChanged).to.equal(true);
  });
  it('wraps deletes', () => {
    let a = { b: '5' };
    let hasChanged = false;
    const proxd = changeWrapper(a, (value) => { hasChanged = true });
    delete(proxd.b);
    expect(hasChanged).to.equal(true);
  });
  it('wraps subobjects', () => {
    let original = { b: '5' };
    let change = null;
    const proxd = changeWrapper(original, (data) => { change = data });
    proxd.c = { q: 'r' };
    expect(change).to.deep.equal({ key: [], property: 'c', type: 'define' });
    change = null;
    proxd.c.f = 'hi';
    expect(change).to.deep.equal({ key: ['c'], property: 'f', type: 'define' });
  });
})
