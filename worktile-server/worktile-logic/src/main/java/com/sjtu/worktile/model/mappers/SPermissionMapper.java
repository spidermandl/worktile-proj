package com.sjtu.worktile.model.mappers;

import com.sjtu.worktile.model.SPermission;
import com.sjtu.worktile.model.SPermissionExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SPermissionMapper {
    long countByExample(SPermissionExample example);

    int deleteByExample(SPermissionExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(SPermission record);

    int insertSelective(SPermission record);

    List<SPermission> selectByExample(SPermissionExample example);

    SPermission selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") SPermission record, @Param("example") SPermissionExample example);

    int updateByExample(@Param("record") SPermission record, @Param("example") SPermissionExample example);

    int updateByPrimaryKeySelective(SPermission record);

    int updateByPrimaryKey(SPermission record);
}