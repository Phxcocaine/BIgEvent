// const layuiAll = require("../lib/layui/layui.all");

// 异步获取
$(function () {
    var token = localStorage.getItem('token')
    getUserInfo(token)
});

// 为退出按钮添加事件
$('#logoutBtn').on('click', function () {
    // 1. 询问用户 使用layui 提供的 确认选择框
    // 2. 如果用户点击确认推出，则
    // a.删除token令牌
    // b.跳转到登录页面
    layui.layer.confirm('确定离开页面', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = "/login.html";
        // 3. 关闭当前弹出层
        layer.close(index);
    })
})
// 获取用户的基本信息
function getUserInfo(token) {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        success: function (res) {
            if (status === 0) {
                return layui.layer.msg('获取用户失败')
            }
            // 调用 renderAvatar 渲染的用户头像
            renderAvatar(res.data)
        },
    })
}

// 渲染用户头像
function renderAvatar(user) {
    console.log(user);
    var name = user.nickname || user.username;
    console.log(name);
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('scr', user_pic).show();
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }
}

