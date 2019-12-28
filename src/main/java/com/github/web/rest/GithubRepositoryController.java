package com.github.web.rest;

import com.github.model.github.commit.CommitDto;
import com.github.model.github.repository.ParamModel;
import com.github.model.github.repository.RepositoryDto;
import com.github.security.UserNotActivatedException;
import com.github.service.github.FacadeGithubService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/github-repository-url")
public class GithubRepositoryController {


    private FacadeGithubService githubService;

    public GithubRepositoryController(FacadeGithubService githubService) {
        this.githubService = githubService;
    }


    /**
     * @param paramModel
     * @return
     * @Author Mehdi Najafian
     * @Date 26/12/2019
     */
    @PostMapping
    public RepositoryDto fetchRepositories(@RequestBody ParamModel paramModel) {
        return githubService.getGithubRepositoryService().fetchRepositories(paramModel);
    }

    @GetMapping
    public CommitDto fetchCommitsList(@RequestParam String repositoryUrl, String repositoryID) {
        return githubService.getGithubCommitService().fetchCommits(repositoryUrl,repositoryID);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public UserNotActivatedException getException(Exception e) {
        return new UserNotActivatedException(e.getMessage());
    }
}
