package com.sjtu.worktile.model.mappers;

import com.sjtu.worktile.model.TTeam;
import com.sjtu.worktile.model.TTeamExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TTeamMapper {
    long countByExample(TTeamExample example);

    int deleteByExample(TTeamExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TTeam record);

    int insertSelective(TTeam record);

    List<TTeam> selectByExampleWithBLOBs(TTeamExample example);

    List<TTeam> selectByExample(TTeamExample example);

    TTeam selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TTeam record, @Param("example") TTeamExample example);

    int updateByExampleWithBLOBs(@Param("record") TTeam record, @Param("example") TTeamExample example);

    int updateByExample(@Param("record") TTeam record, @Param("example") TTeamExample example);

    int updateByPrimaryKeySelective(TTeam record);

    int updateByPrimaryKeyWithBLOBs(TTeam record);

    int updateByPrimaryKey(TTeam record);
}