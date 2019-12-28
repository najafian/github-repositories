package com.github.service.github;

import com.github.service.github.subservices.GithubBookmarkService;
import com.github.service.github.subservices.GithubCommitService;
import com.github.service.github.subservices.GithubRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacadeGithubService {
    private GithubRepositoryService computerService;
    private GithubCommitService githubCommitService;
    private GithubBookmarkService githubBookmarkService;

    @Autowired
    public FacadeGithubService(GithubRepositoryService computerService, GithubCommitService githubCommitService, GithubBookmarkService githubBookmarkService) {
        this.computerService = computerService;
        this.githubCommitService = githubCommitService;
        this.githubBookmarkService = githubBookmarkService;
    }


    public GithubRepositoryService getGithubRepositoryService() {
        return computerService;
    }

    public GithubCommitService getGithubCommitService() {
        return githubCommitService;
    }

    public GithubBookmarkService getGithubBookmarkService() {
        return githubBookmarkService;
    }
}
