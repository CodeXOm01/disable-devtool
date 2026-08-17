

import {DetectorType} from './utils/enum';

export interface IConfig {
    md5: string; 
    url: string; 
    timeOutUrl: string; 
    tkName: string;
    ondevtoolopen(type: DetectorType, next: Function): void; 
    ondevtoolclose: Function | null;
    onDevtoolOpen?(type: DetectorType, next: Function): void; 
    onDevtoolClose?: Function | null;
    interval: number; 
    disableMenu: boolean; 
    stopIntervalTime: number; 
    clearIntervalWhenDevOpenTrigger: boolean; 
    detectors: DetectorType[] | 'all';  
    clearLog: boolean; 
    disableSelect: boolean; 
    disableInputSelect: boolean; 
    disableCopy: boolean; 
    disableCut: boolean; 
    disablePaste: boolean; 
    ignore: (string|RegExp)[] | null | (()=>boolean); 
    disableIframeParents: boolean; 
    seo: boolean; 
    rewriteHTML: string; 
}

export interface IDisableDevtool {
    (opts?: Partial<IConfig>): {success:boolean, reason:string};
    isRunning: boolean;
    isSuspend: boolean;
    md5: (v: string) => string;
    version: string;
    DetectorType: typeof DetectorType;
    isDevToolOpened: ()=>boolean;
}