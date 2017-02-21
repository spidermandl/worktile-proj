package com.sjtu.worktile.model.mappers;

import com.sjtu.worktile.model.TTaskComment;
import com.sjtu.worktile.model.TTaskCommentExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TTaskCommentMapper {
    long countByExample(TTaskCommentExample example);

    int deleteByExample(TTaskCommentExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TTaskComment record);

    int insertSelective(TTaskComment record);

    List<TTaskComment> selectByExampleWithBLOBs(TTaskCommentExample example);

    List<TTaskComment> selectByExample(TTaskCommentExample example);

    TTaskComment selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TTaskComment record, @Param("example") TTaskCommentExample example);

    int updateByExampleWithBLOBs(@Param("record") TTaskComment record, @Param("example") TTaskCommentExample example);

    int updateByExample(@Param("record") TTaskComment record, @Param("example") TTaskCommentExample example);

    int updateByPrimaryKeySelective(TTaskComment record);

    int updateByPrimaryKeyWithBLOBs(TTaskComment record);

    int updateByPrimaryKey(TTaskComment record);
}