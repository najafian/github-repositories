package com.github.model.github.commit;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class CommitDetailDto implements Serializable {
    private String name;
    private String email;
    private long count;
    private String date;

    public CommitDetailDto(String name, String email, String date) {
        this.name = name;
        this.email = email;
        this.date = date;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @JsonProperty("date")
    public String getDate() {
        return date;
    }

    @JsonProperty("count")
    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
