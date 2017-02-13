package com.sjtu.worktile.controller;

import com.sjtu.worktile.model.TTeam;
import com.sjtu.worktile.model.TUser;
import com.sjtu.worktile.msg.TeamContactsMsg;
import com.sjtu.worktile.msg.TeamListMsg;
import com.sjtu.worktile.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
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
}
