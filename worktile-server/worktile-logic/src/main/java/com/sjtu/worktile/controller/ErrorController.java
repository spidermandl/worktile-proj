package com.sjtu.worktile.controller;

import com.sjtu.worktile.msg.ErrorMsg;
import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Author:Desmond
 * 错误信息
 */
@RestController
@RequestMapping("/error")
public class ErrorController {

    @RequestMapping(value = "{code}", method = RequestMethod.GET)
    @ResponseBody
    public ErrorMsg.OutMsg error(@PathVariable final int code) {
        ErrorMsg.OutMsg msg = new ErrorMsg.OutMsg();
        msg.error_code = code;

        return msg;
    }
}
