package com.sjtu.worktile.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TTaskLogExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TTaskLogExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("user_id is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("user_id is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Long value) {
            addCriterion("user_id =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Long value) {
            addCriterion("user_id <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Long value) {
            addCriterion("user_id >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("user_id >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Long value) {
            addCriterion("user_id <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Long value) {
            addCriterion("user_id <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Long> values) {
            addCriterion("user_id in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Long> values) {
            addCriterion("user_id not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Long value1, Long value2) {
            addCriterion("user_id between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Long value1, Long value2) {
            addCriterion("user_id not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andTaskIdIsNull() {
            addCriterion("task_id is null");
            return (Criteria) this;
        }

        public Criteria andTaskIdIsNotNull() {
            addCriterion("task_id is not null");
            return (Criteria) this;
        }

        public Criteria andTaskIdEqualTo(Long value) {
            addCriterion("task_id =", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotEqualTo(Long value) {
            addCriterion("task_id <>", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdGreaterThan(Long value) {
            addCriterion("task_id >", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdGreaterThanOrEqualTo(Long value) {
            addCriterion("task_id >=", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLessThan(Long value) {
            addCriterion("task_id <", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLessThanOrEqualTo(Long value) {
            addCriterion("task_id <=", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdIn(List<Long> values) {
            addCriterion("task_id in", values, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotIn(List<Long> values) {
            addCriterion("task_id not in", values, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdBetween(Long value1, Long value2) {
            addCriterion("task_id between", value1, value2, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotBetween(Long value1, Long value2) {
            addCriterion("task_id not between", value1, value2, "taskId");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("type is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("type is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(Integer value) {
            addCriterion("type =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(Integer value) {
            addCriterion("type <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(Integer value) {
            addCriterion("type >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("type >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(Integer value) {
            addCriterion("type <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(Integer value) {
            addCriterion("type <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<Integer> values) {
            addCriterion("type in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<Integer> values) {
            addCriterion("type not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(Integer value1, Integer value2) {
            addCriterion("type between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("type not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andPending1IsNull() {
            addCriterion("pending1 is null");
            return (Criteria) this;
        }

        public Criteria andPending1IsNotNull() {
            addCriterion("pending1 is not null");
            return (Criteria) this;
        }

        public Criteria andPending1EqualTo(String value) {
            addCriterion("pending1 =", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1NotEqualTo(String value) {
            addCriterion("pending1 <>", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1GreaterThan(String value) {
            addCriterion("pending1 >", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1GreaterThanOrEqualTo(String value) {
            addCriterion("pending1 >=", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1LessThan(String value) {
            addCriterion("pending1 <", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1LessThanOrEqualTo(String value) {
            addCriterion("pending1 <=", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1Like(String value) {
            addCriterion("pending1 like", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1NotLike(String value) {
            addCriterion("pending1 not like", value, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1In(List<String> values) {
            addCriterion("pending1 in", values, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1NotIn(List<String> values) {
            addCriterion("pending1 not in", values, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1Between(String value1, String value2) {
            addCriterion("pending1 between", value1, value2, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending1NotBetween(String value1, String value2) {
            addCriterion("pending1 not between", value1, value2, "pending1");
            return (Criteria) this;
        }

        public Criteria andPending2IsNull() {
            addCriterion("pending2 is null");
            return (Criteria) this;
        }

        public Criteria andPending2IsNotNull() {
            addCriterion("pending2 is not null");
            return (Criteria) this;
        }

        public Criteria andPending2EqualTo(String value) {
            addCriterion("pending2 =", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2NotEqualTo(String value) {
            addCriterion("pending2 <>", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2GreaterThan(String value) {
            addCriterion("pending2 >", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2GreaterThanOrEqualTo(String value) {
            addCriterion("pending2 >=", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2LessThan(String value) {
            addCriterion("pending2 <", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2LessThanOrEqualTo(String value) {
            addCriterion("pending2 <=", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2Like(String value) {
            addCriterion("pending2 like", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2NotLike(String value) {
            addCriterion("pending2 not like", value, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2In(List<String> values) {
            addCriterion("pending2 in", values, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2NotIn(List<String> values) {
            addCriterion("pending2 not in", values, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2Between(String value1, String value2) {
            addCriterion("pending2 between", value1, value2, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending2NotBetween(String value1, String value2) {
            addCriterion("pending2 not between", value1, value2, "pending2");
            return (Criteria) this;
        }

        public Criteria andPending3IsNull() {
            addCriterion("pending3 is null");
            return (Criteria) this;
        }

        public Criteria andPending3IsNotNull() {
            addCriterion("pending3 is not null");
            return (Criteria) this;
        }

        public Criteria andPending3EqualTo(String value) {
            addCriterion("pending3 =", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3NotEqualTo(String value) {
            addCriterion("pending3 <>", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3GreaterThan(String value) {
            addCriterion("pending3 >", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3GreaterThanOrEqualTo(String value) {
            addCriterion("pending3 >=", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3LessThan(String value) {
            addCriterion("pending3 <", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3LessThanOrEqualTo(String value) {
            addCriterion("pending3 <=", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3Like(String value) {
            addCriterion("pending3 like", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3NotLike(String value) {
            addCriterion("pending3 not like", value, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3In(List<String> values) {
            addCriterion("pending3 in", values, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3NotIn(List<String> values) {
            addCriterion("pending3 not in", values, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3Between(String value1, String value2) {
            addCriterion("pending3 between", value1, value2, "pending3");
            return (Criteria) this;
        }

        public Criteria andPending3NotBetween(String value1, String value2) {
            addCriterion("pending3 not between", value1, value2, "pending3");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}