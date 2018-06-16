import Nexustate from './Nexustate';

/**
 * Get global instance of nexustate with a given name, pass options to instantiate with options
 * @param {string} name
 * @param {object} options
 * @param {boolean} options.persist
 */
export default function getNexustate(name = 'default', options) {
  if (getNexustate.managers === undefined) getNexustate.managers = {};
  if (getNexustate.managers[name] === undefined) {
    const passOptions = Object.assign({}, { saveCallback: null, loadCallback: null, persist: false, storageKey: name }, (options || {}));
    getNexustate.managers[name] = new Nexustate(passOptions)
    if (passOptions.persist) {
      getNexustate.managers[name].load();
    }
  };
  return getNexustate.managers[name];
}
