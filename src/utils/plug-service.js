//监听浏览器中的动作
window.addEventListener("message", function (e) {
  let data = e.data;
  if (data.backaction === 'setService') {
    mainFunction.setService(data.data);
  }
  if (data.backaction === 'getSessionStorage') {
    alert(data.data);
  }
});

const mainFunction = {
  sendBackgroundService:function(data){//发送插件后台服务
    window.postMessage(data, '*');
  },
  setService:function(data){
    alert(data)
  },
  updateInterceptUrl: function (url,type) {
    this.sendBackgroundService({
      url: url,
      type: type,
      action: 'updataInterceptUrl',
    });
  },
  setStorage: function () {
    this.sendBackgroundService({
      a: 1,
      b: 2,
      key: 'test',
      action: 'setSessionStorage',
    });
  },
  postJSON:function (url, data) {
    return new Promise( (resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open("POST", url, true)
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(this.responseText)
          } else {
            reject(new Error(this.statusText))
          }
        }
      }
      xhr.send(data);
    })
  },
  getStorage: function () {
    this.sendBackgroundService({
      key: 'test',
      action: 'getSessionStorage',
    });
  }
}

export default mainFunction