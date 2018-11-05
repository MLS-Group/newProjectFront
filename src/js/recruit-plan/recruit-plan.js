
var SELECT_ADMINPLAN_URL = requestUrl + "api/generate/adminssionsplaninformation/AdminssionsplaninformationVOPageAll"; //url地址 分页查询
var DELETE_ADMINPLAN_URL = requestUrl + "api/generate/adminssionsplaninformation/deleteAdminssionsplaninformationVO"; //url地址 删除
var INSERT_ADMINPLAN_URL = requestUrl + "api/generate/adminssionsplaninformation/createAdminssionsplaninformationVO"; //url地址 新增
var UPDATE_ADMINPLAN_URL = requestUrl + "api/generate/adminssionsplaninformation/updateAdminssionsplaninformationVO"; //url地址 修改
var SELECT_CONDITION_URL = requestUrl + "api/generate/adminssionsplaninformation/AdminssionsplaninformationVOPageBySMP"; //url地址 条件查询
var SELECT_SCHOOLALL_URL = requestUrl + "api/generate/schoolinformation/querySchoolInfoByPage" //获取所有学校信息
var SELECT_MAJOR_ALL_URL = requestUrl + "api/generate/majorinformation/queryMajorInfoByPage" //获取所有



//获取学校信息和专业信息
var SCH_ARR;
var MAJ_ARR;

/**
 *@desc 招生计划初始化
 *@date 2018/10/10 11:12:34
 *@author yueben
 */
$(function () {
    tableInit(SELECT_ADMINPLAN_URL,"all");
    getSchAndMaj();
});

/**
* @Description:   _获取学校信息和专业信息
* @Author:         yueben
* @CreateDate:     2018/10/24 10:36
*/
function getSchAndMaj() {
    $.ajax({
        url: SELECT_SCHOOLALL_URL,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data:JSON.stringify({}),
        success: function (data) {
            SCH_ARR = data.data.list;
            console.log(SCH_ARR);
        }
    });
    $.ajax({
        url: SELECT_MAJOR_ALL_URL,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function (data) {
            MAJ_ARR = data.data.list;
            console.log(MAJ_ARR);
        }
    })
}


/**
 *@desc 招生计划表格初始化
 *@date 2018/10/10 11:13:27
 *@author yueben
 */

function tableInit(tableUrl,cond) {
    $('#plan-table-all').bootstrapTable({
        url: tableUrl,
        method: 'post',                      //请求方式（*）
        dataType: "json",
        //toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        // paginationHAlign:'center',       //分页水平位置
        //paginationDetailHAlign:"right",      //分页详细信息位置
        sortName:'createtime',                //排序的数据字段名
        sortable: true,                     //是否启用排序
        sortOrder: "desc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 5,                     //每页的记录行数（*）
        pageList: [5, 10, 15],        //可供选择的每页的行数（*）
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
        /**
         *@desc 招生计划表格初始化
         *@date 2018/10/12 16:46:27
         *@author yueben
         */
        queryParams : function (params) {
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp

            if (cond == "all") {
                temp = {
                    "pageSize": params.limit,                         //页面大小
                    "page": (params.offset / params.limit) + 1,   //页码
                };
                console.log(temp);
            } else if (cond == "condition") {

                temp = {
                    "pageSize": params.limit,                         //页面大小
                    "page": (params.offset / params.limit) + 1,
                    "adminssionskey":$("#select-input-proname").val(),
                    "schoolkey": $("#select-input-schname").val(),
                    "majorkey":$("#select-input-majname").val()
                };

            }
            return JSON.stringify(temp);
        },
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        }, {
            title: '序号',
            width:100,
            formatter: function (valve,row,index) {
                return index+1;
            }
        }, {
            field: 'schoolname',
            title: '学校名称',
            width:300
        }, {
            field: 'provincename',
            title: '省份',
            width:300
        },{
            field: 'majorname',
            title: '专业名称',
            width:200
        }, {
            field: 'adminssionsnumber',
            title: '招生人数',
            width:100
        }, {
            field: 'createyear',
            title: '年份',
            width:100
        },{
            field: 'createtime',
            title: '创建时间',
            width:300,
            formatter: function (value,row,index) {
                if (value != null) {
                    return getMyDate(value);
                }
                return "-";
            }
        }
         ],
        onLoadSuccess: function (e) {
            console.log(e)
        },
        onLoadError: function () {
            console.log("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
        },
        //客户端分页，需要指定到rows
        responseHandler: function(data) {
            console.log(data);
            return {
                "rows": data.data.list,
                "total": data.data.count
            }

           // return data.data.list;
        }
    });
}

/**
* @Description:   _格式化日期
* @Author:         yueben
* @CreateDate:     2018/10/24 10:37
*/
function getMyTime(now) {
    let yy = now.getFullYear();
    let mon = (now.getMonth() + 1) < 10 ? "-0" + (now.getMonth() + 1) : "-" + (now.getMonth() + 1);
    let dd = now.getDate() < 10 ? "-0" + now.getDate() : "-" + now.getDate();

    return yy + mon + dd;
}


/**
* @Description:   _关闭模态框清空下拉框数据
* @Author:         yueben
* @CreateDate:     2018/10/24 10:38
*/
$("#close-modal").click(function () {
    cleanSelect();
    //关闭输入框为空提示
    $("#show-span-schNameIsNull").empty();
    $("#show-span-majNameIsNull").empty();
    $("#show-span-proNameIsNull").empty();
    N = '0';
})

/**
* @Description:   _清除下拉框数据
* @Author:         yueben
* @CreateDate:     2018/10/24 10:38
*/
function cleanSelect() {
    $("#add-update-select-SchName").empty();
    $("#add-update-select-ProName").empty();
    $("#add-update-select-MajName").empty();
}

/**
 *@desc 修改招生计划
 *@date 2018/10/14 17:09:42
 *@author yueben
 */
function AlterPlanModal() {
    let checkboxTable = $("#plan-table-all").bootstrapTable('getSelections');
    if (checkboxTable.length > 1) {
        poptip.alert("一次只能修改一条数据！");
        return;
    } else if (checkboxTable.length < 1) {
        poptip.alert("请选择一条数据！");
        return;
    } else {
        selectInit("update");
        $("#plan-modal-title").html('<h3>' + '修改招生计划' + '</h3>');
        $("#add-update-input-PlanNum").val(checkboxTable[0].adminssionsnumber);
        $("#add-plan-modal").modal("show");
    }
}

/**
 *@desc 创建招生计划
 *@date 2018/10/15 9:53:15
 *@author yueben
 */
function AddPlanModal() {
    $("#plan-modal-title").html('<h3>' + '创建招生计划' + '</h3>');
    selectInit("creat");
    $("#add-update-input-PlanNum").val("");

}


/**
* @Description:   _初始化创建，修改模态框里的下拉框数据
* @Author:         yueben
* @CreateDate:     2018/10/24 10:39
*/
function selectInit(cOrU) {
    let checkboxTable;
    if (cOrU == 'creat') {
        checkboxTable = [{}];
        $("#add-update-select-SchName").append("<option value='' style=\"display: none\">请选择学校名称</option>");
        $("#add-update-select-ProName").append("<option value='' style=\"display: none\">请选择省份</option>");
        $("#add-update-select-MajName").append("<option value='' style=\"display: none\">请选择专业名称</option>");

    } else {
        checkboxTable = $("#plan-table-all").bootstrapTable('getSelections');
    }
    $.each(SCH_ARR,function (i,v) {
        if (checkboxTable[0].schoolname == v.schoolname) {
            $("#add-update-select-SchName").append("<option value='" + v.schoolname + "' selected>" + v.schoolname + "</option>");
        } else {
            $("#add-update-select-SchName").append("<option value='" + v.schoolname + "'>" + v.schoolname + "</option>");
        }
        if (checkboxTable[0].provincename == v.provincename) {
            $("#add-update-select-ProName").append("<option value='" + v.provincename + "' selected>" + v.provincename + "</option>");
        } else {
            $("#add-update-select-ProName").append("<option value='" + v.provincename + "'>" + v.provincename + "</option>");
        }
    });
    $.each(MAJ_ARR,function (i,v) {
        if (checkboxTable[0].majorname == v.majorname) {
            $("#add-update-select-MajName").append("<option value='" + v.majorkey + "' selected>" + v.majorname + "</option>");
        } else {
            $("#add-update-select-MajName").append("<option value='" + v.majorkey + "'>" + v.majorname + "</option>");
        }
    });
}


var N = '0';
/**
* @Description:   _选择学校时刷新省份下拉框内容
* @Author:         yueben
* @CreateDate:     2018/10/24 10:40
*/
function schNameByPro(value) {

    console.log(value);
    if (N != 'pro') {
        $("#add-update-select-ProName").empty();
        $("#add-update-select-ProName").append("<option value='0' style=\"display: none\">请选择省份</option>");
    }
    $.each(SCH_ARR,function (i,v) {
        if (v.schoolname == value) {
            $("#add-update-select-ProName").append("<option value='" + v.schoolkey + "'>" + v.provincename + "</option>")
        }
    });
    if (N == '0') {
        N = 'sch';
    }

}

/**
* @Description:   _选择省份时刷新学校下拉框
* @Author:         yueben
* @CreateDate:     2018/10/24 10:41
*/
function proNameBySch(value) {
    if (N != 'sch') {
        $("#add-update-select-SchName").empty();
        $("#add-update-select-SchName").append("<option value='0' style=\"display: none\">请选择学校名称</option>");
    }
    $.each(SCH_ARR,function (i,v) {
        if (v.provincename == value) {
            $("#add-update-select-SchName").append("<option value='" + v.schoolkey + "'>" + v.schoolname + "</option>")
        }
    });
    if (N == '0') {
        N = 'pro';
    }
}

/**
* @Description:   _点击提交按钮，完成新增或是修改
* @Author:         yueben
* @CreateDate:     2018/10/24 10:41
*/
function tiJiao() {
    let isNull = false;
    //判断输入框的值是否空
    if ($("#add-update-select-SchName").val() == '' || $("#add-update-select-SchName").val() == null || $("#add-update-select-SchName").val() == '0') {
        $("#show-span-schNameIsNull").text("请选择学校！");
        isNull = true;
    } else {
        $("#show-span-schNameIsNull").css('display','none');
    }
    if ($("#add-update-select-MajName").val() == '' || $("#add-update-select-MajName").val() == null) {
        $("#show-span-majNameIsNull").text("请选择专业！");
        isNull = true;
    } else {
        $("#show-span-majNameIsNull").css('display','none');
    }
    if ($("#add-update-select-ProName").val() == '' || $("#add-update-select-ProName").val() == null || $("#add-update-select-ProName").val() == '0') {
        $("#show-span-proNameIsNull").text("请选择省份！");
        isNull = true;
    } else {
        $("#show-span-proNameIsNull").css('display','none');
    }
    if ($("#add-update-input-PlanNum").val() == '' || $("#add-update-input-PlanNum").val() == null) {
        $("#show-span-planNumIsNull").text("请输入招生人数！");
        isNull = true;
    } else {
        $("#show-span-planNumIsNull").css('display','none');
    }
    //当某一项为空时不进行提交
    if (isNull) {
        return 0;
    }

    //判断为修改操作还是新增操作
    let tit = $("#plan-modal-title").text();
    if (tit == '修改招生计划') {

        let checkboxTable = $("#plan-table-all").bootstrapTable('getSelections');
        let schoolkey = '';
        //获取schoolkey
        if (N == 'sch') {
            schoolkey = $("#add-update-select-ProName").val();
        } else if (N == 'pro') {
            schoolkey = $("#add-update-select-SchName").val();
        } else if (N == '0') {
            schoolkey = checkboxTable[0].schoolkey;
        }

        let dataObj = JSON.stringify({
            "adminssionskey": checkboxTable[0].adminssionskey,
            "schoolkey" : schoolkey,
            "majorkey" : $("#add-update-select-MajName").val(),
            "adminssionsnumber" : $("#add-update-input-PlanNum").val(),
            "createyear" : checkboxTable[0].createyear
        });

        $.ajax({
            url: UPDATE_ADMINPLAN_URL,
            type: 'post',
            data:dataObj,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            error:function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
                alert(errorThrown);
            },
            success: function (data) {
                console.log(data);
                if (data.ok) {
                    poptip.alert(POP_TIP.updateSuccess);
                    $("#plan-table-all").bootstrapTable('destroy');
                    tableInit(SELECT_ADMINPLAN_URL,"all");
                    cleanSelect();
                    $("#add-plan-modal").modal('hide');
                } else {
                    if (data.message == "fail") {
                        poptip.alert(POP_TIP.updateFail);
                    } else if (data.message == "repeat") {
                        poptip.alert(POP_TIP.repeat);
                    } else {
                        console.log(data);
                    }
                }

            }
        })
    } else if (tit == '创建招生计划') {
        let schoolkey;
        if (N == 'sch') {
            schoolkey = $("#add-update-select-ProName").val();
        } else {
            schoolkey = $("#add-update-select-SchName").val();
        }
        console.log("schoolkey=" + schoolkey);
        let creatObj = JSON.stringify({
            "schoolkey": schoolkey,
            "majorkey": $("#add-update-select-MajName").val(),
            "adminssionsnumber": $("#add-update-input-PlanNum").val()
        });
        $.ajax({
            url: INSERT_ADMINPLAN_URL,
            type: 'post',
            data:creatObj,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            error:function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
                alert(errorThrown);
            },
            success: function (data) {
                console.log(data);
                if (data.ok) {
                    poptip.alert(POP_TIP.addSuccess);
                    $("#plan-table-all").bootstrapTable('destroy');
                    tableInit(SELECT_ADMINPLAN_URL,"all");
                    cleanSelect();
                    $("#add-plan-modal").modal('hide');
                } else {
                    if (data.message == "fail") {
                        poptip.alert(POP_TIP.addFail);
                        console.log(data);
                    } else if (data.message == "repeat") {
                        poptip.alert(POP_TIP.repeat);
                    }
                }
            }
        });
    }

    $("#show-span-planNumIsNull").val("");
}

/**
 *@desc 删除按钮
 *@date 2018/10/14 12:48:36
 *@author yueben
 */
function DeletePlan() {
    let checkboxTable = $("#plan-table-all").bootstrapTable('getSelections');
    if (checkboxTable.length > 1) {
        poptip.alert("一次只能删除一条数据！");
        return;
    } else if (checkboxTable.length < 1) {
        poptip.alert("请选择一条数据！");
        return;
    } else {
        console.log("deleteRow:" + checkboxTable[0].adminssionskey);
        let adminssionskey = checkboxTable[0].adminssionskey;
        poptip.confirm({
            content: POP_TIP.confirm,
            yes: function () {
                console.log('confirm-yes');
                //删除操作
                $.ajax({
                    url: DELETE_ADMINPLAN_URL + '/' + adminssionskey,
                    type: 'post',
                    // dataType: "json",
                    // contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.ok) {
                            poptip.alert(POP_TIP.deleteSuccess);
                            $("#plan-table-all").bootstrapTable('destroy');
                            tableInit(SELECT_ADMINPLAN_URL,"all");
                        } else {
                            poptip.alert(POP_TIP.dataLoadfail);
                        }

                    }
                });
                poptip.close();
            },
            cancel: function () {
                poptip.close();
            }
        });


    }

}


/**
 *@desc 搜索按钮
 *@date 2018/10/12 16:15:46
 *@author yueben
 */
$("#search-button").click(function () {

    $("#plan-table-all").bootstrapTable('destroy');
    tableInit(SELECT_CONDITION_URL,"condition");
    console.log("已更新");
})

$("#reset-button").click(function () {
    $("input[name='SSK']").val("");
})



