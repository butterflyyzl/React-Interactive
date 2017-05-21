import config from '../../config/config.json';
import { ObjectUtil, StringUtil } from '@xinguang/common-tool';

export default class UrlUtil {
  /**
   * [getPageUrlByPageName 拼接出不带参数的页面Url]
   * @param  {String} pageName [description]
   * @return {[type]}         [description]
   */
  static getPageUrlByPageName (pageName) {
    let currentEnv = config.current;
    return config.pageUrl[currentEnv] + pageName + '/index.html';
  }

  /**
   * [getUrlByPageName 拼接出带参数的页面Url]
   * @param  {String} pageName [description]
   * @param  {Object} option [description]
   * @return {[type]}         [description]
   */
  static getUrlByPageName (pageName, option = {}) {
    let target = UrlUtil.getPageUrlByPageName(pageName);

    for (let key in option) {
      target = UrlUtil.appendParam4Url(target, key, option[key]);
    }

    return target;
  }

  /**
   * [appendParam4Url 给Url添加参数]
   * @param  {String} url [description]
   * @param  {String} paramKey [description]
   * @param  {[type]} paramValue [description]
   * @return {[type]}         [description]
   */
  static appendParam4Url (url, paramKey, paramValue) {
    let obj = StringUtil.parseQueryString(url);
    // let paramSubfix = paramKey + '=' + paramValue;
    let targetUrl = url.indexOf('?') >= 0 ? url.split('?')[0] : url;

    if (!obj) obj = {};

    obj[paramKey] = paramValue;

    if (targetUrl.indexOf('?') < 0) {
      targetUrl += '?';
    }

    Object.keys(obj).map(function (key, index) {
      if (index > 0) targetUrl += '&';
      targetUrl += key + '=' + obj[key];
    });

    return targetUrl;
  }

  /**
   * [appendParams4Url 给Url添加批量参数]
   * @param  {String} pureUrl [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  static appendParams4Url (pureUrl, options = {}) {
    let redirectUrl = pureUrl;

    for (let key in options) {
      redirectUrl = UrlUtil.appendParam4Url(redirectUrl, key, options[key]);
    }

    return redirectUrl;
  }

  /**
   * [fetchParamValueByCurrentURL 获取当前页面Url中对应key的值]
   * @param  {String} key [description]
   * @return {[type]}         [description]
   */
  static fetchParamValueByCurrentURL (key) {
    let obj = StringUtil.parseQueryString(location.href);

    let newObj = {};
    if (obj.state) {
      newObj = UrlUtil.tempRedirectParam2Obj(obj.state);
    }

    for (let k in obj) {
      if (k !== 'state') newObj[k] = obj[k];
    }

    return newObj[key];
  }

  /**
   * [tempObj2redirectParam 将参数拼接为字符串 [key]1ssss1[value]1mmmm1[key]1ssss1[value]]
   * @param  {Object} options [description]
   * @return {String}         [description]
   */
  static tempObj2redirectParam (options) {
    if (ObjectUtil.isEmptyObject(options)) {
      return null;
    }

    let equalSign = '1ssss1';
    let semiSign = '1mmmm1';

    let arr = [];
    Object.keys(options).map((key) => {
      arr.push(key + equalSign + options[key]);
    });
    return arr.join(semiSign);
  }

  /**
   * [tempRedirectParam2Obj 将字符串 [key]1ssss1[value]1mmmm1[key]1ssss1[value] 拆分成对象]
   * @param  {String} url [description]
   * @return {String}         [description]
   */
  static tempRedirectParam2Obj (str) {
    let ret = null;
    let equalSign = '1ssss1';
    let semiSign = '1mmmm1';

    if (str != null) {
      let arr = [];
      ret = {};

      if (str.indexOf(semiSign) >= 0) {
        arr = str.split(semiSign);
        arr.map((kv, index) => {
          if (kv.indexOf(equalSign)) {
            let kvArray = kv.split(equalSign);
            ret[kvArray[0]] = kvArray[1];
          }
        });
      } else {
        if (str.indexOf(equalSign)) {
          let kvArray = str.split(equalSign);
          ret[kvArray[0]] = kvArray[1];
        }
      }
    }

    return ret;
  }

  static redirectPage (pageName, options = {}) {
    let queryObj = StringUtil.parseQueryString(location.href);
    let hrefString = location.href.toString();
    let fixedHref = hrefString.indexOf('?') >= 0
      ? hrefString.split('?')[0]
      : location.href;

    location.href = UrlUtil.getUrlByPageName(
              pageName,
              Object.assign(queryObj, {
                redirect_url: fixedHref,
              }, options)
            );
  }
}
