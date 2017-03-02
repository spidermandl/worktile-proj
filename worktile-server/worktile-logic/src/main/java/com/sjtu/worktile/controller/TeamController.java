package com.sjtu.worktile.controller;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.configuration.Const;
import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.model.*;
import com.sjtu.worktile.msg.*;
import com.sjtu.worktile.service.*;
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

    /**
     * 获取用户所在的team信息
     * @param request
     * @return
     */
    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseBody
    public TeamListMsg.OutMsg list(final HttpServletRequest request) throws AppException {
        long uid = super.getUserID(request);
        List<TTeam> teams = teamService.getSelfTeam(uid);
        TeamListMsg.OutMsg outMsg = new TeamListMsg.OutMsg();
        for (TTeam team : teams){
            PairMsg.ResponseMsg.Team t = new PairMsg.ResponseMsg.Team();
            mappingToTeamMsg(t,team,uid);
            TUser user = userService.findUserByID(uid);
            mappingToUserMsg(t.owner,user);
            //t.owner.online = ;
            outMsg.data.add(t);
        }
        return outMsg;
    }

    /**
     * 获取所有team相关的联系人
     * @param request
     */
    @RequestMapping(value = "contacts", method = RequestMethod.GET)
    @ResponseBody
    public TeamContactsMsg.OutMsg contacts(final HttpServletRequest request) throws AppException {
        long uid = super.getUserID(request);
        List<TUser> users = teamService.getAllTeamContacts(uid);
        TeamContactsMsg.OutMsg msg = new TeamContactsMsg.OutMsg();
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
                                    ) throws AppException {
        long uid = super.getUserID(request);
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

        teamService.createTeam(tTeam,uid);

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
    public TeamInfoMsg.OutMsg contacts(final HttpServletRequest request,@PathVariable long team_id) throws AppException {
        long uid = super.getUserID(request);
        TUser user = userService.findUserByID(uid);
        TTeam team =teamService.getTeamInfoById(team_id);
        TeamInfoMsg.OutMsg msg = new TeamInfoMsg.OutMsg();

        mappingToTeamMsg(msg.data,team,uid);
        mappingToUserMsg(msg.data.owner,user);

        return msg;
    }

    /**
     * 获取团队项目
     * @param request
     * @param team_id
     * @return
     */
    @RequestMapping(value = "{team_id}/projects", method = RequestMethod.GET)
    @ResponseBody
    public TeamProjectMsg.OutMsg projects(final HttpServletRequest request, @PathVariable int team_id) throws AppException {
        long uid = super.getUserID(request);
        List<TProject> projects = teamService.getTeamProjects(team_id,uid);
        TeamProjectMsg.OutMsg msg = new TeamProjectMsg.OutMsg();
        for (TProject pro : projects){
            TeamProjectMsg.OutMsg.Project p = new PairMsg.ResponseMsg.Project();
            p.pid = pro.getId();
            p.name =pro.getName();
            p.team_id = pro.getTeamId();
            p.desc = pro.getDescription();
            p.archived = 0;//是否存档，0：未存档，1：已存档
            p.pic = null;
            p.bg = null;
            p.visibility = 0;
            p.is_star = 0;//是否常用项目，0：非常用项目，1：常用项目
            p.pos = 0;
            p.member_count = 0;
            p.curr_role = 1;
            p.permission = 31;//当前用户权限: 31:管理员，15:成员，7:访客，5:来宾，0:无法操作
            msg.data.add(p);
        }

        return msg;
    }

    /**
     * 获取团队模板
     * @param request
     * @param team_id
     * @return
     * @throws AppException
     */
    @RequestMapping(value = "{team_id}/project/templates", method = RequestMethod.GET)
    @ResponseBody
    public TeamTemplatesMsg.OutMsg templates(final HttpServletRequest request, @PathVariable int team_id) throws AppException {
        TeamTemplatesMsg.OutMsg msg = new TeamTemplatesMsg.OutMsg();
        //测试数据
        msg.data = JSON.parseArray("[{\"template_id\":\"1\",\"name\":\"通用\",\"entries\":[{\"name\":\"要做\",\"pos\":65535},{\"name\":\"在做\",\"pos\":131071},{\"name\":\"待定\",\"pos\":196606}]},{\"template_id\":\"2\",\"name\":\"研发\",\"entries\":[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"开发中\",\"pos\":131071},{\"name\":\"待测试\",\"pos\":196606},{\"name\":\"待发布\",\"pos\":262141},{\"name\":\"已发布\",\"pos\":327676}]},{\"template_id\":\"3\",\"name\":\"产品Roadmap\",\"entries\":[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"待发布\",\"pos\":131071},{\"name\":\"已发布\",\"pos\":196606},{\"name\":\"已完成\",\"pos\":262141}]},{\"template_id\":\"4\",\"name\":\"CRM 模板\",\"entries\":[{\"name\":\"客户资料库\",\"pos\":65535},{\"name\":\"销售机会\",\"pos\":131071},{\"name\":\"联系中\",\"pos\":196606},{\"name\":\"已联系\",\"pos\":262141},{\"name\":\"售前\",\"pos\":327676},{\"name\":\"成单\",\"pos\":393211},{\"name\":\"售后\",\"pos\":458746}]},{\"template_id\":\"5\",\"name\":\"Bug管理\",\"entries\":[{\"name\":\"收件箱\",\"pos\":65535},{\"name\":\"开发\",\"pos\":131071},{\"name\":\"测试\",\"pos\":196606},{\"name\":\"上线\",\"pos\":262141}]},{\"template_id\":\"6\",\"name\":\"招聘流程\",\"entries\":[{\"name\":\"简历库\",\"pos\":65535},{\"name\":\"笔试\",\"pos\":131071},{\"name\":\"面试\",\"pos\":196606},{\"name\":\"试用期\",\"pos\":262141},{\"name\":\"入职\",\"pos\":327676}]},{\"template_id\":\"7\",\"name\":\"内容编辑\",\"entries\":[{\"name\":\"策划组稿\",\"pos\":65535},{\"name\":\"选题\",\"pos\":131071},{\"name\":\"初稿\",\"pos\":196606},{\"name\":\"审稿\",\"pos\":262141},{\"name\":\"校对\",\"pos\":327676},{\"name\":\"定稿\",\"pos\":393211},{\"name\":\"发布\",\"pos\":458746}]},{\"template_id\":\"8\",\"name\":\"产品设计\",\"entries\":[{\"name\":\"需求了解\",\"pos\":65535},{\"name\":\"头脑风暴\",\"pos\":131071},{\"name\":\"想法\\b收缩\",\"pos\":196606},{\"name\":\"原型\",\"pos\":262141},{\"name\":\"验证与测试\",\"pos\":327676}]}]",
                TeamTemplatesMsg.OutMsg.Template.class);
        //</>
        return msg;
    }

    /**
     * 获取
     * @param request
     * @param team_id
     * @return
     * @throws AppException
     */
    @RequestMapping(value = "{team_id}/disable/", method = RequestMethod.GET)
    @ResponseBody
    public TeamDisableMsg.OutMsg disable(final HttpServletRequest request, @PathVariable int team_id) throws AppException {
        TeamDisableMsg.OutMsg msg = new TeamDisableMsg.OutMsg();
        teamService.diableTeam(team_id);
        return msg;
    }

    /**
     * 获取单个team相关联系人
     * @param request
     * @param team_id
     * @return
     * @throws AppException
     */
    @RequestMapping(value = "{team_id}/contacts", method = RequestMethod.GET)
    @ResponseBody
    public TeamContactsMsg.OutMsg contact(final HttpServletRequest request, @PathVariable long team_id) throws AppException {
        TeamContactsMsg.OutMsg msg = new TeamContactsMsg.OutMsg();
        List<TUser> users=teamService.getSingleTeamContacts(team_id);
        for (TUser u:users){
            TeamContactsMsg.OutMsg.User data = new TeamContactsMsg.OutMsg.User();
            mappingToUserMsg(data,u);
//            TeamContactsMsg.OutMsg.Data data = new TeamContactsMsg.OutMsg.Data();
//            data.uid = uid;
//            data.icon = u.getHead();
//            data.display_name = u.getSignature()==null?u.getAccount():u.getSignature();
//            msg.data.add(data);
        }
        return msg;
    }
}
