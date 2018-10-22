/**
 *@desc banner js
 *@date 2018/10/22 10:54:30
 *@author zhangziteng
 */

/**
 *@desc 修改密码
 *@date 2018/10/22 10:55:07
 *@author zhangziteng
 */
$("#update-button-ok").click(function () {
    console.log("11111");
    // var oldpassword = $("#update-input-oldpassword").val();
    var newpassword = $("#update-input-newpassword").val();
    var userKey = '1';
    $.ajax({
        url: AJAX_URL.updatePassword,
        type: requestJson ? 'get' : 'put',
        data: JSON.stringify({
            // "": oldpassword,
            "userkey": userKey,
            "userpassword": newpassword
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
            if (data.ok) {
                // alert(data.message);
                // window.location.href = '../default/default.html';
                poptip.alert(POP_TIP.updateSuccess);
            } else {
                poptip.alert(POP_TIP.updateFail);
            }
        }
    });
});

/**
 *@desc 旧密码校验
 *@date 2018/10/22 13:50:59
 *@author zhangziteng
 */

$("#update-input-oldpassword").blur(function () {
    console.log("1111");
    var password = $("#update-input-oldpassword").val();
    var userkey = "1";
    $.ajax({
        url: AJAX_URL.checkPassword,
        type: requestJson ? 'get' : 'post',
        data: JSON.stringify({
            "userkey": userkey,
            "userpassword": password
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
            console.log(data.message);
            if (data.ok) {
                // alert(data.message);
                // window.location.href = '../default/default.html';
                poptip.alert(POP_TIP.dataLoadsuccess);
            } else {
                poptip.alert(POP_TIP.dataLoadfail);
            }
        }
    });
});