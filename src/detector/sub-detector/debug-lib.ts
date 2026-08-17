
 
import {Detector} from '../detector';
import {DetectorType} from 'src/utils/enum';

export default class extends Detector {

  constructor () {
    super({
      type: DetectorType.DebugLib
    });
  }

  init () {}

  detect () {
    if (
     
      (window as any).eruda?._devTools?._isShow === true ||
     
      (!!(window as any)._vcOrigConsole && !!window.document.querySelector('#__vconsole.vc-toggle'))
    ) {
      this.onDevToolOpen();
    }
  }
  static isUsing () {
    return !!(window as any).eruda || !!(window as any)._vcOrigConsole;
  }
}