// const layuiAll = require("../lib/layui/layui.all");

$(function () {
    // 1.为提交按钮 添加 点击事件
    $('#btnSubmit').on('click', function () {
        changePwd();
    })
});
// 2. 修改 用户密码
function changePwd() {
    // a.通过 jq 获取 表单数据(原密码 和新密码 )
    var strData = $('.layui-form').serialize();
    // 提交到重置密码接口
    console.log(strData);
    $.ajax({
        method: 'post',
        url: '/my/updatepwd',
        data: strData,
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('更新密码失败！');
            } else {
                layui.layer.msg(res.message, function () {
                    // 删除本地token
                    localStorage.removeItem('token');
                    // 跳转到login页面
                    window.parent.location.href = "/login.html"
                });
            }

        }
    })
}