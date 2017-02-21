package com.sjtu.worktile.controller;

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
        return msg;
    }
}
