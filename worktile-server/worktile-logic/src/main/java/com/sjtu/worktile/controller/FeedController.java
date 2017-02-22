package com.sjtu.worktile.controller;

import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.msg.FeedListMsg;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Desmond on 22/02/2017.
 */
@RestController
@RequestMapping("/api/feed")
public class FeedController extends BaseController {

    @RequestMapping(value = "list", method = RequestMethod.POST)
    @ResponseBody
    public FeedListMsg.OutMsg list(final HttpServletRequest request,
                                   @RequestParam("pid") long pid,
                                   @RequestParam("type") int type,
                                   @RequestParam("page") int page,
                                   @RequestParam("size") int size) throws AppException{
        FeedListMsg.OutMsg msg = new FeedListMsg.OutMsg();
        return msg;
    }
}
