/**
 * @Desc 全局配置文件，主要管理项目和后台对接的相关配置
 * @Date 2018-09-12 10:29:25
 * @Author qitian
 */

const serverIp = "localhost";
const serverPort = "8081";
const requestUrl = "http://" + serverIp + ":" + serverPort + "/";
const requestJson = false;//是否访问json静态数据，当为 false时，会访问后台接口