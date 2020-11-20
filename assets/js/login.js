$(function () {
    //绑定切换事件
    $('.login .links').click(function () {
        $('.login').hide().siblings().show()
    })
    $('.reg .links').click(function () {
        $('.reg').hide().siblings().show()
    })
    //这里引入layui里面的js
    const form = layui.form;//创建对象
    form.verify({
        uname: function (value) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd(value) {
            if ($('.reg [name="password"]').val() !== value) {
                return '两次密码不匹配'
            }
        }

    });

    //注册页面提交表单
    form.on('submit(reg)', function (data) {
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data.field,
            dataType: "json",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                $('.reg .links').click()
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //登陆页面提交表单
    form.on('submit(login)', function (data) {
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: data.field,
            dataType: "json",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                location.href = '/index.html'
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });


    //此处为入口函数   
})

