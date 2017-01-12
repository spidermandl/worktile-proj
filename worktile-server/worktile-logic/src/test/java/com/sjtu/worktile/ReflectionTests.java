package com.sjtu.worktile;

import com.sjtu.worktile.exception.AppException;
import com.sjtu.worktile.msg.LoginMsg;
import org.junit.Test;

/**
 * Created by Desmond on 05/01/2017.
 */
public class ReflectionTests {

    @Test
    public void setField(){
        LoginMsg msg = new LoginMsg();
        AppException e = new AppException(AppException.CATEGORY.USER_ALREADY_EXIST);
    }
}
