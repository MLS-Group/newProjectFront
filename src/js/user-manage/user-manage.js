//用户管理 刘志杰 2018-10-09
var UPDATEUSER = {} //修改时 选择的用户信息
var ADDUSER = {} //创建时 填写的用户信息
$(function () {
    tableInit(); //表格初始化
})
var USERURL = requestJson ? AJAX_URL.userManage : "";

/**
 * @Desc 模态框（创建用户）
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function AddUserModal() {
    $(".modal-header h4").html("创建用户")
    //状态默认为启用
    $("input[name='status'][value='0']").attr("checked", true);
    //身份默认为请选择
    $("#user-role").val(-1);
}

/**
 * @Desc 模态框（修改用户）
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function UppdateUserModal() {

    let checkboxTable = $("#user-table").bootstrapTable('getSelections');
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne)
        return 0;
    }

    $(".modal-header h4").html("修改用户");
    $("#user-key").val(checkboxTable[0].userkey);
    $("#user-account").val(checkboxTable[0].useraccount);
    $("#user-password").val(checkboxTable[0].userpassword);
    $("input[name='status'][value=" + checkboxTable[0].status + "]").attr("checked", true);
    $("#user-role").val(checkboxTable[0].userrole);
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
            "useraccount": $("#user-account").val(),
            "userpassword": $("#user-password").val(),
            "userrole": $("input[name='status']:checked").val(),
            "status": $("#user-role").val()
        };
        $.ajax({
            url: USERURL,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(ADDUSE0R),
            dataType: "json",
            success: function (data) {
                alert(POP_TIP.deleteSuccess);
                pageToDo('../user-manage/user-manage.html');

            }
        })
    }
    if ($(".modal-header h4").html() == "修改用户") { //修改
        UPDATEUSER = {
            "userkey": $("#user-key").val(),
            "useraccount": $("#user-account").val(),
            "userpassword": $("#user-password").val(),
            "userrole": $("input[name='status']:checked").val(),
            "status": $("#user-role").val()
        };
        $.ajax({
            url: USERURL,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(UPDATEUSER),
            dataType: "json",
            success: function (data) {
                alert(POP_TIP.deleteSuccess);
                pageToDo('../user-manage/user-manage.html');

            }
        })
    }
}

/**
 * @Desc 表格初始化
 * @Author 刘志杰
 * @Date 2018-10-09
 */
function tableInit() {
    $('#user-table').bootstrapTable({
        url: USERURL,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        dataType: "json",
        // height:  $(window).height() - 180,
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
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
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams: function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                rows: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order //排位命令（desc，asc）
            };
            return temp;
        },
        columns: [{
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
            console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function (data) {
            return data.rows;
        }
    });
}


/**
 * 点击删除按钮
 */
function deleteUser() {
    let checkboxTable = $("#user-table").bootstrapTable('getSelections');

    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne);
        return 0;
    }
    let checkboxTable2 = JSON.stringify(checkboxTable);

    poptip.confirm({
        content: POP_TIP.confirm,
        yes: function () {
            console.log('confirm-yes');
            //删除操作
            $.ajax({
                url: USERURL,
                type: requestJson ? 'get' : 'post',
                data: checkboxTable2,
                dataType: "json",
                success: function (data) {
                    alert(POP_TIP.deleteSuccess);
                    pageToDo('../user-manage/user-manage.html');

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
