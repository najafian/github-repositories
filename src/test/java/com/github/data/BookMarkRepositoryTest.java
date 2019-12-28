package com.github.data;

import com.github.model.github.Bookmark;
import com.github.model.user.Users;
import com.github.repository.BookmarkRepository;
import com.github.repository.UsersRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BookMarkRepositoryTest {

    @MockBean
    private BookmarkRepository mockRepository;

    List<Bookmark> bookmarks = new ArrayList<>();

    @Before
    public void init() {
        bookmarks.add(new Bookmark("mehdi", "spring/jpa"));
        bookmarks.add(new Bookmark("mehdi", "spring/aop"));
        bookmarks.add(new Bookmark("mehdi", "spring/security"));
    }

    @Test
    public void contextLoads() throws Exception {

        given(this.mockRepository.findAllByUsername("mehdi")).willReturn(bookmarks);

        assertTrue(this.mockRepository.findAllByUsername("mehdi").size() == 3);

    }

}
