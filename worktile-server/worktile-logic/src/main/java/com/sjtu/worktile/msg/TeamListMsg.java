package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 07/02/2017.
 * 获取团队信息协议
 */
public class TeamListMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 3001;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public Data data = new Data();
        public class Data implements ResponseMsg.Data{
            public List<Team> teams = null;//团队信息
        }

    }

    /**
     * Team输出格式
     */
    public static class Team{
        public int team_id = 0;//团队id
        public String name = null;//团队name
        public int count = 0;//团队人数
        public int publicity = 0; //团队公开性
        public String logo = null;//团队logo
    }

    @Override
    void initMsg() {
        inMsg = new TeamListMsg.InMsg();
        outMsg = new TeamListMsg.OutMsg();
    }
}
