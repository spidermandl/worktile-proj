package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 23/02/2017.
 * 工程详细信息
 */
public class ProjectInfoMsg extends PairMsg{

    /**
     * 消息序列号
     */
    private static final int MSG_CODE=4003;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
    }

    public static class OutMsg implements ResponseMsg {
        public int code = MSG_CODE;
        public List<Project> data = new ArrayList<>();

        public static class ProjectInfo extends Project{
            public int[] navs = null;
            public int is_notify = 1;
            public int auto_archiebed = 0;
            public int show_completed = 0;
            public int is_calendar = 0;

        }
    }

    @Override
    void initMsg(){
        inMsg=new ProjectInfoMsg.InMsg();
        outMsg=new ProjectInfoMsg.OutMsg();
    }
}
