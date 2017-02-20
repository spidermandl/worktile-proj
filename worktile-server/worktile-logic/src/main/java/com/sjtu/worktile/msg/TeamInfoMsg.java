package com.sjtu.worktile.msg;

import java.util.Date;

/**
 * Created by Desmond on 19/02/2017.
 * 获取指定team基本信息
 */
public class TeamInfoMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3004;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public TeamInfoMsg.OutMsg.Data data = new TeamInfoMsg.OutMsg.Data();
        public static class Data implements ResponseMsg{
            public int team_id = 0;
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
            public int template_id = 0;//模板id
            public String phone= null;//团队phone
            public String link_join_code =null;
            public int is_dingteam = 0;//是否为dingding 项目
            public int curr_role = 1;//当前用户角色: 1:管理员，2:成员，3:访客，4:来宾,公开项目可以访问
            public int is_owner = 1;//是否为创建者
            public int member_count = 0;//成员数量
            public User owner = new User();
            public int permission = 31;//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
            public int project_count = 1;//团队中项目数量
        }


    }
    @Override
    void initMsg() {
        inMsg = new TeamInfoMsg.InMsg();
        outMsg = new TeamInfoMsg.OutMsg();
    }
}
