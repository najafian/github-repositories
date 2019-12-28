package com.github.service.github.subservices;

import com.github.model.github.repository.ParamModel;
import com.github.model.github.repository.RepositoryDetailDto;
import com.github.model.github.repository.RepositoryDetailDtoBuilder;
import com.github.model.github.repository.RepositoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GithubRepositoryService {
    private static final String CONTRIBUTORS_URL = "https://api.github.com/repos/%s/contributors";
    private static final String REPOSITORY_URL = "https://api.github.com/search/repositories";
    private RestTemplate restTemplate;

    @Autowired
    public GithubRepositoryService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public RepositoryDto fetchRepositories(ParamModel paramModel) {
        String repositoryParams = makeParams(paramModel);
        ResponseEntity<ModelMap> forEntity = restTemplate.getForEntity(REPOSITORY_URL + repositoryParams, ModelMap.class);
        RepositoryDto repositoryDto = convertModelToDto(forEntity.getBody());
        return repositoryDto;
    }

    private RepositoryDto convertModelToDto(ModelMap body) {
        int total_count = (Integer) body.get("total_count");
        Boolean incomplete_results = (Boolean) body.get("incomplete_results");
        List<Map> items = (List<Map>) body.get("items");
        List<RepositoryDetailDto> detailDtos = items.stream().map(m -> getRepositoryDetailDto(m)).collect(Collectors.toList());
        return new RepositoryDto(total_count, incomplete_results, detailDtos);
    }

    private RepositoryDetailDto getRepositoryDetailDto(Map m) {
        try {
            RepositoryDetailDtoBuilder detailtDto = new RepositoryDetailDtoBuilder();
            detailtDto
                    .setCreated_at((String) m.get("created_at"))
                    .setDefault_branch((String) m.get("default_branch"))
                    .setDescription((String) m.get("description"))
                    .setForks_count((Integer) m.get("forks_count"))
                    .setForks_url((String) m.get("forks_url"))
                    .setFull_name((String) m.get("full_name"))
                    .setGit_url((String) m.get("git_url"))
                    .setHomepage((String) m.get("homepage"))
                    .setHtml_url((String) m.get("html_url"))
                    .setLanguage((String) m.get("language"))
                    .setName((String) m.get("name"))
                    .setScore((Double) m.get("score"))
                    .setStargazers_count((Integer) m.get("stargazers_count"))
                    .setStargazers_url((String) m.get("stargazers_url"))
                    .setUrl((String) m.get("url"));
            return detailtDto.createRepositoryDetailDto();
        } catch (Exception e) {
            return new RepositoryDetailDtoBuilder().createRepositoryDetailDto();
        }
    }


    private String makeParams(ParamModel paramModel) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder
                .append("?q=")
                .append(paramModel.getRequestValue())
                .append("+language:")
                .append(paramModel.getLanguage())
                .append("&page=")
                .append(paramModel.getPage())
                .append("&per_page=")
                .append(paramModel.getPageSize())
                .append("&sort=")
                .append(paramModel.getSort())
                .append("&order=desc");
        return stringBuilder.toString();
    }
}
