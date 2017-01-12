package com.sjtu.worktile.msg;

import com.sjtu.worktile.model.TTask;

import java.util.ArrayList;

/**
 * Created by Desmond on 11/01/2017.
 */
public class MeTaskMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 1003;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
        public int uid = 0;//用户id
    }

    public static class OutMsg implements ResponseMsg{
        public int code = MSG_CODE;
        public int error_code = 0;
        public Data data = new Data() {
            public ArrayList<Task> tasks = null;
        };

        /**
         * 任务输出格式
         */
        public static class Task{
            public int tid = 0;
            public int status = 0;//任务状态
            public long deadline = 0;//任务截止日期
            public int commentNum = 0; //任务回复数量
            public ArrayList<String> accounts = null;//任务被分派者名称
        }

    }

    @Override
    void initMsg() {
        inMsg = new MeTaskMsg.InMsg();
        outMsg = new MeTaskMsg.OutMsg();
    }
}
