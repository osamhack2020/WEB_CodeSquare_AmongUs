package codeholic.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.transaction.Transactional;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import okhttp3.Response;

@Component
public class OpenStackApiService {

    @Autowired
    ApiUtil apiUtil;

    @Value("${openstackDomain}")
    private String openstackDomain;
    public final String ADMIN_ID = "admin";
    public final String ADMIN_PASSWORD = "cert0188!";
    public final String AUTHENTICATION_URL = "http://" + openstackDomain + "/identity/v3/auth/tokens";
    public final String USERCREATE_URL = "http://" + openstackDomain + "/identity/v3/users";
    public final String PROJECTID_URL = "http://" + openstackDomain + "/identity/v3/projects";
    public final String ROLEID_URL = "http://" + openstackDomain + "/identity/v3/roles";
    public final String SETROLE_URL = "http://" + openstackDomain + "/identity/v3/roles";

    private String getAuthenticationPostBody(String id, String password) {
        return "{ \"auth\": {\"identity\": {\"methods\": [\"password\"],\"password\": {\"user\": {\"name\":" + "\"" + id
                + "\",\"domain\": { \"id\": \"default\" },\"password\": \"" + password
                + "\"}}},\"scope\": {\"project\": {\"name\": \"" + id + "\",\"domain\": { \"id\": \"default\" }}}}}";
    }

    private String getUserCreatePostBody(String id, String password) {
        return "{\"user\": {\"default_project_id\": \"63ade6fefda14c3ea93cca65c435e35c\", \"name\": \"" + id + "\", \""
                + password + "\": \"changeme\"}}";
    }
    /*
    private String getSetUserRoleUrl(String projectId, String userId, String roleId) {
        return "http://" + this.openstackDomain + "/identity/v3/projects/" + projectId + "/users/" + userId + "/roles/"
                + roleId;
    }
    */

    @Transactional
    public void signupProcess(String id, String password) throws IOException {
        // 관리자 계정으로 Authentication post해서 관리자 토큰받기
        String authenticationToken = this.authentication(this.ADMIN_ID, this.ADMIN_PASSWORD);
        // 관리자 토큰으로 유저 생성하기 -> 유저 id 리턴
        String user_id = this.createUser(id, password, authenticationToken);
        // 관리자 토큰으로 user-vm project id 알아내기
        String project_id = this.getProjectId(authenticationToken);
        // 관리자 토큰으로 user 역할 id 알아내기
        String userRole_id = this.getUserRoleId(authenticationToken);
        // 관리자 토큰 + 유저 id + user 역할 id + project id로 유저의 권한 설정
        this.setUserProperties(authenticationToken, user_id, project_id, userRole_id);
    }

    public String signinProcess(String id, String password) {
        String authenticationToken = this.authentication(id, password);
        // 유저 계정으로 Authentication post해서 유저 토큰 받기
        // 이건 요청헤더에 넣어야 할듯
        return authenticationToken;
    }

    public String authentication(String id, String password) {
        Map<String, String> headers = new HashMap<String, String>();
        headers.put("Content-Type", "application/json");
        String postBody = this.getAuthenticationPostBody(id, password);
        Response response = apiUtil.doPost(this.AUTHENTICATION_URL, postBody, headers);
        // 성공하면 토큰, 실패하면 null 반환
        return (response == null) ? null : response.header("X-Subject-Token").toString();
    }

    public String createUser(String id, String password, String authenticationToken) throws IOException {
        Map<String,String> headers = new HashMap<String, String>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Auth-Token", authenticationToken);
        String postBody = this.getUserCreatePostBody(id, password);
        Response response = apiUtil.doPost(this.USERCREATE_URL, postBody, headers);
        String responseBody = response.body().string();
        String result = JsonParser
                                    .parseString(responseBody)
                                    .getAsJsonObject()
                                    .getAsJsonObject("user")
                                    .get("id")
                                    .getAsString();
        return result;
    }
    // 이거 나중에 값 저장되어있으면 그냥 바로 꺼내오기
    public String getProjectId(String authenticationToken) throws IOException {
        Map<String,String> headers = new HashMap<String, String>();
        headers.put("X-Auth-Token", authenticationToken);
        Response response = apiUtil.doGet(this.PROJECTID_URL, headers);
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("projects").iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString()=="user-vm")
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
    }
    public String getUserRoleId(String authenticationToken) throws IOException {
        Map<String,String> headers = new HashMap<String, String>();
        headers.put("X-Auth-Token", authenticationToken);
        Response response = apiUtil.doGet(this.ROLEID_URL, headers);
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("roles").iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString()=="user")
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
    }
    public String setUserProperties(String authenticationToken, String user_id, String project_id, String userRole_id){
        Map<String,String> headers = new HashMap<String, String>();
        headers.put("X-Auth-Token", authenticationToken);
        Response response = apiUtil.doPut(this.ROLEID_URL, headers, "");
        
        return response.code()/100 == 2? "success" : "fail";
    }
}