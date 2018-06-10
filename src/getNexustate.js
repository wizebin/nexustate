import Nexustate, { DEFAULT_STORAGE_KEY } from './Nexustate';

/**
 * Get global instance of nexustate with a given name, pass options to instantiate with options
 * @param {string} name
 * @param {object} options
 * @param {boolean} options.noPersist
 */
export default function getNexustate(name = 'default', options) {
  if (getNexustate.managers === undefined) getNexustate.managers = {};
  if (getNexustate.managers[name] === undefined) {
    const storageKey = name === 'default' ? DEFAULT_STORAGE_KEY : `${DEFAULT_STORAGE_KEY}_${name}`;
    const passOptions = Object.assign({}, { saveCallback: null, loadCallback: null, noPersist: false, storageKey }, (options || {}));
    getNexustate.managers[name] = new Nexustate(passOptions)
    getNexustate.managers[name].load();
  };
  return getNexustate.managers[name];
}
