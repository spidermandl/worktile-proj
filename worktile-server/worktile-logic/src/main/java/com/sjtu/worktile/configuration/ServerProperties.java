package com.sjtu.worktile.configuration;

/**
 * Created by Desmond on 13/01/2017.
 */

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Configuration properties for server.
 */
@ConfigurationProperties(prefix = "server")
public class ServerProperties {

    private String server_domain = "localhost";
    private String port = "8080";

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getServer_domain() {
        return server_domain;
    }

    public void setServer_domain(String server_domain) {
        this.server_domain = server_domain;
    }
}
