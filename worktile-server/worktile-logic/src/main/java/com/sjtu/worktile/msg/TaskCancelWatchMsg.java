package com.sjtu.worktile.msg;

/**
 * Created by lenovo on 2017/2/24.
 */
public class TaskCancelWatchMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5011;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
        public long task_assign_id=0;//任务分配id
    }

    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
    }
    @Override
    public void initMsg(){
        inMsg=new TaskCancelassignmentMsg.InMsg();
        outMsg=new TaskCancelassignmentMsg.OutMsg();
    }
}
