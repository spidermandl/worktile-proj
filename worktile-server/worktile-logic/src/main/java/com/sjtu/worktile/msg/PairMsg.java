package com.sjtu.worktile.msg;

import java.lang.reflect.Field;
import java.util.Date;

/**
 * Created by Desmond on 04/01/2017.
 * 消息抽象结构
 */
abstract public class PairMsg {


    public PairMsg(){
        initMsg();
    }

    public RequestMsg getInMsg() {
        return inMsg;
    }

    /**
     * 接受消息
     */
    protected RequestMsg inMsg;

    public ResponseMsg getOutMsg() {
        return outMsg;
    }

    /**
     * 回复消息
     */
    protected ResponseMsg outMsg;

    /**
     * 初始化消息结构
     */
    abstract void initMsg();

    public static interface RequestMsg{
        int code = 0;//消息索引号
    }

    public static interface ResponseMsg{
        int code = 0;//消息索引号
        String token = null;//token
        Data data = null;
        public interface Data{

        }

        /**
         * 用户信息 输出格式
         */
        public static class User {
            public long uid =0;
            public String name = null;
            public String email= null;
            public String display_name = null;
            public String avatar = null;//用户头像
            public String desc = null;
            public int status = 1;//用户状态：1：正常，2：邀请，3：需要邮件确认
            public String phone_prefix = null;
            public String phone = null;
            public String title = null;
            public String department = null;
            public int online = 1;//0：离线，1：在线，2：忙碌，3：离开

        }

        /**
         * team相关信息
         */
        public static class Team {
            public long team_id = 0;
            public String url = null;//团队url
            public String name =null;
            public String pic = null;//logo
            public String desc = null;//team 描述
            public int status = 0;
            public int edition = 1;
            public Date create_date = null;
            public int visibility = 1; //团队类型， 1:私有,2:公开
            public int industry = 1;
            public int[] default_pids = null;//默认pids
            public int[] default_labels = null;//默认标签
            public long template_id = 0;//模板id
            public String phone= null;//团队phone
            public String link_join_code =null;
            public int is_dingteam = 0;//是否为dingding 项目
            public int curr_role = 1;//当前用户角色: 1:管理员，2:成员，3:访客，4:来宾,公开项目可以访问
            public int is_owner = 1;//是否为创建者 1:是;0:否
            public long member_count = 0;//成员数量
            public User owner = new User();
            public int permission = 31;//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
            public long project_count = 1;//团队中项目数量
        }

        /**
         * 项目信息 输出格式
         */
        public static class Project{
            public long pid = 0;
            public String name =null;
            public long team_id= 0;
            public String desc =null;
            public int archived= 0;//是否存档，0：未存档，1：已存档
            public String pic =null;
            public String bg =null;
            public int visibility= 0;
            public int is_star= 0;//是否常用项目，0：非常用项目，1：常用项目
            public int pos= 0;
            public long member_count= 0;
            public int curr_role= 1;
            public int permission= 31;//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
        }
    }

//    /**
//     * 获取消息体内的信息
//     * @param key
//     * @return
//     */
//    public Object getValue(String key){
//        try {
//            Field field = inMsg.getClass().getField(key);
//            return field.get(inMsg);
//        } catch (NoSuchFieldException e) {
//            e.printStackTrace();
//        }   catch (IllegalAccessException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
//
//    /**
//     * 设置request字段
//     * @param key
//     * @param value
//     */
//    public void setReq(String key,Object value){
//        try {
//            Field field = inMsg.getClass().getField(key);
//            field.set(inMsg,value);
//        } catch (NoSuchFieldException e) {
//            e.printStackTrace();
//        }catch (IllegalAccessException e) {
//            e.printStackTrace();
//        }
//    }
//
//    /**
//     * 设置response字段
//     * @param key
//     * @param value
//     */
//    public void setResp(String key,Object value){
//        try {
//            Field field = outMsg.getClass().getField(key);
//            field.set(outMsg,value);
//        } catch (NoSuchFieldException e) {
//            e.printStackTrace();
//        }catch (IllegalAccessException e) {
//            e.printStackTrace();
//        }
//    }
}
