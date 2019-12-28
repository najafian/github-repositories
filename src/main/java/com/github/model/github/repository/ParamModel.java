package com.github.model.github.repository;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ParamModel {
    private String requestValue;
    private int page;
    private int pageSize;
    private String sort;
    private String language;

    @JsonProperty("requestValue")
    public String getRequestValue() {
        return requestValue;
    }

    @JsonProperty("page")
    public int getPage() {
        return page;
    }

    @JsonProperty("sort")
    public String getSort() {
        return sort;
    }

    @JsonProperty("pageSize")
    public int getPageSize() {
        return pageSize;
    }

    @JsonProperty("language")
    public String getLanguage() {
        return language;
    }
}
