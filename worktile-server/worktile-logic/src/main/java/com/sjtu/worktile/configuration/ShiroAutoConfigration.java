package com.sjtu.worktile.configuration;

import com.sjtu.worktile.shiro.UserRealm;
import com.sjtu.worktile.shiro.credentials.RetryLimitHashedCredentialsMatcher;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Import;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by Desmond on 09/01/2017.
 */
@Configuration
@ConditionalOnWebApplication
@Import(ShiroConfiguration.class)
@EnableConfigurationProperties({
        ShiroProperties.class
})
public class ShiroAutoConfigration {

    @Autowired
    private ShiroProperties properties;

    /**
     *
     * @param securityManager
     * @return
     */
    @Bean(name = "shiroFilter")
    @DependsOn("securityManager")
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultWebSecurityManager securityManager) {

        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        // 必须设置 SecurityManager
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        // 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
        shiroFilterFactoryBean.setLoginUrl("");
        // 登录成功后要跳转的连接
        shiroFilterFactoryBean.setSuccessUrl("/user");
        shiroFilterFactoryBean.setUnauthorizedUrl("/403");

        loadShiroFilterChain(shiroFilterFactoryBean);
        return shiroFilterFactoryBean;
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

    @Bean(name = "myShiroRealm")
    @DependsOn(value = {"securityManager","credentialsMatcher"})
    public Realm myShiroRealm(DefaultWebSecurityManager securityManager,CredentialsMatcher credentialsMatcher) {
        UserRealm realm = new UserRealm();
        realm.setCredentialsMatcher(credentialsMatcher);
        realm.setCachingEnabled(false);
        securityManager.setRealm(realm);
        return realm;
    }

    /**
     * 加载shiroFilter权限控制规则（从数据库读取然后配置）
     */
    private void loadShiroFilterChain(ShiroFilterFactoryBean shiroFilterFactoryBean){
        Map<String, Filter> filterChainFilterMap = new LinkedHashMap<String, Filter>();
        //filterChainFilterMap.put("authc",new FormLoginFilter());

        Map<String, Class<? extends Filter>> filterTypes = properties.getFilters();
        for (String key:filterTypes.keySet()) {
            Class<? extends Filter> clazz = filterTypes.get(key);
            Filter value = BeanUtils.instantiate(clazz);
            filterChainFilterMap.put(key,value);
        }
        shiroFilterFactoryBean.setFilters(filterChainFilterMap);
        /////////////////////// 下面这些规则配置最好配置到配置文件中 ///////////////////////
//        Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
//        // authc：该过滤器下的页面必须验证后才能访问，它是Shiro内置的一个拦截器org.apache.shiro.web.filter.authc.FormAuthenticationFilter
//        filterChainDefinitionMap.put("/user/login", "authc");// 这里为了测试，只限制/user，实际开发中请修改为具体拦截的请求规则
//        filterChainDefinitionMap.put("/index.jsp","anon");
//        filterChainDefinitionMap.put("/index.jsp","anon");
//        filterChainDefinitionMap.put("/unauthorized.jsp","anon");
//        filterChainDefinitionMap.put("/logout","logout");
//        filterChainDefinitionMap.put("/**","user");
//        // anon：它对应的过滤器里面是空的,什么都没做
//        logger.info("##################从数据库读取权限规则，加载到shiroFilter中##################");
//        filterChainDefinitionMap.put("/user/edit/**", "authc,perms[user:edit]");// 这里为了测试，固定写死的值，也可以从数据库或其他配置中读取
//
//        filterChainDefinitionMap.put("/login", "anon");
        //filterChainDefinitionMap.put("/**", "anon");//anon 可以理解为不拦截
        Map<String, String> filterChainDefinitionMap = properties.getFilterChainDefinitions();
        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
    }

}
