package com.sjtu.worktile.controller;

import com.sjtu.worktile.model.TTeam;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.msg.TeamContactsMsg;
import com.sjtu.worktile.msg.TeamListMsg;
import com.sjtu.worktile.msg.TeamNewMsg;
import com.sjtu.worktile.service.TeamService;
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
            t.publicity = team.getPublicity();
            t.logo = team.getLogo();
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
        msg.data = new ArrayList<>();
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

        teamService.createTeam(tTeam);

        return new TeamNewMsg.OutMsg();
    }
}
