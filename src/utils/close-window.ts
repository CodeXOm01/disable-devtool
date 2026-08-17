
import {config} from './config';


export function closeWindow () {
  // clearDDInterval();
  if (config.url) {
    window.location.href = config.url;
  } else if (config.rewriteHTML) {
    try {
      document.documentElement.innerHTML = config.rewriteHTML;
    } catch (e) {
      // for 'TrustedHTML' assignment
      document.documentElement.innerText = config.rewriteHTML;
    }
  } else {
    try {
      window.opener = null;
      window.open('', '_self');
   
      window.close();
      window.history.back();
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {

      window.location.href = config.timeOutUrl || `https://CodeXOm01/disable-devtool/404.html?h=${encodeURIComponent(location.host)}`;
    }, 500);
  }
}
