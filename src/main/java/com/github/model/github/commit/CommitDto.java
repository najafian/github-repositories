package com.github.model.github.commit;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class CommitDto implements Serializable {
    private List<CommitDetailDto> detailDtos;
    private String repositoryID;

    @JsonProperty("detailDtos")
    public List<CommitDetailDto> getDetailDtos() {
        return detailDtos;
    }

    @JsonProperty("repositoryID")
    public String getRepositoryID() {
        return repositoryID;
    }

    public CommitDto(List<CommitDetailDto> detailDtos, String repositoryID) {
        this.detailDtos = detailDtos;
        this.repositoryID = repositoryID;
    }
}
