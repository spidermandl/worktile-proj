package com.sjtu.worktile.model.mappers;

import com.sjtu.worktile.model.STemplate;
import com.sjtu.worktile.model.STemplateExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface STemplateMapper {
    long countByExample(STemplateExample example);

    int deleteByExample(STemplateExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(STemplate record);

    int insertSelective(STemplate record);

    List<STemplate> selectByExampleWithBLOBs(STemplateExample example);

    List<STemplate> selectByExample(STemplateExample example);

    STemplate selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") STemplate record, @Param("example") STemplateExample example);

    int updateByExampleWithBLOBs(@Param("record") STemplate record, @Param("example") STemplateExample example);

    int updateByExample(@Param("record") STemplate record, @Param("example") STemplateExample example);

    int updateByPrimaryKeySelective(STemplate record);

    int updateByPrimaryKeyWithBLOBs(STemplate record);

    int updateByPrimaryKey(STemplate record);
}