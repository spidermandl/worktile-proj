package com.sjtu.worktile.shiro;

import com.sjtu.worktile.model.TUser;
import org.apache.shiro.authc.UsernamePasswordToken;

/**
 * Created by Desmond on 05/02/2017.
 */
public class MultiNamePasswordToken extends UsernamePasswordToken {

    public MultiNamePasswordToken() {
        super();
    }

    public MultiNamePasswordToken(String username, char[] password) {
        super(username,  password);
    }

    public MultiNamePasswordToken(String username, String password) {
        super(username,  password);
    }

    public MultiNamePasswordToken(String username, char[] password, String host) {
        super(username,  password,  host);
    }

    public MultiNamePasswordToken(String username, String password, String host) {
        super(username,  password,  host);
    }

    public MultiNamePasswordToken(String username, char[] password, boolean rememberMe) {
        super(username,  password,  rememberMe);
    }

    public MultiNamePasswordToken(String username, String password, boolean rememberMe) {
        super(username,  password,  rememberMe);
    }

    public MultiNamePasswordToken(String username, char[] password, boolean rememberMe, String host) {
        super(username,  password,  rememberMe,  host);
    }

    public MultiNamePasswordToken(String username, String password, boolean rememberMe, String host) {
        super(username,  password,  rememberMe,  host);
    }

    public TUser getRealUser() {
        return realUser;
    }

    public void setRealUser(TUser realUser) {
        this.realUser = realUser;
    }

    private TUser realUser;
}
