/**
 *@desc 学校管理界面初始化
 *@date 2018年10月11日10:06:08
 *@author zhangziteng
 */
var UPDATESCHOOL = {}     //修改时 选择的用户信息
var ADDSCHOOL = {}        //创建时 填写的用户信息
// var schoolname = "";
var SELECT_SCHOOL_URL = requestJson ? AJAX_URL.recruitPlanData : requestUrl + "api/generate/schoolinformation/querySchoolInfoByPage"; //url地址 分页查询
var DELETE_SCHOOL_URL = requestUrl + "api/generate/schoolinformation/deleteSchoolInfo"; //url地址 删除
var INSERT_SCHOOL_URL = requestUrl + "api/generate/schoolinformation/addSchoolInfo"; //url地址 新增
var UPDATE_SCHOOL_URL = requestUrl + "api/generate/schoolinformation/updateSchoolInfo"; //url地址 修改
var CHACK_SCHOOL_URL = requestUrl + "api/generate/schoolinformation/querySchoolInfoByPage"; //url地址 模糊
var LOGIN_INFO = {
    //登录的用户信息
    "userLoginRole": 1
};
$(function () {
    tableInit(SELECT_SCHOOL_URL,'');
});

/**
 *@desc 学校信息表格初始化
 *@date 22018年10月11日10:06:11
 *@author zhangziteng
 */

function tableInit(tableUrl,cond) {
    $('#school-table-all').bootstrapTable({
        url: tableUrl,
        method: requestJson ? 'get' : 'post',                      //请求方式（*）
        // dataType: "json",
        contentType: "application/json;charset=utf-8",
        toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        // paginationHAlign:'center',       //分页水平位置
        paginationDetailHAlign:"right",      //分页详细信息位置
        sortName:'BirthDate',                //排序的数据字段名
        sortable: true,                     //是否启用排序
        sortOrder: "desc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                      //每页的记录行数（*）
        pageList: [10],                    //可供选择的每页的行数（*）
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
        queryParams : function (params) {
            console.log($("#school-input-search").val());
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp;
                if (cond == "condition") {
                    temp = {
                            rows: params.limit,                         //页面大小
                            schoolname: $("#school-input-search").val(),
                            page: (params.offset / params.limit) + 1,   //页码
                            pageSize:10,
                            sort: params.sort,      //排序列名
                            sortOrder: params.order //排位命令（desc，asc）
                        };
                    return JSON.stringify(temp);
                } else {
                    temp = {
                        rows: params.limit,                         //页面大小
                        page: (params.offset / params.limit) + 1,   //页码
                        pageSize:10,
                        sort: params.sort,      //排序列名
                        sortOrder: params.order //排位命令（desc，asc）
                    };
                    return JSON.stringify(temp);
                }
        },
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        },{
            field: 'schoolname',
            title: '学校名称',
            width:300
        }, {
            field: 'provincename',
            title: '省份名称',
            width:100
        }, {
            field: 'briefintroduction',
            title: '简介',
            width:300
        }, {
            field: 'phone',
            title: '联系电话',
            width:150
        },{
            field: 'address',
            title: '地址',
            width:300
        }
            // ,{
            //     field:'ID',
            //     title: '操作',
            //     width: 220,
            //     align: 'center',
            //     valign: 'middle',
            //     formatter:function(value,row,index){
            //         //通过formatter可以自定义列显示的内容
            //         //value：当前field的值，即id
            //         //row：当前行的数据
            //         // let a = '<a href="#" onclick="openContinueModal()" data-target="#allproblem-continue" data-toggle="modal">继续提问</a>';
            //         let b = '<a href="#" onclick="openAllModal()" id="check-allproblem" data-target="#allproblem" data-toggle="modal">修改</a>';
            //         let c = '<a href="#" onclick="openDeleteModal()">删除</a>';
            //         return b +'   '+ c;
            //     }
        ],
        onLoadSuccess: function (e) {
            // console.log(e);
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function (result) {
            console.log(result);
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
}

/**
 *@desc 模糊查询按钮
 *@date 2018/10/12 09:48:18
 *@author zhangziteng
 */
function SearchPlan() {
    $('#school-table-all').bootstrapTable("destroy");
    tableInit(CHACK_SCHOOL_URL,"condition");
    // $.ajax({
    //     url: AJAX_URL.checkPlanData,
    //     type: requestJson ? 'get' : 'post',
    //     data: JSON.stringify(
    //         {
    //             "schoolname":schoolname
    //         }
    //     ),
    //     dataType: "json",
    //     contentType: "application/json;charset=utf-8",
    //     success: function (data) {
    //         if (data.ok) {
    //             console.log(data);
    //             poptip.alert(POP_TIP.loadSuccess);
    //             // $('#school-table-all').bootstrapTable("destroy");
    //             $('#school-table-all').bootstrapTable({
    //                 responseHandler:function(res) {
    //                     //动态渲染表格之前获取有后台传递的数据时,用于获取出除去本身渲染所需的数据的额外参数
    //                     //详见此函数参数的api
    //                     console.log(res)
    //                     return res;
    //                 }
    //             });
    //             $('#school-table-all').append(res);
    //         } else {
    //             poptip.alert(POP_TIP.loadFail);
    //         }
    //     }
    // })
}

/**
 *@desc 重置按钮
 *@date 2018/10/12 09:49:50
 *@author zhangziteng
 */
function ResetPlanInput() {
$("#school-input-search").val('');
}

/**
 *@desc 新增修改 保存按钮
 *@date 2018/10/12 11:07:51
 *@author zhangziteng
 */
function AddSchool() {
    if ($("#school-modal-title").html() == "<h3>创建学校名称</h3>") {
        //创建
        ADDSCHOOL = {
            "schoolname": $("#add-input-school").val(),
            "phone": $("#add-input-phone").val(),
            "address": $("#add-input-address").val(),
            "briefintroduction": $("#add-input-introduction").val(),
            "userLoginRole": LOGIN_INFO.userLoginRole
        };

        $.ajax({
            url: INSERT_SCHOOL_URL,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(ADDSCHOOL),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function () {
                poptip.alert(POP_TIP.addSuccess);
                $("#add-school-modal").modal("hide");
                $('#school-table-all').bootstrapTable("refresh");
            }
        })
    }
    if ($("#school-modal-title").html() == "<h3>修改学校名称</h3>") {
        //修改
        let checkboxTable = $("#school-table-all").bootstrapTable('getSelections');
        UPDATESCHOOL = {
            "schoolkey": checkboxTable[0].schoolkey,
            "schoolname": $("#add-input-school").val(),
            "phone": $("#add-input-phone").val(),
            "address": $("#add-input-address").val(),
            "briefintroduction": $("#add-input-introduction").val(),
            "userLoginRole": LOGIN_INFO.userLoginRole
        };
        $.ajax({
            url: UPDATE_SCHOOL_URL,
            type: requestJson ? 'get' : 'post',
            data: JSON.stringify(UPDATESCHOOL),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.data == "学校名称已存在") {
                    poptip.alert("学校名称已存在");
                } else {
                    poptip.alert(POP_TIP.updateSuccess);
                    $("#add-school-modal").modal("hide");
                    $('#school-table-all').bootstrapTable("refresh");
                }
            }
        })
    }
}

/**
 *@desc 创建学校名称
 *@date 2018年10月11日10:06:17
 *@author zhangziteng
 */
function AddSchoolModal() {
    $("#school-modal-title").html('<h3>创建学校名称</h3>');
    $(".alert-warn").text("");
    $("#add-input-school").val('');
    $("#add-input-phone").val('');
    $("#add-input-address").val('');
    $("#add-input-introduction").val('');
}

/**
 *@desc 修改学校名称
 *@date 2018年10月11日10:06:20
 *@author zhangziteng
 */

function AlterSchoolModal() {
    let checkboxTable = $("#school-table-all").bootstrapTable('getSelections');
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne)
        return 0;
    } else if (checkboxTable.length > 1) {
        poptip.alert(POP_TIP.choiceOnlyOne)
        return 0;
    }


    $("#school-modal-title").html('<h3>修改学校名称</h3>');
    $("#add-input-school").val(checkboxTable[0].schoolname);
    $("#add-input-phone").val(checkboxTable[0].phone);
    $("#add-input-address").val(checkboxTable[0].address);
    $("#add-input-introduction").val(checkboxTable[0].briefintroduction);
    $("#add-school-modal").modal("show");
    $(".alert-warn").text("");

}

/**
 *@desc 删除按钮
 *@date 2018年10月11日10:06:24
 *@author zhangziteng
 */

function DeleteSchool(){
    let checkboxTable = $("#school-table-all").bootstrapTable('getSelections');
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne)
        return 0;
    } else if (checkboxTable.length > 1) {
        poptip.alert(POP_TIP.choiceOnlyOne)
        return 0;
    }
    delete checkboxTable[0].checkbox;


    let dataObj = JSON.stringify({
        // "userLoginRole":
        "schoolkey": checkboxTable[0].schoolkey,
        "schoolname": checkboxTable[0].schoolname,
        "phone": checkboxTable[0].phone,
        "address":checkboxTable[0].address,
        "briefintroduction":checkboxTable[0].briefintroduction,
        "userLoginRole": LOGIN_INFO.userLoginRole
    });

    console.log(dataObj)
    poptip.confirm({
        content: POP_TIP.confirm,
        yes: function () {
            console.log('confirm-yes');
            //删除操作
            $.ajax({
                url: DELETE_SCHOOL_URL,
                type: requestJson ? 'get' : 'post',
                data: dataObj,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    poptip.alert(POP_TIP.deleteSuccess);
                    $('#school-table-all').bootstrapTable("refresh");
                }
            })
            poptip.close();
        },
        cancel: function () {
            poptip.close();
        }
    });
}