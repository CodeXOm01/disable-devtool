
import './utils/log';
import {disableKeyAndMenu} from './utils/key-menu';
import {initInterval} from './utils/interval';
import {getUrlParam, initIS, IS} from './utils/util';
import {mergeConfig, config} from './utils/config';
import md5 from './utils/md5';
import version from './version';
import {initDetectors} from './detector/index';
import {DetectorType} from './utils/enum';
import {isDevToolOpened} from './utils/open-state';
import {IConfig, IDisableDevtool} from './type';
import {initLogs} from './utils/log';
import {checkScriptUse} from './plugins/script-use';

export const disableDevtool: IDisableDevtool = Object.assign(((opts?: Partial<IConfig>) => {
  const r = (reason = '') => ({success: !reason, reason});
  if (disableDevtool.isRunning) return r('already running');
  initIS(); 
  initLogs(); 
  mergeConfig(opts);
  
  if (checkTk()) return r('token passed');
  
  if ((config.seo && IS.seoBot)) return r('seobot');
  disableDevtool.isRunning = true;
  initInterval(disableDevtool);
  disableKeyAndMenu(disableDevtool);
  initDetectors();
  return r();
}), {
  isRunning: false,
  isSuspend: false,
  md5,
  version,
  DetectorType,
  isDevToolOpened,
});

function checkTk () {
  if (!config.md5) return false;
  
  const tk = getUrlParam(config.tkName);
  return md5(tk) === config.md5; 
}

const options = checkScriptUse();
if (options) {
  disableDevtool(options);
}