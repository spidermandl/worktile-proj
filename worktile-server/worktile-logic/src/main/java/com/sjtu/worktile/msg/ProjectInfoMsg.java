package com.sjtu.worktile.msg;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Desmond on 23/02/2017.
 * 项目详细信息
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
        public Data data = new Data();

        public static class Data implements ResponseMsg.Data{
            public ProjectInfo info = new ProjectInfo();
            public List<User> members = new ArrayList<>();
        }
        public static class ProjectInfo extends Project{
            public int[] navs = null;
            public int is_notify = 1;
            public int auto_archiebed = 0;
            public int show_completed = 0;
            public int is_calendar = 0;
            public String link_join_code = null;
            public int show_background =0;
            public String background =null;
            public String bg_image = null;
            public List<Extension> extensions = new ArrayList();
            public List<Label> labels = new ArrayList();
            public Team team = new Team();//所属团队
            public User owner = new User();//任务创建者
            public List<User> admins = new ArrayList<>();//任务管理者
            public int is_favorite = 0;
            public int star_pos = 196606;
        }

        public static class Extension{
            public long eid = 0;
            public  String key = null;
            public int type =1;
            public int pos = 0;
            public long join_date = 0;
        }

        public static class Label{
            public String name = null;
            public String desc = null;
            public long _id = 0;
        }
    }

    @Override
    void initMsg(){
        inMsg=new ProjectInfoMsg.InMsg();
        outMsg=new ProjectInfoMsg.OutMsg();
    }
}
