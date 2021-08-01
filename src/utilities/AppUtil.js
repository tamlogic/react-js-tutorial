import moment from "moment";
import { camelCase, isObject, snakeCase } from "lodash";
import * as CryptoJS from "crypto-js";
import i18next from "i18next";
import AppConfig from "config/AppConfig";


const t = i18next.getFixedT();

const AppUtil = {
  mobileCheck: function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4)
        )
      ) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  },
  mobileAndTabletCheck: function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
          a.substr(0, 4)
        )
      ) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  },
  getMoment(date, format) {
    return isObject(date)
      ? moment(date)
      : moment(date, format || AppConfig.PATTERNS.DATE_FORMAT);
  },
  // formatDate (date, format) {
  //   return this.getMoment(date, PATTERNS.DATE_FORMAT).format(format || PATTERNS.DATE_FORMAT);
  // },
  subsDate(date, amountDate) {
    return moment(date).subtract(amountDate, "days");
  },
  toCamelCaseKey(obj) {
    if (Array.isArray(obj)) {
      return obj.map((v) => AppUtil.toCamelCaseKey(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: AppUtil.toCamelCaseKey(obj[key]),
        }),
        {}
      );
    }
    return obj;
  },
  toSnakeCaseKey(obj) {
    if (Array.isArray(obj)) {
      return obj.map((v) => AppUtil.toSnakeCaseKey(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [snakeCase(key)]: AppUtil.toSnakeCaseKey(obj[key]),
        }),
        {}
      );
    }
    return obj;
  },
  getBrowserLanguage() {
    const language =
      (navigator.languages && navigator.languages[0]) || // Chrome / Firefox
      navigator.language || // All browsers
      navigator.userLanguage; // IE <= 10

    if (language.indexOf("-") !== -1) {
      return language.split("-")[0];
    }
    return language;
  },
  getExtension(path) {
    const basename = path.split(/[\\/]/).pop();
    const pos = basename.lastIndexOf(".");
    if (basename === "" || pos < 1) {
      return "";
    }
    return basename.slice(pos + 1);
  },
  CurrencyFormatted(amount) {
    let i = parseFloat(amount);
    if (isNaN(i)) {
      i = 0.0;
    }
    let minus = "";
    if (i < 0) {
      minus = "-";
    }
    i = Math.abs(i);
    i = parseInt((i + 0.005) * 100);
    i = i / 100;
    let s = String(i);
    if (s.indexOf(".") < 0) {
      s += ".00";
    }
    if (s.indexOf(".") === s.length - 2) {
      s += "0";
    }
    s = minus + s;
    return s;
  },
  CommaFormatted(amount) {
    let delimiter = ","; // replace comma if desired
    let a = amount.split(".", 2);
    let d = a[1];
    let i = parseInt(a[0]);
    if (isNaN(i)) {
      return "";
    }
    let minus = "";
    if (i < 0) {
      minus = "-";
    }
    i = Math.abs(i);
    let n = String(i);
    a = [];
    while (n.length > 3) {
      let nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = n + "." + d;
    }
    amount = minus + amount;
    return amount;
  },
  formatNumber(amount) {
    return AppUtil.CommaFormatted(AppUtil.CurrencyFormatted(amount));
  },
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  },
  formatDate(
    date,
    format = AppConfig.PATTERNS.DATE_TIME_FORMAT,
    toLocal = false
  ) {
    let newDate = date;
    if (typeof newDate === "string") {
      newDate = new Date(newDate);
    }
    if (toLocal) {
      const timeZone = new Date().getTimezoneOffset() / -60;
      return moment(newDate).add(timeZone, "hours").format(format);
    }
    return moment(newDate).format(format);
  },
  getUrl(path = "/") {
    let url;
    const pathname = window.location.pathname;
    const protocol = window.location.protocol;
    const hash = window.location.hash ? "#" : "";
    const host = window.location.hostname;
    const port = window.location.port;
    if (port) {
      url = protocol + "//" + host + ":" + port + pathname + hash + path;
    } else {
      url = protocol + "//" + host + pathname + hash + path;
    }
    return url;
  },
  encrypt(message = "") {
    return CryptoJS.AES.encrypt(
      message,
      "34b8ef69efb344186085ad06fa422945"
    ).toString();
  },
  decrypt(message = "") {
    return CryptoJS.AES.decrypt(
      message,
      "34b8ef69efb344186085ad06fa422945"
    ).toString(CryptoJS.enc.Utf8);
  },
  copyLinkBuyer(path = "/") {
    let url;
    const protocol = window.location.protocol;
    const hash = window.location.hash ? "#" : "";
    const host = window.location.hostname;
    const port = window.location.port;
    if (port) {
      url = protocol + "//" + host + ":" + port + hash + path;
    } else {
      url = protocol + "//" + host + hash + path;
    }
    return url;
  },
  blobCreationFromURL(inputURI) {
    let binaryVal;

    // mime extension extraction
    const inputMIME = inputURI.split(",")[0].split(":")[1].split(";")[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(",")[0].indexOf("base64") >= 0)
      binaryVal = atob(inputURI.split(",")[1]);
    // Decoding of base64 encoded string
    else binaryVal = unescape(inputURI.split(",")[1]);

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character
    // it represents

    // Store the bytes of the string to a typed array
    const blobArray = [];
    for (let index = 0; index < binaryVal.length; index++) {
      blobArray.push(binaryVal.charCodeAt(index));
    }

    return new Blob([blobArray], {
      type: inputMIME,
    });
  },
  getOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return AppConfig.PHONES.WINDOWS_PHONE;
    }

    if (/android/i.test(userAgent)) {
      return AppConfig.PHONES.ANDROID;
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return AppConfig.PHONES.IOS;
    }

    return AppConfig.PHONES.UNKNOWN;
  },
  scrollToTopById(id) {
    if (!id) return;
    const mainPanel = document.getElementById(id);
    if (!mainPanel) return;
    if (AppUtil.detectBrowser() === "Firefox") {
      mainPanel.scrollTop = 0;
    } else {
      mainPanel.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  },
  detectBrowser() {
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) !== -1
    ) {
      return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      return "Firefox";
    } else if (
      navigator.userAgent.indexOf("MSIE") !== -1 ||
      !!document.documentMode === true
    ) {
      return "IE"; //crap
    } else {
      return "Unknown";
    }
  },
  makeBrand(routes = []) {
    let name = 'Care Aid';
    routes.map((prop) => {
      if (window.location.href.indexOf(prop.path) !== -1) {
        name = t(prop.extraTitle ? prop.extraTitle : prop.name);
      }
      return null;
    });
    return name;
  }
};

export default AppUtil;
