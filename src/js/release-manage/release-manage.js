/*发布管理 刘志杰 2018-10-10 */

var ADMINSSIONSLCONDITION = ""; //条件查询url
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
 * @param tableUrl 表格中获取数据的url地址
 * @Date 2018-10-09
 */

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