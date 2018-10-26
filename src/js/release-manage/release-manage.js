
var SELECT_ADMINPLAN_URL = requestUrl + "api/generate/adminssionsplaninformation/AdminssionsplaninformationVOPageAll"; //url地址 分页查询
var SELECT_CONDITION_URL = requestUrl + "api/generate/adminssionsplaninformation/AdminssionsplaninformationVOPageBySMP"; //url地址 条件查询
var UPDATE_RELEASEIS_URL = requestUrl + "api/generate/adminssionsplaninformation/releaseAdminssionsplaninformationVO"; //url地址 发布

/**
* @Description:   _初始化表格
* @Author:         yueben
* @CreateDate:     2018/10/24 10:52
*/
$(function () {
    tableInit(SELECT_ADMINPLAN_URL,"all");
});

/**
 * @Desc 表格初始化
 * @Author yueben
 * @Date 2018-10-10
 */
function tableInit(tableUrl,cond) {
    $('#adminssions-table').bootstrapTable({
        url: tableUrl,
        method: 'post',                      //请求方式（*）
        dataType: "json",
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 5,                     //每页的记录行数（*）
        pageList: [5,10,15],        //可供选择的每页的行数（*）
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
        contentType: 'application/json;charset=utf-8',
        //得到查询的参数
        queryParams: function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp

            if (cond == "all") {
                temp = {
                    "pageSize": params.limit,                         //页面大小
                    "page": (params.offset / params.limit) + 1,   //页码
                };
            } else if (cond == "condition") {

                temp = {
                    "pageSize": params.limit,                         //页面大小
                    "page": (params.offset / params.limit) + 1,
                    "adminssionskey":$("#select-input-proName").val(),
                    "schoolkey":$("#select-input-schName").val(),
                    "majorkey":$("#select-input-majName").val()
                }
            }
            return JSON.stringify(temp);
        },
        columns: [{
            field: 'checkbox',
            checkbox: true,
            visible: true               //是否显示复选框
        }, {
            field: 'adminssionskey',
            title: '招生编号'
        }, {
            field: 'schoolname',
            title: '学校名称'
        }, {
            field: 'provincename',
            title: '省份'
        }, {
            field: 'majorname',
            title: '专业名称'
        }, {
            field: 'adminssionsnumber',
            title: '招生人数'

        }, {
            field: 'createtime',
            title: '创建时间',
            formatter: function (v,r,i) {
                let now = new Date(v);
                return getMyTime(now);
            }
        }, {
            title: '发布时间',
            formatter: function (v,r,i) {
                if (r.ispublish == 0) {
                    return "未发布！";
                } else {
                    if (r.publishtime == null || r.publishtime == '') {
                        return "-";
                    }
                    let now = new Date(r.publishtime);
                    return getMyTime(now);
                }
            }

        }, {
            title: '下线时间',
            formatter: function (v,r,i) {

                if (r.ispublish == 0) {
                    return "未发布！";
                } else {
                    let now = new Date(r.offlinetime)
                    return getMyTime(now);
                }
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
            console.log(data);
            return {
                "rows": data.data.list,
                "total": data.data.count
            }
        }
    });
}

/**
* @Description:   _时间格式规范
* @Author:         yueben
* @CreateDate:     2018/10/24 10:52
*/
function getMyTime(now) {
    let yy = now.getFullYear();
    let mon = (now.getMonth() + 1) < 10 ? "-0" + (now.getMonth() + 1) : "-" + (now.getMonth() + 1);
    let dd = now.getDate() < 10 ? "-0" + now.getDate() : "-" + now.getDate();

    return yy + mon + dd;
}

/**
 * @Desc 点击发布按钮 打开模态框
 * @Author yueben
 * @Date 2018-10-10
 */
function openModel() {
    let checkboxTable = $("#adminssions-table").bootstrapTable('getSelections');
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne)
        return 0;
    }
    $("#my-modal").modal("show");
}
/**
* @Description:   _发布
* @Author:         yueben
* @CreateDate:     2018/10/24 10:53
*/
function publishAdminssions() {
    let checkboxTable = $("#adminssions-table").bootstrapTable('getSelections');
    let offlineTime = $("#update-input-offlinetime").val();
    if (!offlineTime || offlineTime == "") {
        poptip.alert(POP_TIP.offlineTimeNotNull);
        return 0;
    }

    let relObj = {
        "adminssionskey" : checkboxTable[0].adminssionskey,
        "offlinetime" : offlineTime,
        "createyear" : checkboxTable[0].createyear
    };
    $.ajax({
        url: UPDATE_RELEASEIS_URL,
        type: 'post',
        data: relObj,
        //dataType: "json",
        //contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data.ok) {
                poptip.alert(POP_TIP.publishSuccess);
                $("#adminssions-table").bootstrapTable('destroy');
                tableInit(SELECT_ADMINPLAN_URL,"all");
                $("#my-modal").modal('hide');
            } else {
                poptip.alert(POP_TIP.operateFail);
            }
        }
    })
}

/**
 *@desc 搜索按钮
 *@date 2018/10/12 16:15:46
 *@author yueben
 */
$("#search-button").click(function () {

    $("#adminssions-table").bootstrapTable('destroy');
    tableInit(SELECT_CONDITION_URL,"condition");
    console.log("已更新");
});

/**
* @Description:   _重置按钮
* @Author:         yueben
* @CreateDate:     2018/10/24 10:54
*/
$("#reset-button").click(function () {
    $("input[name='SSK']").val("");
});

/**
* @Description:   _发布时间控件
* @Author:         yueben
* @CreateDate:     2018/10/24 10:54
*/
laydate.render({
    elem: '#update-input-offlinetime',
    type: 'datetime'
})
