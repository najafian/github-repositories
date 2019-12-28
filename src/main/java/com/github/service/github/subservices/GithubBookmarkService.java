package com.github.service.github.subservices;

import com.github.config.jwt.TokenUtil;
import com.github.model.github.Bookmark;
import com.github.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class GithubBookmarkService {

    private TokenUtil tokenUtil;
    private BookmarkRepository bookmarkRepository;

    @Autowired
    public GithubBookmarkService(TokenUtil tokenUtil, BookmarkRepository bookmarkRepository) {
        this.tokenUtil = tokenUtil;
        this.bookmarkRepository = bookmarkRepository;
    }

    public boolean saveBookmarks(String repositoryName, HttpServletRequest httpServletRequest) {
        String usernameFromToken = getUserName(httpServletRequest);
        Bookmark bookmark = new Bookmark(usernameFromToken, repositoryName);
        bookmarkRepository.save(bookmark);
        return true;
    }

    public List<Bookmark> getBookmarks(HttpServletRequest httpServletRequest) {
        String usernameFromToken = getUserName(httpServletRequest);
        return bookmarkRepository.findAllByUsername(usernameFromToken);
    }

    public boolean deleteBookmark(String repositoryName, HttpServletRequest httpServletRequest) {
        String usernameFromToken = getUserName(httpServletRequest);
        return bookmarkRepository.deleteBookmarkByRepositoryNameAndUsername(repositoryName, usernameFromToken);
    }

    private String getUserName(HttpServletRequest httpServletRequest) {
        String jwtToken = tokenUtil.getJwtFromRequestHeader(httpServletRequest.getHeader("Authorization"));
        return tokenUtil.getUsernameFromToken(jwtToken);
    }

    @ExceptionHandler
    public String getException(Exception e) {
        return e.getMessage();
    }

}
