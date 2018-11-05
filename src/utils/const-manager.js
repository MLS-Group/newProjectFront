/**
 * @Desc 此页面为项目全局对象常量管理文件，例如提示语，弹出内容，正则验证，接口调用等
 * @Date 2018-09-17 09:33:03
 * @Author qitian
 */


/**
 * @Desc 弹出提示语，可以扩充，需要标明添加人
 * @Date 2018-09-16 23:18:10
 * @Author qitian
 */
const POP_TIP = {
    addSuccess: '新增成功',//by qitian
    saveSuccess: '保存成功',//by qitian
    addFail: '新增失败',//by qitian
    saveFail: '保存失败',//by qitian
    updateSuccess: '修改成功',//by qitian
    updateFail: '修改失败',//by qitian
    deleteSuccess: '删除成功',//by qitian
    deleteFail: '删除失败',//by qitian
    loadFail: '加载失败',//by qitian
    loadSuccess: '加载成功',//by qitian
    operateSuccess: '操作成功',//by qitian
    operateFail: '操作失败',//by qitian
    serverFail: '服务器连接失败',//by qitian
    rquestFail: '请求失败',//by qitian
    netFail: '网络连接失败',//by qitian
    dataLoadfail: '数据加载失败',//by qitian
    dataLoadsuccess: '数据加载成功',//by qitian
    selectOne: '请至少选择一条数据',//by qitian
    selOnlyone: '只能选择一条数据',//by qitian
    fileFormatFail: '您上传的文件格式不正确！',//by qitian
    completeInfo: '请完善信息',//by qitian
    checkInfo: '请核对信息',//,by qitian
    confirm: '您确定执行此操作吗？',
    choiceOne: '请选择一条选项', //by 刘志杰
    choiceOnlyOne: '只能选择一条选项', //by 刘志杰
    selectInputNotNull: "请输入要查询的内容",//by 刘志杰
    selectChoiceNotNull: "请选择要查询的内容",//by 刘志杰
    offlineTimeNotNull: "请选择下线时间",//by 刘志杰
    publishSuccess: "发布成功",//by 刘志杰
    selectFail:"查询失败", //by 刘志杰
    matriculateSuccess:"录入成功", //by 刘志杰





    repeat: '重复！！！' //by yueben
};

/**
 * @Desc 表单输入内容验证提示语
 *        命名需要和表单验证的正则key值相同(除了验证非空之外)
 *        可以扩充，需要标明添加人
 * @Date 2018-09-16 23:17:42
 * @Author qitian
 */
const INPUT_ALERT = {
    account: '请输入字母或数字，长度限制为4-15',//by qitian
    notNull: '此项不可为空',//by qitian
    IDNumber: '身份证格式不正确',//by qitian
    mobilePhoneModify:'电话号码不正确',//zhangziteng
    address:'地址信息'//zhangziteng

};

/**
 * @Desc 正则表达式，可以扩充，需要标明添加人/正则表达式代表的内容
 * @Date 2018-09-12 17:19:01
 * @Author qitian
 */
const REGEX = {
    mobilePhone: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
    mobilePhoneModify: /^[1-9][0-9]{10}$$/, //手机号只验证位数并且首位不能为0
    telephone: /^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$/,
    chineseTelephone: /\\d{3}-\\d{8}|\\d{4}-\\d{7}/,
    email: /^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, //123@qq.com
    emailModify: /^[A-Za-z0-9\._]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, //12_3.3@qq.self.cn
    number: /^[0-9]*$/, //仅数字
    chineseCharacters: /^[\u4e00-\u9fa5]{0,}$/, //中文
    IDNumber: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[X])$/, //身份证号码
    IDNumber2: /^[0-9a-zA-Z]{,18}*$/g, //身份证号码，仅控制位数不能超过18位
    account: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
    // address:/^{0,30}$/,
    password: /^[A-Za-z0-9][a-zA-Z0-9_]{5,20}$/, //验证密码，数字、字母、下划线，不少于5位
    strongPassword: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/,
    specialChar: /[@#\$%\^&\*]+/g, //特殊字符，可以扩充
    ipaddress: /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/ //IP地址
};
/**
 * @Desc 接口管理
 *         key值命名必须与后台接口名称一致
 * @Date 2018-09-17 09:37:50
 * @Author qitian
 */
const AJAX_URL = {
    login: requestJson ? '../../jsonDatas/login.json' : '',
    personDataTab: requestJson ? '../../jsonDatas/personDataTab.json' : '',
    personProblem: requestJson ? '../../jsonDatas/personProblem.json' : '',
    loginLog: requestJson ? '../../jsonDatas/loginLog.json' : '',
    knowledgeData: requestJson ? '../../jsonDatas/knowledgeData.json' : '',
    /**
     *@desc 修改密码
     *@date 2018/10/22 21:13:59
     *@author zhangziteng
     */
    updatePassword: requestJson ? '' : requestUrl + "api/generate/userinformation",
    checkPassword: requestJson ? '' : requestUrl + 'api/generate/userinformation/checkOldPassword',
    /**
     *@desc 招生计划数据
     *@date 2018/10/10 10:29:51
     *@author zhangziteng
     */
    recruitPlanData: requestJson ? '../../jsonDatas/recruitPlanData.json' : '',

    /*==============================用户管理=========================================*/
    //用户管理(分页查询) 刘志杰 2018-10-09
    selectUserManag: requestJson ? '../../jsonDatas/userData.json' : requestUrl + "api/generate/userinformation/queryUserInfoByPage",
    //用户管理(删除) 刘志杰 2018-10-09
    deleteUserManage: requestJson ? '' : requestUrl + "api/generate/userinformation/deleteUserInfo",
    //用户管理(新增) 刘志杰 2018-10-09
    insertUserManage: requestJson ? '' : requestUrl + "api/generate/userinformation/createUserInfo",
    //用户管理(修改) 刘志杰 2018-10-09
    updateUserManage: requestJson ? '' : requestUrl + "api/generate/userinformation/updateUserInfo",
    /*==============================发布管理=========================================*/
    //发布管理(分页查询) 刘志杰 2018-10-10
    selectReleaseManage: requestJson ? '../../jsonDatas/adminssionsDate.json' : '',
    //发布管理(发布,即修改) 刘志杰 2018-10-10
    updateReleaseManage: requestJson ? '../../jsonDatas/adminssionsDate.json' : '',
    /*==============================录取管理=========================================*/
    //录取管理(分页查询) 刘志杰 2018-10-11
    selectMatriculate: requestJson ? '../../jsonDatas/matriculateData.json' : requestUrl + "api/generate/examineevolunteerinformation/page",
    //录取管理 录取（修改） 刘志杰 2018-10-11
    insertMatriculate: requestJson ? '../../jsonDatas/matriculateData.json' : requestUrl + 'api/generate/examineevolunteerinformation',
    //录取管理 （个人详情） 刘志杰 2018-10-11
    personalDetailsMatriculate: requestJson ? '../../jsonDatas/matriculateData.json' : requestUrl + 'api/generate/examineeinformation',

    /**
     *@desc 日志管理，答疑管理数据
     *@date 2018/09/27 09:23:06
     *@author 宣文斌
     */
    questionManage: requestJson ? '../../jsonDatas/questionManageData.json' : '',
    SBOMChangeLogData: requestJson ? '../../jsonDatas/SBOMChangeLogData.json' : '',
    operationLogData: requestJson ? '../../jsonDatas/operationLogData.json' : '',
    announceManagementData: requestJson ? '../../jsonDatas/announceManagementData.json' : '',
    /**
     *@desc
     *@date 2018/09/27 10:05:20
     *@author 刘笑天
     */
    personnelConfiguration: requestJson ? '../../jsonDatas/personnelConfiguration.json' : '',
    bomChange: requestJson ? '../../jsonDatas/bomChange.json' : '',
    administratorList: requestJson ? '../../jsonDatas/administratorList.json' : '',
    //管理员登录 刘笑天 20181024
    adminLogin: requestJson ? '../../jsonDatas/login.json' : requestUrl + 'api/generate/userinformation/userLogin',
    //崔雨鑫
    announceData: requestJson ? '../../jsonDatas/announceData.json' : '',
    announceDetailData: requestJson ? '../../jsonDatas/announceDetailData.json' : '',

    //王克龙
    knowledgeDetial: requestJson ? '../../jsonDatas/knowledgeDetial.json' : '',
    IndexEvent: requestJson ? '../../jsonDatas/index-event.json' : '',
    IndexData: requestJson ? '../../jsonDatas/index-data.json' : '',
    IndexSpare: requestJson ? '../../jsonDatas/index-spare.json' : '',
    vinQuery: requestJson ? '../../jsonDatas/vin-query.json' : '',
    vinList: requestJson ? '../../jsonDatas/vin-list.json' : '',
}
