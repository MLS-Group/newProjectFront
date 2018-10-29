//用户管理 刘志杰 2018-10-09
const LOGIN_INFO =  JSON.parse(sessionStorage.getItem("user-info"));//登录的用户信息

var user_condition = {} //条件查询的内容
$(function () {
    tableInit(AJAX_URL.selectUserManag); //表格初始化
})

/**
 * @Desc 模态框（创建用户）
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function addUserModal() {
    $(".modal-header h4").html("创建用户")
    //清除提示
    $(".alert-warn").text("")
    //清空输入框
    $("#modal-input-account").val("")
    $("#modal-input-password").val("")
    //状态默认为启用
    $(".radio").find("input[type=radio][value='1']").prop("checked", true)
    //身份默认为请选择
    $("#modal-select-role").val("");
    $("#my-modal").modal("show");
}

/**
 * @Desc 模态框（修改用户）
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function updateUserModal() {

    let checkboxTable = $("#user-table").bootstrapTable('getSelections');
    console.log("length=" + checkboxTable.length)

    console.log(checkboxTable)
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne)
        return 0;
    } else if (checkboxTable.length > 1) {
        poptip.alert(POP_TIP.choiceOnlyOne)
        return 0;
    }
    //清除提示
    $(".alert-warn").text("");

    $(".modal-header h4").html("修改用户");
    $("#modal-input-key").val(checkboxTable[0].userkey);
    $("#modal-input-account").val(checkboxTable[0].useraccount);
    $("#modal-input-password").val(checkboxTable[0].userpassword);
    $(".radio").find("input[type=radio][value='" + checkboxTable[0].status + "']").prop("checked", true)
    $("#modal-select-role").val(checkboxTable[0].userrole);
    $("#my-modal").modal("show");
}

/**
 * @Desc 模态框（保存按钮）
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function saveInfo() {
    if ($(".modal-header h4").html() == "创建用户") { //创建
        let insertObj = {
            "useraccount": $("#modal-input-account").val(),
            "userpassword": $("#modal-input-password").val(),
            "status": $("input[name='modal-radio-status']:checked").val(),
            "userrole": $("#modal-select-role").val(),
            "userLoginRole": LOGIN_INFO.userrole
        };

        $.ajax({
            url: AJAX_URL.insertUserManage,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(insertObj),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result && result.ok) {
                    poptip.alert(POP_TIP.addSuccess);
                    $("#my-modal").modal("hide");
                    $('#user-table').bootstrapTable('refresh');
                } else {
                    if (result && result.massage != "") {
                        poptip.alert(result.message)
                    } else {
                        poptip.alert(POP_TIP.addFail);
                    }
                }

            }
        })
    }
    if ($(".modal-header h4").html() == "修改用户") { //修改
        let updateObj = {   //修改时 选择的用户信息
            "userkey": $("#modal-input-key").val(),
            "useraccount": $("#modal-input-account").val(),
            "userpassword": $("#modal-input-password").val(),
            "status": $("input[name='modal-radio-status']:checked").val(),
            "userrole": $("#modal-select-role").val(),
            "userLoginRole": LOGIN_INFO.userrole
        };
        $.ajax({
            url: AJAX_URL.updateUserManage,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(updateObj),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result && result.ok) {
                    poptip.alert(POP_TIP.updateSuccess);
                    $("#my-modal").modal("hide");
                    $('#user-table').bootstrapTable('refresh');
                } else {
                    if (result && result.massage != "") {
                        poptip.alert(result.message)
                    } else {
                        poptip.alert(POP_TIP.updateFail);
                    }
                }

            }
        })
    }
}

/**
 * @Desc 表格初始化
 * @Author 刘志杰
 * @param tableUrl 表格中获取数据的url地址
 * @Date 2018-10-09
 */
function tableInit(tableUrl) {
    $('#user-table').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        // height:  $(window).height() - 180,
        toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: requestJson ? "client" : "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "userkey",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams: function (params) {
            let temp = {};
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

            if ((user_condition.accountSelect && user_condition.accountSelect.trim() != "")) {
                temp.useraccount = user_condition.accountSelect;
            }
            if (user_condition.statusSelect && user_condition.statusSelect != "-1") {
                temp.status = user_condition.statusSelect;
            }
            temp.pageSize = params.limit;                       //页面大小
            temp.page = (params.offset / params.limit) + 1;  //页码
            temp.sort = params.sort;      //排序列名
            temp.orderBy = params.order; //排位命令（desc，asc）

            return JSON.stringify(temp);
        },
        columns: [
            {
                field: 'checkbox',
                checkbox: true,
                visible: true               //是否显示复选框
            }, {
                field: 'userkey',
                title: '用户编号'
            }, {
                field: 'useraccount',
                title: '登录者账号'
            }, {
                field: 'userpassword',
                title: '密码'
            }, {
                field: 'userrole',
                title: '用户类型',
                formatter: function (value) {
                    let result = "";
                    if (value == 0) {
                        result = "考生";
                    } else if (value == 1) {
                        result = "管理员";
                    } else if (value == 2) {
                        result = "招生者";
                    }
                    return result;
                }
            }, {
                field: 'createtime',
                title: '创建时间',
                formatter: function (value) {
                    if (value != null) {
                        return getMyDate(value);
                    }
                    return "-";
                }
            }, {
                field: 'status',
                title: '状态',
                formatter: function (value) {
                    let result = "";
                    if (value == 0) {
                        result = "停用";
                    } else if (value == 1) {
                        result = "启动";
                    } else if (value == null){
                        result = "-";
                    }
                    return result;
                }
            }],

        onLoadSuccess: function (e) {
            // console.log(e)
        },
        onLoadError: function () {
            console.log(POP_TIP.dataLoadfail);
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function (result) {
            // console.log(result)
            if (result && result.ok) {
                if (requestJson) {
                    return result.rows;
                } else {
                    return {
                        "rows": result.data.list,
                        "total": result.data.count
                    };
                }
            } else {
                if (result && result.massage != "") {
                    poptip.alert(result.message)
                } else {
                    poptip.alert(POP_TIP.selectFail);
                }
            }


        }
    });
    $('#user-table').bootstrapTable('hideColumn', 'userkey');
}


/**
 * @Desc 点击删除按钮
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function deleteUser() {
    let checkboxTable = $("#user-table").bootstrapTable('getSelections');
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne);
        return 0;
    } else if (checkboxTable.length > 1) {
        poptip.alert(POP_TIP.choiceOnlyOne);
        return 0;
    }

    let dataObj = {
        "userLoginRole": LOGIN_INFO.userrole,
        "userkey": checkboxTable[0].userkey,
    };

    console.log(dataObj)
    poptip.confirm({
        content: POP_TIP.confirm,
        yes: function () {
            console.log('confirm-yes');
            //删除操作
            $.ajax({
                url: AJAX_URL.deleteUserManage,
                type: requestJson ? 'get' : 'post',
                data: JSON.stringify(dataObj),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                    if (result && result.ok) {
                        poptip.alert(POP_TIP.deleteSuccess);
                        tableInit(AJAX_URL.select_userManag);
                    } else {
                        if (result && result.massage != "") {
                            poptip.alert(result.message)
                        } else {
                            poptip.alert(POP_TIP.deleteFail);
                        }
                    }

                }
            })
            poptip.close();
            $('#user-table').bootstrapTable('refresh');
        },
        cancel: function () {
            console.log('confirm-cancel');
            poptip.close();
        }
    });

}

/**
 * @Desc 查询
 * @Author 刘志杰
 * @Date 2018-10-10
 */
function selectUser() {
    user_condition.accountSelect = $("#search-input-account").val();
    user_condition.statusSelect = $("#search-select-status").val();

    //条件查询
    $('#user-table').bootstrapTable('refresh');

}