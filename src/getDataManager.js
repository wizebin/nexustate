import DataManager from './DataManager';

export default function getDataManager(name = 'default') {
  if (getDataManager.managers === undefined) getDataManager.managers = {};
  if (getDataManager.managers[name] === undefined) {
    getDataManager.managers[name] = new DataManager()
    getDataManager.managers[name].load();
  };
  return getDataManager.managers[name];
}
