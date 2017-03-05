package com.sjtu.worktile.model.mappers;

import com.sjtu.worktile.model.TTaskAttachment;
import com.sjtu.worktile.model.TTaskAttachmentExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TTaskAttachmentMapper {
    long countByExample(TTaskAttachmentExample example);

    int deleteByExample(TTaskAttachmentExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TTaskAttachment record);

    int insertSelective(TTaskAttachment record);

    List<TTaskAttachment> selectByExampleWithBLOBs(TTaskAttachmentExample example);

    List<TTaskAttachment> selectByExample(TTaskAttachmentExample example);

    TTaskAttachment selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TTaskAttachment record, @Param("example") TTaskAttachmentExample example);

    int updateByExampleWithBLOBs(@Param("record") TTaskAttachment record, @Param("example") TTaskAttachmentExample example);

    int updateByExample(@Param("record") TTaskAttachment record, @Param("example") TTaskAttachmentExample example);

    int updateByPrimaryKeySelective(TTaskAttachment record);

    int updateByPrimaryKeyWithBLOBs(TTaskAttachment record);

    int updateByPrimaryKey(TTaskAttachment record);
}