import Nexustate from './Nexustate';

export default function getNexustate(name = 'default') {
  if (getNexustate.managers === undefined) getNexustate.managers = {};
  if (getNexustate.managers[name] === undefined) {
    getNexustate.managers[name] = new Nexustate()
    getNexustate.managers[name].load();
  };
  return getNexustate.managers[name];
}
