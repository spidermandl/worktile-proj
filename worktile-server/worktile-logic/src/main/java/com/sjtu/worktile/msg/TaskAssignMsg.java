package com.sjtu.worktile.msg;


/**
 * Created by lenovo on 2017/2/23.
 */
public class TaskAssignMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5008;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
        public long task_id=0;//任务id
        public long assigner_id=0;//指派用户id
        public long attach_id=0;//附件id
    }

    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
    }

    @Override
    void initMsg() {
        inMsg = new TaskListMsg.InMsg();
        outMsg = new TaskListMsg.OutMsg();
    }
}
