package com.github.service.github.subservices;

import com.github.model.github.commit.CommitDetailDto;
import com.github.model.github.commit.CommitDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class GithubCommitService {
    private static final String COMMITS_URL = "https://api.github.com/repos/%s/commits";
    private RestTemplate restTemplate;

    @Autowired
    public GithubCommitService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public CommitDto fetchCommits(String repository, String repositoryID) {
        ResponseEntity<List> forEntity = restTemplate.getForEntity(String.format(COMMITS_URL, repository), List.class);
        List<CommitDetailDto> commitDetailDto = convertList2Dto(forEntity.getBody());
        return new CommitDto(commitDetailDto, repositoryID);
    }


    private List<CommitDetailDto> convertList2Dto(List mapList) {
        List<CommitDetailDto> mapListTemp = mapList;
        List<CommitDetailDto> listDto = Collections.unmodifiableList(mapListTemp.stream()
                .map(m -> getMapFromObject(m, "commit"))
                .map(m -> getMapFromObject(m, "author"))
                .map(m -> new CommitDetailDto(((Map) m).get("name").toString(), ((Map) m).get("email").toString(), ((Map) m).get("date").toString()))
                .collect(Collectors.toList()));
        return getGroupByEmailCommitDetail(listDto);
    }

    private List<CommitDetailDto> getGroupByEmailCommitDetail(List<CommitDetailDto> dtos) {
        Map<String, CommitDetailDto> distinctEmail = new ConcurrentHashMap<>();
        dtos.stream().parallel().forEach(i -> distinctEmail.put(i.getEmail(), i));
        Map<String, Long> groupByEmail = dtos.stream().collect(Collectors.groupingBy(CommitDetailDto::getEmail, Collectors.counting()));
        distinctEmail.entrySet().iterator().forEachRemaining(r -> {
            r.getValue().setCount(groupByEmail.get(r.getKey()));
        });
        List<CommitDetailDto> groupByList = new ArrayList<>(distinctEmail.values());
        return groupByList;
    }

    private Map<String, Map> getMapFromObject(Object obj, String key) {
        Object o = ((Map) obj).get(key);
        return (Map<String, Map>) o;
    }

}
