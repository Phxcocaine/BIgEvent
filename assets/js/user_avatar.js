$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#btnUpload').on('click', function () {
        $('#file').click();
    });

    $('#file').on('chnange', function (e) {
        var lsit = e.target.files;
        // console.log(list);
        if (list.length == 0) {
            return layui.list.msg('请选择上传图片')
        }
        var f = e.target.list[0];
        var newImgURL = URL.newobjectURL(f);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });

    $('#btnOk').on('click', function () {
        var dataURL = $image
            console.log(dataURL);
            // .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            //     width: 100,
            //     height: 100
            // })
            // .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/updata/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                layui.layer.msg('用户更新失败');
                if (res.status === 0) {
                    window.parent.getUserInfo();
                }
            }

        })
    })
})