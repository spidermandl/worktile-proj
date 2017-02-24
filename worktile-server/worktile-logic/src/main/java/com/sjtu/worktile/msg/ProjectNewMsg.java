package com.sjtu.worktile.msg;

/**
 * Created by Desmond on 23/02/2017.
 * 创建project消息
 */
public class ProjectNewMsg extends PairMsg{
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 4002;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
    }


    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
        public ProjectNew data = new ProjectNew();

        public static class ProjectNew extends Project{
            public int[] navs = null;
            public int is_notify = 1;
            public int auto_archiebed = 0;
            public int show_completed = 0;
            public int is_calendar = 0;


        }
    }

    @Override
    void initMsg(){
        inMsg = new ProjectNewMsg.InMsg();
        outMsg = new ProjectNewMsg.OutMsg();
    }

}
