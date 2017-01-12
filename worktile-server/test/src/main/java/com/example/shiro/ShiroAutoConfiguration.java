package com.example.shiro;

import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.crypto.CipherService;
import org.apache.shiro.io.Serializer;
import org.apache.shiro.mgt.RememberMeManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.realm.jdbc.JdbcRealm;
import org.apache.shiro.session.SessionListener;
import org.apache.shiro.session.mgt.ExecutorServiceSessionValidationScheduler;
import org.apache.shiro.session.mgt.SessionValidationScheduler;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.session.mgt.eis.SessionIdGenerator;
import org.apache.shiro.session.mgt.quartz.QuartzSessionValidationScheduler;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.web.mgt.CookieRememberMeManager;
import org.apache.shiro.web.servlet.Cookie;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.apache.shiro.web.session.mgt.WebSessionManager;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Import;

import javax.servlet.Filter;
import javax.sql.DataSource;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * This guy is lazy, nothing left.
 *
 * @author John Zhang
 */
@Configuration
@ConditionalOnWebApplication
@Import(ShiroConfiguration.class)
@EnableConfigurationProperties({
        ShiroProperties.class
})
public class ShiroAutoConfiguration {

    @Autowired
    private ShiroProperties properties;


    @Autowired(required = false)
    private CipherService cipherService;

    @Autowired(required = false)
    private Serializer<PrincipalCollection> serializer;

    @Autowired(required = false)
    private Collection<SessionListener> listeners;


    @Bean(name = "mainRealm")
    @ConditionalOnMissingBean(name = "mainRealm")
    @DependsOn(value = {"lifecycleBeanPostProcessor", "credentialsMatcher"})
    public Realm realm(CredentialsMatcher credentialsMatcher) {
        Class<?> realmClass = properties.getRealmClass();
        Realm realm = (Realm) BeanUtils.instantiate(realmClass);
        if (realm instanceof AuthenticatingRealm) {
            ((AuthenticatingRealm) realm).setCredentialsMatcher(credentialsMatcher);
        }
        return realm;
    }

    @Bean(name = "cacheManager")
    @ConditionalOnClass(name = {"org.apache.shiro.cache.ehcache.EhCacheManager"})
    @ConditionalOnMissingBean(name = "cacheManager")
    public CacheManager ehcacheManager() {
        EhCacheManager ehCacheManager = new EhCacheManager();
        ShiroProperties.Ehcache ehcache = properties.getEhcache();
        if (ehcache.getCacheManagerConfigFile() != null) {
            ehCacheManager.setCacheManagerConfigFile(ehcache.getCacheManagerConfigFile());
        }
        return ehCacheManager;
    }


    public ShiroFilterFactoryBean getShiroFilterFactoryBean(SecurityManager securityManager) throws Exception {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);
        shiroFilter.setLoginUrl(properties.getLoginUrl());
        shiroFilter.setSuccessUrl(properties.getSuccessUrl());
        shiroFilter.setUnauthorizedUrl(properties.getUnauthorizedUrl());

        Map<String, Filter> filterMap = new LinkedHashMap<String, Filter>();
        //filterMap.put("authc", formSignInFilter());

        Map<String, Filter> filterClasses = instantiateFilterClasses(properties.getFilters());
        if (filterClasses != null) {
            filterMap.putAll(filterClasses);
        }

//        if (shiroFilterCustomizer != null) {
//            filterMap = shiroFilterCustomizer.customize(filterMap);
//        }
//
        shiroFilter.setFilters(filterMap);

        Map<String, String> filterChains = new LinkedHashMap<>();
//        if (jdbcPermissionDefinitionsLoader != null) {
//            Map<String, String> permissionUrlMap = jdbcPermissionDefinitionsLoader.getObject();
//            filterChains.putAll(permissionUrlMap);
//        }
        if (properties.getFilterChainDefinitions() != null) {
            filterChains.putAll(properties.getFilterChainDefinitions());
        }
        shiroFilter.setFilterChainDefinitionMap(filterChains);
        return shiroFilter;
    }

    private Map<String, Filter> instantiateFilterClasses(Map<String, Class<? extends Filter>> filters) {
        Map<String, Filter> filterMap = null;
        if (filters != null) {
            filterMap = new LinkedHashMap<String, Filter>();
            for (String name : filters.keySet()) {
                Class<? extends Filter> clazz = filters.get(name);
                Filter f = BeanUtils.instantiate(clazz);
                filterMap.put(name, f);
            }
        }
        return filterMap;
    }

    @Bean(name = "shiroFilter")
    @DependsOn("securityManager")
    @ConditionalOnMissingBean
    public FilterRegistrationBean filterRegistrationBean(SecurityManager securityManager) throws Exception {
        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
        //该值缺省为false,表示生命周期由SpringApplicationContext管理,设置为true则表示由ServletContainer管理
        filterRegistration.addInitParameter("targetFilterLifecycle", "true");
        filterRegistration.setFilter((Filter) getShiroFilterFactoryBean(securityManager).getObject());
        filterRegistration.setEnabled(true);
        filterRegistration.addUrlPatterns("/*");
        return filterRegistration;
    }

    @Bean(name = "credentialsMatcher")
    @ConditionalOnMissingBean
    @DependsOn("cacheManager")
    public CredentialsMatcher credentialsMatcher(CacheManager cacheManager) {
        RetryLimitHashedCredentialsMatcher credentialsMatcher = new RetryLimitHashedCredentialsMatcher(cacheManager);
        credentialsMatcher.setHashAlgorithmName(properties.getHashAlgorithmName());
        credentialsMatcher.setHashIterations(properties.getHashIterations());
        credentialsMatcher.setStoredCredentialsHexEncoded(properties.isStoredCredentialsHexEncoded());
        credentialsMatcher.setRetryMax(properties.getRetryMax());
        return credentialsMatcher;
    }

}
