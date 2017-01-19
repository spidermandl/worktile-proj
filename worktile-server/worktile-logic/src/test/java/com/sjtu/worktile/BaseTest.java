package com.sjtu.worktile;

import com.sjtu.worktile.configuration.ServerProperties;
import com.squareup.okhttp.OkHttpClient;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Desmond on 13/01/2017.
 */
public class BaseTest {

    @Autowired
    protected ServerProperties properties;

    protected OkHttpClient client;
    protected String domain_url;

    @Before
    public void initConnection(){
        client = new OkHttpClient();
        domain_url = properties.getServer_domain()+"://"+properties.getPort();
    }
}
