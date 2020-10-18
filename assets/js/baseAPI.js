// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') > -1) {
    options.headers = {
      Authorization: localStorage.getItem('token' || '')
    }
  }

  // 3. 统一处理 用户返回的 未登录 错误
  options.complete = function (res) {
    if (res.responseJSON.status === 1) {
      // a.提示用户没有权限
      alert('对不起，您的登录已经失效，请重新登录！');
      // b. 删除 locastorage 中可能存在的伪造的 token
      localStorage.removeItem('token');
      // c. 页面跳转
      location.href = "/login.html"
    }
  }
});

