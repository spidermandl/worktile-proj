package com.sjtu.worktile.configuration;

import com.sjtu.worktile.filter.FormLoginFilter;
import com.sjtu.worktile.shiro.UserRealm;
import com.sjtu.worktile.shiro.credentials.RetryLimitHashedCredentialsMatcher;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.MemoryConstrainedCacheManager;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.env.Environment;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by Desmond on 31/12/2016.
 */
public class ShiroConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(ShiroConfiguration.class);

    /**
     * 这是个DestructionAwareBeanPostProcessor的子类，
     * 负责org.apache.shiro.util.Initializable类型bean的生命周期的，
     * 初始化和销毁。主要是AuthorizingRealm类的子类，以及EhCacheManager类
     * @return
     */
    @Bean(name = "lifecycleBeanPostProcessor")
    @ConditionalOnMissingBean
    public LifecycleBeanPostProcessor getLifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    /**
     * 采用DefaultAdvisorAutoProxyCreator的事务代理配置方式更加简洁，
     * 这个代理生成器自动搜索Spring容器中的Advisor，并为容器中所有的bean创建代理。
     * @return
     */
    @ConditionalOnMissingBean
    @Bean(name = "defaultAdvisorAutoProxyCreator")
    @DependsOn("lifecycleBeanPostProcessor")
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
        return defaultAdvisorAutoProxyCreator;
    }

    /**
     * (基于内存的)用户授权信息Cache
     */
    @Bean(name = "cacheManager")
    public CacheManager cacheManager() {
        EhCacheManager em = new EhCacheManager();
        em.setCacheManagerConfigFile("classpath:ehcache-shiro.xml");
        return em;
    }


    @Bean(name = "securityManager")
    @DependsOn(value = {"cacheManager"})
    public DefaultWebSecurityManager getDefaultWebSecurityManager(EhCacheManager cacheManager) {
        DefaultWebSecurityManager dwsm = new DefaultWebSecurityManager();
        //<!-- 用户授权/认证信息Cache, 采用EhCache 缓存 -->
        dwsm.setCacheManager(cacheManager);
        SecurityUtils.setSecurityManager(dwsm);
        return dwsm;
    }


//
//    /**
//     * 注册DelegatingFilterProxy（Shiro）
//     * 集成Shiro有2种方法：
//     * 1. 按这个方法自己组装一个FilterRegistrationBean（这种方法更为灵活，可以自己定义UrlPattern，
//     * 在项目使用中你可能会因为一些很但疼的问题最后采用它， 想使用它你可能需要看官网或者已经很了解Shiro的处理原理了）
//     * 2. 直接使用ShiroFilterFactoryBean（这种方法比较简单，其内部对ShiroFilter做了组装工作，无法自己定义UrlPattern，
//     * 默认拦截 /*）
//     *
//     */
////  @Bean
////  public FilterRegistrationBean filterRegistrationBean() {
////      FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
////      filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter"));
////      //  该值缺省为false,表示生命周期由SpringApplicationContext管理,设置为true则表示由ServletContainer管理
////      filterRegistration.addInitParameter("targetFilterLifecycle", "true");
////      filterRegistration.setEnabled(true);
////      filterRegistration.addUrlPatterns("/*");// 可以自己灵活的定义很多，避免一些根本不需要被Shiro处理的请求被包含进来
////      return filterRegistration;
////  }
//
//
//    @Bean
//    public DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
//        DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
//        daap.setProxyTargetClass(true);
//        return daap;
//    }
//
//
//    @Bean
//    public AuthorizationAttributeSourceAdvisor getAuthorizationAttributeSourceAdvisor(DefaultWebSecurityManager securityManager) {
//        AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
//        aasa.setSecurityManager(securityManager);
//        return aasa;
//    }
//

}
