package com.sjtu.worktile.msg;

/**
 * Created by lenovo on 2017/2/22.
 */
public class TaskReviseMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5004;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
        public long task_id=0;//任务id
        public String title=null;//任务标题
        public String desc=null;//描述
    }

    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
    }

    @Override
    void initMsg(){
        inMsg = new TaskReviseMsg.InMsg();
        outMsg = new TaskReviseMsg.OutMsg();
    }
}
