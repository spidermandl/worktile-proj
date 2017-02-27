package com.sjtu.worktile.msg;

/**
 * Created by lenovo on 2017/2/27.
 */
public class TaskReviseTodoMsg extends PairMsg {
    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5017;

    public static class InMsg implements RequestMsg{
        public int code=MSG_CODE;
        public long task_check_item_id=0;//任务检查项id
        public String content=null;//检查项内容
    }

    public static class OutMsg implements ResponseMsg{
        public int code=MSG_CODE;
    }
    @Override
    void initMsg(){
        inMsg=new TaskReviseTodoMsg.InMsg();
        outMsg=new TaskReviseTodoMsg.OutMsg();
    }
}
