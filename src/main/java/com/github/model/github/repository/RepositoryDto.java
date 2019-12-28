package com.github.model.github.repository;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class RepositoryDto implements Serializable {
    public RepositoryDto(int total_count, boolean incomplete_results, List<RepositoryDetailDto> items) {
        this.total_count = total_count;
        this.incomplete_results = incomplete_results;
        this.items = items;
    }

    private int total_count;
    private boolean incomplete_results;
    private List<RepositoryDetailDto> items;

    @JsonProperty("total_count")
    public int getTotal_count() {
        return total_count;
    }

    @JsonProperty("incomplete_results")
    public boolean isIncomplete_results() {
        return incomplete_results;
    }

    @JsonProperty("items")
    public List<RepositoryDetailDto> getItems() {
        return items;
    }
}
