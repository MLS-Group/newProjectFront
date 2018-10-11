//用户管理 刘志杰 2018-10-09
var UPDATEUSER = {} //修改时 选择的用户信息
var ADDUSER = {} //创建时 填写的用户信息
var SELECT_USER_URL = requestJson ? AJAX_URL.userManageAll : requestUrl + "api/generate/userinformation/queryUserInfoByPage"; //url地址 分页查询
var DELETE_USER_URL = requestUrl + "api/generate/userinformation/deleteUserInfo"; //url地址 删除
var INSERT_USER_URL = requestUrl + "api/generate/userinformation/createUserInfo"; //url地址 新增
var UPDATE_USER_URL = requestUrl + "api/generate/userinformation/updateUserInfo"; //url地址 修改

var USERURL_CONDITION = ""; //url地址 条件查询
var LOGIN_INFO = {    //登录的用户信息
    "userRole": 1,
}

$(function () {
    tableInit(SELECT_USER_URL); //表格初始化
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
    //状态默认为启用
    $("input[name='modal-radio-status'][value='0']").attr("checked", true);
    //身份默认为请选择
    $("#modal-select-role").val(-1);
}

/**
 * @Desc 模态框（修改用户）
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function updateUserModal() {

    let checkboxTable = $("#user-table").bootstrapTable('getSelections');
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne)
        return 0;
    }
    //清除提示
    $(".alert-warn").text("");

    $(".modal-header h4").html("修改用户");
    $("#modal-input-key").val(checkboxTable[0].userkey);
    $("#modal-input-account").val(checkboxTable[0].useraccount);
    $("#modal-input-password").val(checkboxTable[0].userpassword);
    $("input[name='modal-radio-status'][value=" + checkboxTable[0].status + "]").attr("checked", true);
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
         ADDUSER = {
            "useraccount": $("#modal-input-account").val(),
            "userpassword": $("#modal-input-password").val(),
            "userrole": $("input[name='modal-radio-status']:checked").val(),
            "status": $("#modal-select-role").val(),
             "userLoginRole": LOGIN_INFO.userRole
        };

        $.ajax({
            url: INSERT_USER_URL,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(ADDUSER),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                poptip.alert(POP_TIP.addSuccess);
                tableInit(SELECT_USER_URL);
            }
        })
    }
    if ($(".modal-header h4").html() == "修改用户") { //修改
        UPDATEUSER = {
            "userkey": $("#modal-input-key").val(),
            "useraccount": $("#modal-input-account").val(),
            "userpassword": $("#modal-input-password").val(),
            "userrole": $("input[name='modal-radio-status']:checked").val(),
            "status": $("#modal-select-role").val(),
            "userLoginRole": LOGIN_INFO.userRole
        };
        $.ajax({
            url: UPDATE_USER_URL,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(UPDATEUSER),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                poptip.alert(POP_TIP.updateSuccess);
                tableInit(SELECT_USER_URL);

            }
        })
    }
}

/**
 * @Desc 表格初始化
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function tableInit(tableUrl) {
    $('#user-table').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        // height:  $(window).height() - 180,
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        //showColumns: true,                  //是否显示所有的列（选择显示的列）
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
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                pageSize: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order //排位命令（desc，asc）
            };
            return temp;
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
                title: '创建时间'
            }, {
                field: 'status',
                title: '状态',
                formatter: function (value) {
                    let result = "";
                    if (value == 0) {
                        result = "启动";
                    } else if (value == 1) {
                        result = "未启动";
                    }
                    return result;
                }
            }],

        onLoadSuccess: function (e) {
            // console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function (result) {
            // console.log(result)
            if (requestJson) {
                return result.rows;
            } else {
                return {
                    "rows": result.data.list,
                    "total": result.data.count
                };
            }

        }
    });
    $('#my-table').bootstrapTable('hideColumn', 'volunteerkey');
}

function tableInit1(tableUrl) {
    $('#user-table').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        // height:  $(window).height() - 180,
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                     //每页的记录行数（*）
        pageList: [10],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        //showColumns: true,                  //是否显示所有的列（选择显示的列）
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
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                pageSize: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order //排位命令（desc，asc）,

            };
            return temp;
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
                title: '创建时间'
            }, {
                field: 'status',
                title: '状态',
                formatter: function (value) {
                    let result = "";
                    if (value == 0) {
                        result = "启动";
                    } else if (value == 1) {
                        result = "未启动";
                    }
                    return result;
                }
            }],

        onLoadSuccess: function (e) {
            // console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function (result) {
            // console.log(result)
            if (requestJson) {
                return result.rows;
            } else {
                return {
                    "rows": result.data.list,
                    "total": result.data.count
                };
            }

        }
    });
    $('#my-table').bootstrapTable('hideColumn', 'volunteerkey');
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
    }
    delete checkboxTable[0].checkbox;


    let dataObj = JSON.stringify({
        "createtime": checkboxTable[0].createtime,
        "status": checkboxTable[0].status,
        "userLoginRole": LOGIN_INFO.userRole,
        "useraccount": checkboxTable[0].useraccount,
        "userkey": checkboxTable[0].userkey,
        "userpassword": checkboxTable[0].userpassword,
        "userrole": checkboxTable[0].userrole

    });

    console.log(dataObj)
    poptip.confirm({
        content: POP_TIP.confirm,
        yes: function () {
            console.log('confirm-yes');
            //删除操作
            $.ajax({
                // url: DELETE_USER_URL + '?userRole=' + LOGIN_INFO.userRole,
                url: DELETE_USER_URL,

                type: requestJson ? 'get' : 'post',
                data: dataObj,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    poptip.alert(POP_TIP.deleteSuccess);
                    console.log(data)
                    tableInit(SELECT_USER_URL);
                }
            })
            poptip.close();
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
    let accountSelect = $("#account-select").val();
    let statusSelect = $("input[name='select-radio-status']:checked").val();
    let tableUrl = USERURL_CONDITION;
    if ((!accountSelect || accountSelect.trim() == "") && (!statusSelect || statusSelect == "")) {
        poptip.alert(POP_TIP.selectInputNotNull)
        return 0;
    }


    tableInit1(tableUrl,[accountSelect,accountSelect]);
}