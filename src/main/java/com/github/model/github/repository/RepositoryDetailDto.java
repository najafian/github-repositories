package com.github.model.github.repository;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class RepositoryDetailDto implements Serializable {
    private String html_url;
    private String full_name;
    private String name;
    private String language;
    private String stargazers_url;
    private int stargazers_count;
    private Double score;
    private String homepage;
    private String git_url;
    private String url;
    private String description;
    private String default_branch;
    private String created_at;
    private int forks_count;
    private String forks_url;

    public RepositoryDetailDto(String html_url, String full_name, String name, String language, String stargazers_url, int stargazers_count, Double score, String homepage, String git_url, String url, String description, String default_branch, String created_at, int forks_count, String forks_url) {
        this.html_url = html_url;
        this.full_name = full_name;
        this.name = name;
        this.language = language;
        this.stargazers_url = stargazers_url;
        this.stargazers_count = stargazers_count;
        this.score = score;
        this.homepage = homepage;
        this.git_url = git_url;
        this.url = url;
        this.description = description;
        this.default_branch = default_branch;
        this.created_at = created_at;
        this.forks_count = forks_count;
        this.forks_url = forks_url;
    }

    @JsonProperty("html_url")
    public String getHtml_url() {
        return html_url;
    }

    public void setHtml_url(String html_url) {
        this.html_url = html_url;
    }

    @JsonProperty("full_name")
    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    @JsonProperty("name")

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("language")
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @JsonProperty("stargazers_url")
    public String getStargazers_url() {
        return stargazers_url;
    }

    public void setStargazers_url(String stargazers_url) {
        this.stargazers_url = stargazers_url;
    }

    @JsonProperty("stargazers_count")
    public int getStargazers_count() {
        return stargazers_count;
    }

    public void setStargazers_count(int stargazers_count) {
        this.stargazers_count = stargazers_count;
    }

    @JsonProperty("score")
    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    @JsonProperty("homepage")
    public String getHomepage() {
        return homepage;
    }

    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    @JsonProperty("git_url")
    public String getGit_url() {
        return git_url;
    }


    public void setGit_url(String git_url) {
        this.git_url = git_url;
    }

    @JsonProperty("url")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("default_branch")
    public String getDefault_branch() {
        return default_branch;
    }

    public void setDefault_branch(String default_branch) {
        this.default_branch = default_branch;
    }

    @JsonProperty("created_at")
    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    @JsonProperty("forks_count")
    public int getForks_count() {
        return forks_count;
    }

    public void setForks_count(int forks_count) {
        this.forks_count = forks_count;
    }

    @JsonProperty("forks_url")
    public String getForks_url() {
        return forks_url;
    }

    public void setForks_url(String forks_url) {
        this.forks_url = forks_url;
    }
}
