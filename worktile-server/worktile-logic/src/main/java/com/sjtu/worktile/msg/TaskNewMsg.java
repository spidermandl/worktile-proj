package com.sjtu.worktile.msg;

/**
 * Created by lenovo on 2017/2/21.
 */
public class TaskNewMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5002;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
        public int uid=0;//用户id
        public int pid=0;//项目id
        public int entry_id = 0;//任务组id
        public String title=null;//任务标题
    }


    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
    }

    @Override
    void initMsg(){
        inMsg = new TaskListMsg.InMsg();
        outMsg = new TaskListMsg.OutMsg();
    }
}
