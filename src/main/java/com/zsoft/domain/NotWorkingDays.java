package com.zsoft.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class NotWorkingDays {
    @Id
    public String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String month;
    public String days;



    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public NotWorkingDays() {
    }

    public NotWorkingDays(String month, String days) {
        this.month = month;
        this.days = days;
    }
    @Override
    public String toString()
    {
        return String.format("NotWorkingDay[id=%s, month='%s', days='%s']", id, month, days);
    }

}
