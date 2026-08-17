
import {IConfig} from '../type';
import {closeWindow} from './close-window';

export const config: IConfig = {
  md5: '',
  ondevtoolopen: closeWindow, 
  ondevtoolclose: null, 
  url: '',
  timeOutUrl: '',
  tkName: 'ddtk',
  interval: 500,
  disableMenu: true, 
  stopIntervalTime: 5000, 
  clearIntervalWhenDevOpenTrigger: false,
  detectors: [1, 3, 4, 5, 6, 7], 
  clearLog: true,
  disableSelect: false,
  disableInputSelect: false,
  disableCopy: false,
  disableCut: false,
  disablePaste: false,
  ignore: null,
  disableIframeParents: true,
  seo: true,
  rewriteHTML: '',
};

const MultiTypeKeys = ['detectors', 'ondevtoolclose', 'ignore'];

export function mergeConfig (opts: Partial<IConfig> = {}) {
  if (opts.onDevtoolOpen) { opts.ondevtoolopen = opts.onDevtoolOpen; }
  if (opts.onDevtoolClose) { opts.ondevtoolclose = opts.onDevtoolClose; }
    
  for (const key in config) {
    const k = key as keyof IConfig;
    if (
      typeof opts[k] !== 'undefined' &&
        (typeof config[k] === typeof opts[k] || MultiTypeKeys.indexOf(k) !== -1)
    ) {
      (config as any)[k] = opts[k];
    }
  }
  checkConfig();
}

function checkConfig () {
  if (
    typeof config.ondevtoolclose === 'function' &&
        config.clearIntervalWhenDevOpenTrigger === true
  ) {
    config.clearIntervalWhenDevOpenTrigger = false;
    console.warn('【DISABLE-DEVTOOL】clearIntervalWhenDevOpenTrigger 在使用 ondevtoolclose 时无效');
  }
}