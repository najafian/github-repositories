package com.github.repository;


import com.github.model.github.Bookmark;
import com.github.model.user.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends CrudRepository<Bookmark, Integer> {
    @Query("select b.repositoryName from Bookmark b where b.username= ?1")
    List<Bookmark> findAllByUsername(String username);

    boolean deleteBookmarkByRepositoryNameAndUsername(String repositoryName, String username);
}
