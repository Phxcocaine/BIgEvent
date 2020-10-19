$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间！'
            }
        }
    })
    initUserInfo();


    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.masg('获取用户信息失败！');
                }
                console.log(res);
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        // 调用方法 从新 请求用户信息 并填充到表单中
        initUserInfo();
    });

    $('#btnSubmit').on('.click', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户失败！');
                }
                layer.msg('更新用户成功！');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
                location.href = "login.html"
            }
        })
    })
});
