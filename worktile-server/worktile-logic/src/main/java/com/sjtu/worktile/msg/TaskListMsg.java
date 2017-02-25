package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Desmond on 11/01/2017.
 * 获取用户任务列表
 */
public class TaskListMsg extends PairMsg {

    /**
     * 消息序列号
     */
    private static final int MSG_CODE = 5001;

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
        public List<Task> data = new ArrayList<Task>();
        /**
         * 任务输出格式
         */
        public static class Task{
            public String name = null;//任务名称
            public int pid = 0;//项目id
            public int tid = 0;//任务id
            public int status = 0;//任务状态
            public int entry_id = 0;//任务组id
            public String entry_name = null;//任务组名称
            public Date created_at = null;
            public Date updated_at = null;
            public int pos = 0;//位置
            public List<Label> labels = new ArrayList<>();//标签
            public List<Todo> todos = new ArrayList<>();//检查项
            public List<Badge> badges = new ArrayList<>();//附加信息
            public List<User> watchers = new ArrayList<>();//关注的人
            public List<User> members = new ArrayList<>();//分配的成员
            public int completed = 1;//是否完成：0：未完成，1：已完成
            public Date expire_date = null;
            String desc = null;//描述
        }

        public static class Label{
            String name =null;//标签名称
            String desc = null;//描述
        }
        public static class Todo{
            int todo_id = 0;//检查项id
            String name = null;//检查项名称
            int checked = 0;//检查结果
            int pos = 0;
        }
        public static class Badge{
            Date expire_date = null;//过期时间
            int comment_count = 1;//评论数量
            int todo_checked_couont = 0;//已检查过的数量
            int todo_count = 2;//检查项数量
            int file_count =0;//文件数量
        }


    }

    @Override
    void initMsg() {
        inMsg = new TaskListMsg.InMsg();
        outMsg = new TaskListMsg.OutMsg();
    }
}
