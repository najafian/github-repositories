package com.github.web.rest;

import com.github.model.github.Bookmark;
import com.github.security.UserNotActivatedException;
import com.github.service.github.FacadeGithubService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/github-bookmark-url")
public class GithubBookmarkController {


    private FacadeGithubService githubService;

    public GithubBookmarkController(FacadeGithubService githubService) {
        this.githubService = githubService;
    }


    @GetMapping
    public List<Bookmark> fetchBookmarks(HttpServletRequest httpServletRequest) {
        return githubService.getGithubBookmarkService().getBookmarks(httpServletRequest);
    }

    @PostMapping
    public boolean insertBookmark(@RequestParam String repositoryName, HttpServletRequest httpServletRequest) {
        return githubService.getGithubBookmarkService().saveBookmarks(repositoryName, httpServletRequest);
    }

    @DeleteMapping
    public boolean deleteBookmark(@RequestParam String repositoryName, HttpServletRequest httpServletRequest) {
        return githubService.getGithubBookmarkService().deleteBookmark(repositoryName, httpServletRequest);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public UserNotActivatedException getException(Exception e) {
        return new UserNotActivatedException(e.getMessage());
    }
}
