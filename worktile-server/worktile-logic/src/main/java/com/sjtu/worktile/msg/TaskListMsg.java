package com.sjtu.worktile.msg;

import java.util.ArrayList;

/**
 * Created by Desmond on 11/01/2017.
 * 获取用户任务列表
 */
public class TaskListMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 1004;

    public static class InMsg implements RequestMsg{
        public int code = MSG_CODE;
        public int uid = 0;//用户id
        /**
         * 0:按处理优先级
         * 1:按截止日期
         * 2:最近完成的任务
         * 3:按更新时间
         * 4:我关注的
         * 5:我创建的
         * 6:全部任务
         * **/
        public int type = 0;
        public int page = 1;//分页
    }

    public static class OutMsg implements ResponseMsg{
        public int code = MSG_CODE;
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
        inMsg = new TaskListMsg.InMsg();
        outMsg = new TaskListMsg.OutMsg();
    }
}
