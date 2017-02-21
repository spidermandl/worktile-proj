package com.sjtu.worktile.model.mappers;

import com.sjtu.worktile.model.TTaskAssignment;
import com.sjtu.worktile.model.TTaskAssignmentExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TTaskAssignmentMapper {
    long countByExample(TTaskAssignmentExample example);

    int deleteByExample(TTaskAssignmentExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TTaskAssignment record);

    int insertSelective(TTaskAssignment record);

    List<TTaskAssignment> selectByExample(TTaskAssignmentExample example);

    TTaskAssignment selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TTaskAssignment record, @Param("example") TTaskAssignmentExample example);

    int updateByExample(@Param("record") TTaskAssignment record, @Param("example") TTaskAssignmentExample example);

    int updateByPrimaryKeySelective(TTaskAssignment record);

    int updateByPrimaryKey(TTaskAssignment record);
}