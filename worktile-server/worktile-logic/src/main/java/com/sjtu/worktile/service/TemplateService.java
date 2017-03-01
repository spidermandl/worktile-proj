package com.sjtu.worktile.service;

import com.sjtu.worktile.model.STemplate;
import com.sjtu.worktile.model.STemplateExample;
import com.sjtu.worktile.model.mappers.STemplateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Desmond on 23/02/2017.
 * 模板service
 */
@Service
public class TemplateService {

    @Autowired
    private STemplateMapper sTemplateMapper;

    /**
     * 获取模板
     * @param id
     * @return
     */
    public STemplate getTemplateById(int id){
        return sTemplateMapper.selectByPrimaryKey(id);
    }

    /**
     * 插入模板
     * @param template
     */
    public void create(STemplate template){
        sTemplateMapper.insert(template);
    }

    /**
     * 取出所有数据
     * @return
     */
    public List<STemplate> entries(){
        STemplateExample query = new STemplateExample();
//        STemplateExample.Criteria criteria = query.createCriteria();
//        criteria.andIdIsNotNull();
        return sTemplateMapper.selectByExample(query);
    }
}
