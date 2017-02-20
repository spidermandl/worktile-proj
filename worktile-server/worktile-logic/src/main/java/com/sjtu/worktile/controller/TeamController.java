package com.sjtu.worktile.controller;

import com.sjtu.worktile.model.TTeam;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.msg.TeamContactsMsg;
import com.sjtu.worktile.msg.TeamInfoMsg;
import com.sjtu.worktile.msg.TeamListMsg;
import com.sjtu.worktile.msg.TeamNewMsg;
import com.sjtu.worktile.service.TeamService;
import com.sjtu.worktile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Desmond on 07/02/2017.
 * 团队相关api
 */
@RestController
@RequestMapping("/api/team")
public class TeamController extends BaseController{
    @Autowired
    private UserService userService;
    @Autowired
    private TeamService teamService;

    /**
     * 获取用户所在的组信息
     * @param request
     * @return
     */
    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseBody
    public TeamListMsg.OutMsg list(final HttpServletRequest request){
        int uid = super.getUserID(request);
        List<TTeam> teams = teamService.getSelfTeam(uid);
        TeamListMsg.OutMsg outMsg = new TeamListMsg.OutMsg();
        for (TTeam team : teams){
            if(outMsg.data.teams==null){
                outMsg.data.teams = new ArrayList<>();
            }
            TeamListMsg.Team t = new TeamListMsg.Team();
            t.team_id = team.getId();
            t.name = team.getName();
            t.count = teamService.getTeamCount(team.getId());
            t.visibility = team.getPublicity();
            t.logo = team.getLogo();
            outMsg.data.teams.add(t);
        }
        return outMsg;
    }

    /**
     * 获取所有组的联系人
     * @param request
     */
    @RequestMapping(value = "contacts", method = RequestMethod.GET)
    @ResponseBody
    public TeamContactsMsg.OutMsg contacts(final HttpServletRequest request){
        int uid = super.getUserID(request);
        List<TUser> users = teamService.getAllTeamContacts(uid);
        TeamContactsMsg.OutMsg msg = new TeamContactsMsg.OutMsg();
        //msg.data = new ArrayList<>();
        for (TUser u:users){
            TeamContactsMsg.OutMsg.Data data = new TeamContactsMsg.OutMsg.Data();
            data.uid = uid;
            data.icon = u.getHead();
            data.display_name = u.getSignature()==null?u.getAccount():u.getSignature();
            msg.data.add(data);
        }
        return msg;
    }

    /**
     * 创建team
     * @param request
     */
    @RequestMapping(value = "create", method = RequestMethod.POST)
    @ResponseBody
    public TeamNewMsg.OutMsg create(final HttpServletRequest request,
                                    @RequestParam("name") String name,
                                    @RequestParam("phone") String phone,
                                    @RequestParam("is_support") String is_support,
                                    @RequestParam("desc") String desc,
                                    @RequestParam("industry") int industry,
                                    @RequestParam("scale") String scale,
                                    @RequestParam("province") String province,
                                    @RequestParam("city") String city,
                                    @RequestParam("district") String district
                                    ){
        int uid = super.getUserID(request);
        TTeam tTeam = new TTeam();
        tTeam.setName(name);
        tTeam.setDescription(desc);
        tTeam.setCreaterId(uid);
        tTeam.setCreateTime(new Date());
        tTeam.setIndustry(industry);
        tTeam.setScale(scale);
        tTeam.setProvince(province);
        tTeam.setCity(city);
        tTeam.setDistrict(district);
        tTeam.setPublicity(1);

        teamService.createTeam(tTeam);

        return new TeamNewMsg.OutMsg();
    }

    /**
     * 获取团队基本信息
     * @param request
     * @param team_id
     * @return
     */
    @RequestMapping(value = "{team_id}/basic", method = RequestMethod.GET)
    @ResponseBody
    public TeamInfoMsg.OutMsg contacts(final HttpServletRequest request,@PathVariable int team_id){
        int uid = super.getUserID(request);
        TUser user = userService.findUserByID(uid);
        TTeam team =teamService.getTeamInfoById(team_id);
        TeamInfoMsg.OutMsg msg = new TeamInfoMsg.OutMsg();

        msg.data.team_id = team.getId();
        msg.data.url = null;//团队url
        msg.data.name =team.getName();
        msg.data.pic = team.getLogo();//logo
        msg.data.desc = team.getDescription();//team 描述
        msg.data.status = 0;
        msg.data.edition = 1;
        msg.data.create_date = team.getCreateTime();
        msg.data.visibility = team.getPublicity(); //团队类型， 1:私有,2:公开
        msg.data.industry = team.getIndustry();
        msg.data.default_pids = null;//默认pids
        msg.data.default_labels = null;//默认标签
        msg.data.template_id = team.getDefaultTemplateId()==null?0:team.getDefaultTemplateId();//模板id
        msg.data.phone= null;//团队phone
        msg.data.link_join_code =null;
        msg.data.is_dingteam = 0;//是否为dingding 项目
        msg.data.curr_role = 1;//当前用户角色: 1:管理员，2:成员，3:访客，4:来宾,公开项目可以访问
        msg.data.is_owner = uid == team.getCreaterId()?1:0;//是否为创建者
        msg.data.member_count = (int)teamService.getTeamCount(team_id);//成员数量
        msg.data.permission = 31;//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
        msg.data.project_count = 1;//团队中项目数量

        msg.data.owner.uid = user.getId();
        msg.data.owner.name = user.getAccount();
        msg.data.owner.email= user.getEmail();
        msg.data.owner.display_name = user.getSignature()==null?user.getAccount():user.getSignature();
        msg.data.owner.avatar = user.getHead();//用户头像
        msg.data.owner.desc = null;
        msg.data.owner.status = 1;//用户状态：1：正常，2：邀请，3：需要邮件确认
        msg.data.owner.phone_prefix = null;
        msg.data.owner.phone = user.getPhone();
        msg.data.owner.title = null;
        msg.data.owner.department = user.getDepartment();

        return msg;
    }
}
