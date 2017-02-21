package com.sjtu.worktile.model.mappers;

import com.sjtu.worktile.model.TTaskLog;
import com.sjtu.worktile.model.TTaskLogExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TTaskLogMapper {
    long countByExample(TTaskLogExample example);

    int deleteByExample(TTaskLogExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TTaskLog record);

    int insertSelective(TTaskLog record);

    List<TTaskLog> selectByExampleWithBLOBs(TTaskLogExample example);

    List<TTaskLog> selectByExample(TTaskLogExample example);

    TTaskLog selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TTaskLog record, @Param("example") TTaskLogExample example);

    int updateByExampleWithBLOBs(@Param("record") TTaskLog record, @Param("example") TTaskLogExample example);

    int updateByExample(@Param("record") TTaskLog record, @Param("example") TTaskLogExample example);

    int updateByPrimaryKeySelective(TTaskLog record);

    int updateByPrimaryKeyWithBLOBs(TTaskLog record);

    int updateByPrimaryKey(TTaskLog record);
}