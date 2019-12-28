package com.github.model.github.repository;

public class RepositoryDetailDtoBuilder {
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

    public RepositoryDetailDtoBuilder setHtml_url(String html_url) {
        this.html_url = html_url;
        return this;
    }

    public RepositoryDetailDtoBuilder setFull_name(String full_name) {
        this.full_name = full_name;
        return this;
    }

    public RepositoryDetailDtoBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public RepositoryDetailDtoBuilder setLanguage(String language) {
        this.language = language;
        return this;
    }

    public RepositoryDetailDtoBuilder setStargazers_url(String stargazers_url) {
        this.stargazers_url = stargazers_url;
        return this;
    }

    public RepositoryDetailDtoBuilder setStargazers_count(int stargazers_count) {
        this.stargazers_count = stargazers_count;
        return this;
    }

    public RepositoryDetailDtoBuilder setScore(Double score) {
        this.score = score;
        return this;
    }

    public RepositoryDetailDtoBuilder setHomepage(String homepage) {
        this.homepage = homepage;
        return this;
    }

    public RepositoryDetailDtoBuilder setGit_url(String git_url) {
        this.git_url = git_url;
        return this;
    }

    public RepositoryDetailDtoBuilder setUrl(String url) {
        this.url = url;
        return this;
    }

    public RepositoryDetailDtoBuilder setDescription(String description) {
        this.description = description;
        return this;
    }

    public RepositoryDetailDtoBuilder setDefault_branch(String default_branch) {
        this.default_branch = default_branch;
        return this;
    }

    public RepositoryDetailDtoBuilder setCreated_at(String created_at) {
        this.created_at = created_at;
        return this;
    }

    public RepositoryDetailDtoBuilder setForks_count(int forks_count) {
        this.forks_count = forks_count;
        return this;
    }

    public RepositoryDetailDtoBuilder setForks_url(String forks_url) {
        this.forks_url = forks_url;
        return this;
    }

    public RepositoryDetailDto createRepositoryDetailDto() {
        return new RepositoryDetailDto(html_url, full_name, name, language, stargazers_url, stargazers_count, score, homepage, git_url, url, description, default_branch, created_at, forks_count, forks_url);
    }
}