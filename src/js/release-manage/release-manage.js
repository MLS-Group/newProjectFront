/*发布管理 刘志杰 2018-10-10 */
var ADMINSSIONS = requestJson ? AJAX_URL.adminssions : ""; //分页查询url
var ADMINSSIONSLCONDITION = ""; //条件查询url
var SCHOOLSURL = ""; //学校url
var PROVINCESURL = "";//省份url
var MAJORSURL = "";//专业url
var PUBLISHURL = "";//发布（修改）url


$(function () {
    tableInit(ADMINSSIONS);
    //laydate 初始化
    laydateInit();
    //加载 学校、省份、专业信息
    // loadData();
})

/**
 * @Desc laydate 初始化
 * @Author 刘志杰
 * @Date 2018-10-10
 */
function laydateInit() {
    laydate.render({
        elem: '#offlinetime',
        max: new Date().Format('yyyy-MM-dd'),
        done: function (value) {

        }
    });

}

/**
 * @Desc 表格初始化
 * @Author 刘志杰
 * @Date 2018-10-10
 */
function tableInit(tableUrl) {
    $('#adminssions-table').bootstrapTable({
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
            field: 'adminssionskey',
            title: '招生编号'
        }, {
            field: 'schoolname',
            title: '学校名称'
        }, {
            field: 'majorname',
            title: '专业名称'
        }, {
            field: 'adminssionsnumber',
            title: '招生人数',

        }, {
            field: 'createtime',
            title: '创建时间'
        }, {
            field: 'publishtime',
            title: '发布时间',

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
 * @Desc 查询
 * @Author 刘志杰
 * @Date 2018-10-10
 */
function selectAdminssions() {
    let schoolSelect = $("#school-select").val();
    let provinceSelect = $("#province-select").val();
    let majorSelect = $("#major-select").val();
    let tableUrl = ADMINSSIONSLCONDITION;
    if ((!schoolSelect || schoolSelect == "-1") && (!provinceSelect || provinceSelect == "-1") && (!majorSelect || majorSelect == "-1")) {
        poptip.alert(POP_TIP.selectChoiceNotNull);
        return 0;
    } else {
        tableUrl += "?";
    }

    if (schoolSelect && schoolSelect.trim() != "") {
        tableUrl += ("&schoolname=" + schoolSelect);
    }
    if (provinceSelect && provinceSelect.trim() != "") {
        tableUrl += ("&provincename=" + provinceSelect);
    }
    if (majorSelect && majorSelect.trim() != "") {
        tableUrl += ("&majorname=" + majorSelect);
    }
    tableInit(tableUrl);

}

/**
 * @Desc 加载 学校、省份、专业信息
 * @Author 刘志杰
 * @Date 2018-10-10
 */
function loadData() {
    $.ajax({
        url: SCHOOLSURL,
        type: requestJson ? 'get' : 'post',
        dataType: "json",
        success: function (data) {
            console.log("成功 加载 学校信息");

        }
    })
    $.ajax({
        url: PROVINCESURL,
        type: requestJson ? 'get' : 'post',
        dataType: "json",
        success: function (data) {
            console.log("成功 加载 省份信息");


        }
    })
    $.ajax({
        url: MAJORSURL,
        type: requestJson ? 'get' : 'post',
        dataType: "json",
        success: function (data) {
            console.log("成功 加载 专业信息");

        }
    })

}

/**
 * @Desc 点击发布按钮 打开模态框
 * @Author 刘志杰
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
 * @Desc 发布
 * @Author 刘志杰
 * @Date 2018-10-10
 */
function publishAdminssions() {
    let offlineTime = $("#offlinetime").val();
    if (!offlineTime || offlineTime == "") {
        poptip.alert(POP_TIP.offlineTimeNotNull);
        return 0;
    }
    $.ajax({
        url: PUBLISHURL,
        type: requestJson ? 'get' : 'post',
        dataType: "json",
        success: function (data) {
            console.log("====发布====");
            poptip.alert(POP_TIP.publishSuccess)
        }
    })

}