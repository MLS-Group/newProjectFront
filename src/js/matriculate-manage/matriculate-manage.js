/*录取管理 刘志杰 2018-10-11*/
var examinee_condition = {} //条件查询的内容
$(function () {
    tableInit(AJAX_URL.selectMatriculate);
    laydateInit("#matriculate-input-admissiontime");
})


/**
 * @Desc 表格初始化
 * @Author 刘志杰
 * @param tableUrl 表格中获取数据的url地址
 * @Date 2018-10-09
 */
function tableInit(tableUrl) {
    $('#my-table').bootstrapTable({
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
        //showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "volunteerkey",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams: function (params) {
            let temp = {};
            if (examinee_condition.admissionstatue && examinee_condition.admissionstatue != "") {
                temp.admissionstatue = examinee_condition.admissionstatue;
            }
            if (examinee_condition.schoolname && examinee_condition.schoolname != "") {
                temp.schoolname = examinee_condition.schoolname;
            }
            if (examinee_condition.provincename && examinee_condition.provincename != "") {
                temp.provincename = examinee_condition.provincename;
            }
            if (examinee_condition.starttotalscore && examinee_condition.starttotalscore != "") {
                temp.starttotalscore = examinee_condition.starttotalscore;
            }
            if (examinee_condition.endtotalscore && examinee_condition.endtotalscore != "") {
                temp.endtotalscore = examinee_condition.endtotalscore;
            }

            temp.pageSize = params.limit;                       //页面大小
            temp.page = (params.offset / params.limit) + 1;  //页码
            // temp.sort = params.sort;      //排序列名
            // temp.orderBy = params.order; //排位命令（desc，asc）

            return JSON.stringify(temp);

        },
        columns: [{
            field: 'checkbox',
            checkbox: true,
            visible: true               //是否显示复选框
        }, {
            field: 'volunteerkey',
            title: '志愿主键'
        }, {
            field: 'examinationnumber',
            title: '准考证号'
        }, {
            field: 'SchoolInformationEO.schoolname',
            title: '学校名称'
        }, {
            field: 'MajorInformationEO.majorname',
            title: '专业名称',
        }, {
            field: 'declaretime',
            title: '申报时间',
            formatter: function (value) {
                if (value != null) {
                    return getMyDate(value);
                }
                return "-";
            }
        }, {
            field: 'volunteernumber',
            title: '志愿编号',

        }, {
            field: 'ExamineeinformationEO.examineekey',
            title: '学生信息主键',

        }, {
            field: 'admissionstatue',
            title: '录取状态',
            formatter: function (val) {
                if (val != null) {
                    if (val == 0) {
                        return '未录取';
                    } else if (val == 1) {
                        return '录取';
                    }
                } else {
                    return '-';
                }
            }

        }, {
            field: 'ID',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                console.log(row)
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                let a = '<a href="#" onclick="personalDetails(' + row.ExamineeinformationEO.examineekey + ')">详情</a>';
                return a;
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
            console.log(result)
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
    $('#my-table').bootstrapTable('hideColumn', 'ExamineeinformationEO.examineekey');

}


/**
 * @Desc “查询”按钮
 * @Author 刘志杰
 * @Date 2018-10-11
 */
function selectMatriculate() {
    if (!$("#search-select-status") &&
        (!$("#search-input-school") || $("#search-input-school").val().trim() == "") &&
        (!$("#search-input-province") || $("#search-input-province").val().trim() == "") &&
        (!$("#search-input-score1") || $("#search-input-score1").val().trim() == "") &&
        (!$("#search-input-score2") || $("#search-input-score2").val().trim() == "")) {
        poptip.alert(POP_TIP.selectInputNotNull)
    }

    examinee_condition.admissionstatue = $("#search-select-status").val();
    examinee_condition.schoolname = $("#search-input-school").val();
    examinee_condition.provincename = $("#search-input-province").val();
    examinee_condition.starttotalscore = $("#search-input-score1").val();
    examinee_condition.endtotalscore = $("#search-input-score2").val();

    //条件查询
    $('#my-table').bootstrapTable('refresh');

}

/**
 * @Desc 模态框【录取】（“确认”按钮）
 * @Author 刘志杰
 * @Date 2018-10-11
 */
function confirm() {
    $.ajax({
        url: AJAX_URL.insertMatriculate,
        type: requestJson ? 'get' : 'post',
        data: JSON.stringify({
            "volunteerkey": $("#modal-input-key").val(),
            "admissionstatue": 1,
            "admissiontime": $("#matriculate-input-admissiontime").val()
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result.ok) {
                poptip.alert(POP_TIP.matriculateSuccess);
                $("#matriculate-modal").modal("hide");
                $("#my-table").bootstrapTable("refresh");
            } else {
                if (result.message) {
                    poptip.alert(result.message)
                } else {
                    poptip.alert(POP_TIP.matriculateFail)
                }
            }

        }
    })
}

/**
 * @Desc laydate 初始化
 * @Author 刘志杰
 * @param id 时间控件的id
 * @Date 2018-10-11
 */
function laydateInit(id) {
    laydate.render({
        elem: id,
        type: 'date'
    });

}

/**
 * @Desc “录取”按钮
 * @Author 刘志杰
 * @Date 2018-10-12
 */
function admssion() {
    let checkboxTable = $("#my-table").bootstrapTable('getSelections');
    if (checkboxTable.length <= 0) {
        poptip.alert(POP_TIP.choiceOne);
        return 0;
    } else if (checkboxTable.length > 1) {
        poptip.alert(POP_TIP.choiceOnlyOne);
        return 0;
    }
    $("#modal-input-key").val(checkboxTable[0].volunteerkey);
    //输入框内容 清空
    $("#matriculate-input-admissiontime").val("");
    $("#matriculate-modal").modal("show");


}


/**
 * @Desc 打开模态框【个人详情】
 * @Author 刘志杰
 * @param examineekey 该志愿 对应的考生id
 * @Date 2018-10-12
 */
function personalDetails(examineekey) {
    if (requestJson) {
        poptip.alert("就不让你看")
        return 0;
    }
    $.ajax({
        url: AJAX_URL.personalDetailsMatriculate + "/" + examineekey,
        type: 'get',
        dataType: "json",
        // contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result && result.ok) {
                $("#basicinfo-input-quasiexaminationnumber").val(result.data.quasiexaminationnumber)
                $("#basicinfo-input-realname").val(result.data.realname)
                if (result.data.sex == "男") {
                    $("input[name='basicinfo-radio-sex'][value='男']").attr("checked", true);
                } else if (result.data.sex == "女") {
                    $("input[name='basicinfo-radio-sex'][value='女']").attr("checked", true);
                }
                $("#basicinfo-input-age").val(result.data.age)
                $("#basicinfo-input-idcardnumber").val(result.data.idcardnumber)
                $("#basicinfo-input-registeredresidence").val(result.data.registeredresidence)
                $("#basicinfo-input-politicaloutlook").val(result.data.politicaloutlook)
                $("#basicinfo-input-nativeplace").val(result.data.nativeplace)
                $("#basicinfo-input-email").val(result.data.email)
                $("#basicinfo-input-phonenumber").val(result.data.phonenumber)
                $("#basicinfo-input-graduateschool").val(result.data.graduateschool)
                $("#personalinfo-modal").modal('show');
            } else {
                if (result && result.message != "") {
                    poptip.alert(result.message)
                } else {
                    poptip.alert(result.dataLoadfail)
                }
            }

        }
    })
}


