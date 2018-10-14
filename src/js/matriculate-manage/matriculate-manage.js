/*录取管理 刘志杰 2018-10-11*/
const EXAMINEEVOLUNTEER = {}; //复选框 选中的志愿
$(function () {
    tableInit(AJAX_URL.selectMatriculate, false);

    laydateInit("#matriculate-input-admissiontime");
})


/**
 * @Desc 表格初始化
 * @Author 刘志杰
 * @param tableUrl 表格中获取数据的url地址
 * @param flag 是否是条件查询（true:条件查询）
 * @Date 2018-10-09
 */
function tableInit(tableUrl, flag) {
    $('#my-table').bootstrapTable({
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
        pageSize: 5,                     //每页的记录行数（*）
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
            var temp = {}
            if (flag) {   // 条件查询
                temp = {
                    pageSize: params.limit,                         //页面大小
                    page: (params.offset / params.limit) + 1,   //页码
                    admissionstatue: "0",  //状态
                    schoolname: "理",  //学校名称
                    provincename: "天",  //省份
                    starttotalscore: "1",  //开始分数
                    endtotalscore: "100",  //结束分数
                };
            } else {
                temp = {
                    pageSize: params.limit,                         //页面大小
                    page: (params.offset / params.limit) + 1,   //页码

                    // sort: params.sort,      //排序列名
                    // sortOrder: params.order //排位命令（desc，asc）
                };
            }

            return temp;
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
            title: '申报时间'
        }, {
            field: 'volunteernumber',
            title: '志愿编号',

        }, {
            field: 'ExamineeinformationEO.examineekey',
            title: '学生信息主键',

        }, {
            field: 'ID',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                console.log("=========================================")

                console.log(row)
                //通过formatter可以自定义列显示的内容
                //value：当前field的值，即id
                //row：当前行的数据
                let a = '<a href="#" onclick="personalDetails(' + row.ExamineeinformationEO.examineekey + ')">详情</a>';
                return a;
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
    $('#my-table').bootstrapTable('hideColumn', 'examineekey');

}



/**
 * @Desc “查询”按钮
 * @Author 刘志杰
 * @Date 2018-10-11
 */
function selectMatriculate() {

    var opt = {
        url: "http://local/api/data/?format=json",
        silent: true,
        query:{
            type:1,
            level:2
        }
    };

    $("#my_table").bootstrapTable('refresh', opt);

}

/**
 * @Desc 模态框【录取】（“确认”按钮）
 * @Author 刘志杰
 * @Date 2018-10-11
 */
function confirm() {
    $.ajax({
        url: AJAX_URL.insertMatriculate,
        type: requestJson ? 'get' : 'put',
        data: JSON.stringify({
            "volunteerkey": EXAMINEEVOLUNTEER.volunteerkey,
            "admissionstatue": 1,
            "admissiontime": $("#matriculate-input-admissiontime").val()
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            poptip.alert(POP_TIP.deleteSuccess);
            $("#matriculate-modal").modal("hide");
            console.log(data)
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
        max: new Date().Format('yyyy-MM-dd'),
        done: function (value) {

        }
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
    $("#matriculate-modal").modal("show");
    EXAMINEEVOLUNTEER.volunteerkey = checkboxTable[0].volunteerkey;


}


/**
 * @Desc 打开模态框【个人详情】
 * @Author 刘志杰
 * @param examineekey 该志愿 对应的考生id
 * @Date 2018-10-12
 */
function personalDetails(examineekey) {
    $.ajax({
        url: AJAX_URL.personalDetailsMatriculate + "/" + examineekey,
        type: 'get',
        dataType: "json",
        // contentType: "application/json;charset=utf-8",
        success: function (result) {
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
            console.log(result)
            $("#personalinfo-modal").modal('show');
        }
    })
}


