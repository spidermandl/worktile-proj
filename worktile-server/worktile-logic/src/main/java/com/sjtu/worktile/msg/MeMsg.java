package com.sjtu.worktile.msg;


/**
 * Created by Desmond on 06/02/2017.
 * 获取个人信息协议
 */
public class MeMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 2001;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public Data data = new Data();
        /**
         * 个人信息输出格式
         */
        public class Data implements ResponseMsg.Data{
            public int uid = 0;//用户id
            public String display_name = null;//显示姓名
            public String icon = null;//头像
            public String username = null;//用户名
            public String position = null;//职位
            public String department =null;//部门
            public String email = null;//邮箱
            public String phone = null;//手机号
            public String nick = null;//昵称
            public String wechat = null;//微信号
            public Preference pref = null;//个人偏好
        }

    }
    /**
     * 个人偏好设置
     */
    public static class Preference{
        public int language = 0;//语言设置
        public int autoFocus =0;//发表评论后是否自动加入关注
        public int autoAssign = 0;//创建任务时默认分配给自己
        public int background = 0;//选择图片，定义自己的个性化背景
    }

    @Override
    void initMsg() {
        inMsg = new MeMsg.InMsg();
        outMsg = new MeMsg.OutMsg();
    }
}
