package com.sjtu.worktile.model;

public class TTaskTag {
    private Long id;

    private Long userId;

    private Long taskId;

    private String name;

    private Integer color;

    private String pending1;

    private String pending2;

    private String pending3;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getColor() {
        return color;
    }

    public void setColor(Integer color) {
        this.color = color;
    }

    public String getPending1() {
        return pending1;
    }

    public void setPending1(String pending1) {
        this.pending1 = pending1 == null ? null : pending1.trim();
    }

    public String getPending2() {
        return pending2;
    }

    public void setPending2(String pending2) {
        this.pending2 = pending2 == null ? null : pending2.trim();
    }

    public String getPending3() {
        return pending3;
    }

    public void setPending3(String pending3) {
        this.pending3 = pending3 == null ? null : pending3.trim();
    }
}