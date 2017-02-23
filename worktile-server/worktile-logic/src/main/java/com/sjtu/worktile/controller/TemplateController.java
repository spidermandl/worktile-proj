package com.sjtu.worktile.controller;

import com.alibaba.fastjson.JSON;
import com.sjtu.worktile.msg.TemplateListMsg;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Desmond on 21/02/2017.
 */
@RestController
@RequestMapping("/api/template")
public class TemplateController extends BaseController {

    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseBody
    public TemplateListMsg.OutMsg list(final HttpServletRequest request){
        TemplateListMsg.OutMsg msg = new TemplateListMsg.OutMsg();
        //测试数据
        msg.data = JSON.parseArray("[{\"category\":\"研发\",\"projects\":[{\"id\":\"customer-feedback\",\"name\":\"用户反馈\",\"name_pinyin\":\"yhfk,yonghufankui\",\"description\":\"\",\"image\":\"customer-feedback.jpg\"},{\"id\":\"requirement-management\",\"name\":\"需求管理\",\"name_pinyin\":\"xqgl,xuqiuguanli\",\"description\":\"\",\"image\":\"requirement-management.jpg\"},{\"id\":\"product-design\",\"name\":\"产品设计\",\"name_pinyin\":\"cpsj,chanpinsheji\",\"description\":\"\",\"image\":\"product-design.jpg\"},{\"id\":\"agile-whiteboard\",\"name\":\"敏捷看板\",\"name_pinyin\":\"mjkb,minjiekanban\",\"description\":\"\",\"image\":\"agile-whiteboard.jpg\"},{\"id\":\"sprint-backlog\",\"name\":\"Sprint Backlog\",\"name_pinyin\":\"SprintBacklog,SprintBacklog\",\"description\":\"\",\"image\":\"sprint-backlog.jpg\"},{\"id\":\"rnd-process\",\"name\":\"研发流程\",\"name_pinyin\":\"yflc,yanfaliucheng\",\"description\":\"\",\"image\":\"rnd-process.jpg\"},{\"id\":\"issue-track\",\"name\":\"Bug管理\",\"name_pinyin\":\"Buggl,Bugguanli\",\"description\":\"\",\"image\":\"issue-track.jpg\"},{\"id\":\"game-development\",\"name\":\"游戏开发\",\"name_pinyin\":\"yxkf,youxikaifa\",\"description\":\"\",\"image\":\"game-development.jpg\"}]},{\"category\":\"电商\",\"projects\":[{\"id\":\"marketing\",\"name\":\"市场活动\",\"name_pinyin\":\"schd,shichanghuodong\",\"description\":\"\",\"image\":\"marketing.jpg\"},{\"id\":\"promotion-preparation\",\"name\":\"大促筹备\",\"name_pinyin\":\"dccb,dacuchoubei\",\"description\":\"\",\"image\":\"promotion-preparation.jpg\"},{\"id\":\"customer-service\",\"name\":\"售后处理\",\"name_pinyin\":\"shcl,shouhouchuli\",\"description\":\"\",\"image\":\"customer-service.jpg\"}]},{\"category\":\"行政\",\"projects\":[{\"id\":\"recruitment\",\"name\":\"招聘管理\",\"name_pinyin\":\"zpgl,zhaopinguanli\",\"description\":\"\",\"image\":\"recruitment.jpg\"},{\"id\":\"okr\",\"name\":\"OKR目标管理\",\"name_pinyin\":\"OKRmbgl,OKRmubiaoguanli\",\"description\":\"\",\"image\":\"okr.jpg\"},{\"id\":\"staff-on-boarding\",\"name\":\"新员工入职流程\",\"name_pinyin\":\"xygrzlc,xinyuangongruzhiliucheng\",\"description\":\"\",\"image\":\"staff-on-boarding.jpg\"}]},{\"category\":\"其它\",\"projects\":[{\"id\":\"crm\",\"name\":\"客户CRM\",\"name_pinyin\":\"khCRM,kehuCRM\",\"description\":\"\",\"image\":\"crm.jpg\"},{\"id\":\"sales-funnel\",\"name\":\"销售漏斗\",\"name_pinyin\":\"xsld,xiaoshouloudou\",\"description\":\"\",\"image\":\"sales-funnel.jpg\"},{\"id\":\"lawyer\",\"name\":\"律师诉讼流程\",\"name_pinyin\":\"lssslc,lvshisusongliucheng\",\"description\":\"\",\"image\":\"lawyer.jpg\"},{\"id\":\"investment\",\"name\":\"投资项目管理\",\"name_pinyin\":\"tzxmgl,touzixiangmuguanli\",\"description\":\"\",\"image\":\"investment.jpg\"},{\"id\":\"decoration-materials\",\"name\":\"装修物料明细管理\",\"name_pinyin\":\"zxwlmxgl,zhuangxiuwuliaomingxiguanli\",\"description\":\"\",\"image\":\"decoration-materials.jpg\"},{\"id\":\"engineering\",\"name\":\"工程协作\",\"name_pinyin\":\"gcxz,gongchengxiezuo\",\"description\":\"\",\"image\":\"engineering.jpg\"},{\"id\":\"architectural-design\",\"name\":\"建筑设计\",\"name_pinyin\":\"jzsj,jianzhusheji\",\"description\":\"\",\"image\":\"architectural-design.jpg\"}]}]",
                TemplateListMsg.OutMsg.Template.class);
        //</>
        return msg;
    }
}
