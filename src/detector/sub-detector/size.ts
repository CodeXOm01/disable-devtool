

import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';
import {IS} from 'src/utils/util';
import {clearDevToolOpenState} from 'src/utils/open-state';


export default class extends Detector {
  
  constructor () {
    super({
      type: DetectorType.Size,
      enabled: (!IS.iframe && !IS.edge)
    });
  }

  init () {
    this.checkWindowSizeUneven();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.checkWindowSizeUneven();
      }, 100);
    }, true);
  }

  detect () {
  }

  private checkWindowSizeUneven () {
    const screenRatio = countScreenZoomRatio();
    if (screenRatio === false) { 
      return true;
    }
    const widthUneven = window.outerWidth - window.innerWidth * screenRatio > 200; 
    const heightUneven = window.outerHeight - window.innerHeight * screenRatio > 300; 
    if (widthUneven || heightUneven) {
      this.onDevToolOpen();
      return false;
    }
    clearDevToolOpenState(this.type);
    return true;
  }
};

function countScreenZoomRatio () {
  if (checkExist(window.devicePixelRatio)) {
    return window.devicePixelRatio;
  }
  const screen = window.screen as any;
  if (!checkExist(screen)) {
    return false;
  }
  if (screen.deviceXDPI && screen.logicalXDPI) {
    return screen.deviceXDPI / screen.logicalXDPI;
  }
  return false;
};

function checkExist (v: any) {
  return typeof v !== 'undefined' && v !== null;
}
