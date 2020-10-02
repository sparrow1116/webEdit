
function init (){
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}
function deepClone(obj) {
    var objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (let key in obj) {
        // if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = deepClone(obj[key]);
          } else {
            objClone[key] = obj[key];
          }
        // }
      }
    }
    return objClone;
  }

function random(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;
  
}
function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
export {init,deepClone, random,guid}