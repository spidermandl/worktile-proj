package com.sjtu.worktile.configuration;

import org.apache.shiro.realm.Realm;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import java.util.Map;

/**
 * Configuration properties for Shiro.
 */
@ConfigurationProperties(prefix = "shiro")
public class ShiroProperties {
    /**
     * URL of login
     */
    private String loginUrl = "/login";
    /**
     * URL of success
     */
    private String successUrl = "/index";
    /**
     * URL of unauthorized
     */
    private String unauthorizedUrl = "/unauthorized";

    private String hashAlgorithmName = "MD5";

    private int hashIterations = 1;

    private boolean storedCredentialsHexEncoded = true;

    /**
     * 密码重试次数上限
     */
    private int retryMax = 5;

    /**
     * Shiro managed filters
     */
    private Map<String, Class<? extends Filter>> filters;

    /**
     * Filter chain
     */
    private Map<String, String> filterChainDefinitions;

    public String getLoginUrl() {
        return loginUrl;
    }

    public void setLoginUrl(String loginUrl) {
        this.loginUrl = loginUrl;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    public String getUnauthorizedUrl() {
        return unauthorizedUrl;
    }

    public void setUnauthorizedUrl(String unauthorizedUrl) {
        this.unauthorizedUrl = unauthorizedUrl;
    }

    public String getHashAlgorithmName() {
        return hashAlgorithmName;
    }

    public void setHashAlgorithmName(String hashAlgorithmName) {
        this.hashAlgorithmName = hashAlgorithmName;
    }

    public int getHashIterations() {
        return hashIterations;
    }

    public void setHashIterations(int hashIterations) {
        this.hashIterations = hashIterations;
    }

    public int getRetryMax() {
        return retryMax;
    }

    public void setRetryMax(int retryMax) {
        this.retryMax = retryMax;
    }

    public Map<String, Class<? extends Filter>> getFilters() {
        return filters;
    }

    public void setFilters(Map<String, Class<? extends Filter>> filters) {
        this.filters = filters;
    }

    public Map<String, String> getFilterChainDefinitions() {
        return filterChainDefinitions;
    }

    public void setFilterChainDefinitions(Map<String, String> filterChainDefinitions) {
        this.filterChainDefinitions = filterChainDefinitions;
    }

    public boolean isStoredCredentialsHexEncoded() {
        return storedCredentialsHexEncoded;
    }

    public void setStoredCredentialsHexEncoded(boolean storedCredentialsHexEncoded) {
        this.storedCredentialsHexEncoded = storedCredentialsHexEncoded;
    }

}
