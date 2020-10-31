package codeholic.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.transaction.Transactional;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import codeholic.domain.VmStatus;
import okhttp3.Response;

@Service
public class OpenStackApiService {

    @Autowired 
    private AsyncService asyncService;

    @Autowired
    ApiUtil apiUtil;

    private String openstackDomain = "http://stack.codesquare.space";
    
    String SETROLE_URL = openstackDomain + "/identity/v3/roles";

    private String getAuthenticationPostBody(String id, String password,String projectName) {
        return "{ \"auth\": {\"identity\": {\"methods\": [\"password\"],\"password\": {\"user\": {\"name\":" + "\"" + id
                + "\",\"domain\": { \"id\": \"default\" },\"password\": \"" + password
                + "\"}}},\"scope\": {\"project\": {\"name\": \"" + projectName + "\",\"domain\": { \"id\": \"default\" }}}}}";
    }

    private String getUserCreatePostBody(String id, String password, String projectId) {
        return "{\"user\": {\"default_project_id\": \""+projectId+"\", \"name\": \"" + id + "\", \"password\": \""
                + password + "\" }}";
    }
    
    private String getSetUserRoleUrl(String projectId, String userId, String roleId) {
        return this.openstackDomain + "/identity/v3/projects/" + projectId + "/users/" + userId + "/roles/"
                + roleId;
    }
    

    public void settingHeaders(Map<String,String> headers, String authenticationToken){
        headers.put("Content-Type", "application/json");
        headers.put("X-Auth-Token", authenticationToken);
    }
    public void settingHeaders(Map<String,String> headers){
        headers.put("Content-Type", "application/json");
    }
    @Transactional
    public String signupProcess(String id, String password) throws IOException {
        String ADMIN_ID = "admin";
        String ADMIN_PASSWORD = "password";
    
        try{
            // 관리자 계정으로 Authentication post해서 관리자 토큰받기
            String authenticationToken = this.authentication(ADMIN_ID, ADMIN_PASSWORD,"admin");
            // 관리자 토큰으로 demo project id 알아내기
            String project_id = this.getProjectId(authenticationToken);
            // 관리자 토큰으로 유저 생성하기 -> 유저 id 리턴
            String user_id = this.createUser(id, password, authenticationToken,project_id);
            // 관리자 토큰으로 user 역할 id 알아내기
            String userRole_id = this.getUserRoleId(authenticationToken);
            // 관리자 토큰 + 유저 id + user 역할 id + project id로 유저의 권한 설정
            return this.setUserProperties(authenticationToken, user_id, project_id, userRole_id);
             
        }catch(Exception e){
            return "fail";
        }
    }

    public String signinProcess(String id, String password) {
        String authenticationToken = this.authentication(id, password, "codesquare");
        // 유저 계정으로 Authentication post해서 유저 토큰 받기
        // 이건 요청헤더에 넣어야 할듯
        return authenticationToken;
    }

    public String authentication(String id, String password, String projectName) {
        String AUTHENTICATION_URL = openstackDomain + "/identity/v3/auth/tokens";
    
        Map<String, String> headers = new HashMap<>();
        this.settingHeaders(headers);
        String postBody = this.getAuthenticationPostBody(id, password, projectName);
        Response response = apiUtil.doPost(AUTHENTICATION_URL, postBody, headers);
        // 성공하면 토큰, 실패하면 null 반환
        return (response == null) ? null : response.header("X-Subject-Token").toString();
    }

    public String createUser(String id, String password, String authenticationToken, String projectId) throws IOException {
        String USERCREATE_URL = openstackDomain + "/identity/v3/users";
    
        Map<String,String> headers = new HashMap<String, String>();
        this.settingHeaders(headers,authenticationToken);
        String postBody = this.getUserCreatePostBody(id, password, projectId);
        Response response = apiUtil.doPost(USERCREATE_URL, postBody, headers);
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
        String PROJECTID_URL =  openstackDomain+"/identity/v3/projects";
        Map<String,String> headers = new HashMap<String, String>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doGet(PROJECTID_URL, headers);
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("projects").iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString().equals("codesquare"))
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
        
    }
    public String getUserRoleId(String authenticationToken) throws IOException {
        String ROLEID_URL = openstackDomain + "/identity/v3/roles";
    
        Map<String,String> headers = new HashMap<String, String>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doGet(ROLEID_URL, headers);
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("roles").iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString().equals("user"))
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
    }
    public String setUserProperties(String authenticationToken, String user_id, String project_id, String userRole_id){
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);
        String url = this.getSetUserRoleUrl(project_id, user_id, userRole_id);
        Response response = apiUtil.doPut(url, headers, "");
        return response.code()/100 == 2? "success" : "fail";
    }
    public String getImageId(String authenticationToken) throws IOException {
        String IMAGE_URL = openstackDomain+"/compute/v2.1/images";
        Map<String,String> headers = new HashMap<String, String>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doGet(IMAGE_URL, headers);
        
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("images").iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString().equals("ubuntucdr-1.0"))
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
    }

    private String getCreateVmUrl(String id, String imageId, String networkId){
        return "{ \"server\": {\"name\": \""+id+"\",\"imageRef\": \""+imageId+"\",\"flavorRef\": \"d2\",\"networks\": [{\"uuid\": \""+networkId+"\"}],"+
            "\"security_groups\": [{\"name\": \"cdr-rule\" }], \"availability_zone\": \"nova:codesquare-devstack-compute2\"}}";
    }
    

    public String getNetworkId(String authenticationToken) throws IOException {
        String NETWORK_URL = openstackDomain+":9999/v2.0/networks";
        Map<String,String> headers = new HashMap<String, String>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doGet(NETWORK_URL, headers);
        
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("networks").iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString().equals("heat-net"))
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
    }

    public void createVm(String id, String authenticationToken) throws IOException {
        String imageId = getImageId(authenticationToken);
        String networkId = getNetworkId(authenticationToken);
        String CREATEVM_URL = openstackDomain+"/compute/v2.1/servers";
        String postBody = getCreateVmUrl(id, imageId, networkId);
        Map<String,String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Auth-Token", authenticationToken);
        headers.put("User-Agent", "python-novaclient");
        headers.put("Accept", "application/json");    
        apiUtil.doPost(CREATEVM_URL, postBody, headers);
    }
    
    public String getFloatingNetworkId(String authenticationToken) throws IOException {
        String url = openstackDomain+":9999/v2.0/networks";
        Map<String,String> headers = new HashMap<>();
        headers.put("X-Auth-Token", authenticationToken);
        
        Response response = apiUtil.doGet(url, headers);
        
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("networks").iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString().equals("public"))
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
    }
    public String listInstances(String authenticationToken) throws IOException {
        String url = openstackDomain+"/compute/v2.1/servers?all_tenants";
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doGet(url, headers);
        
        String responseBody = response.body().string();
        return responseBody;
    }
    public String getUserInstanceId(String username, String authenticationToken) throws IOException{
        String url = openstackDomain+"/compute/v2.1/servers?all_tenants&user_id="+username;
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doGet(url, headers);
        
        String responseBody = response.body().string();
        // TODO: null 체크
        JsonArray tmp = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("servers");
        String result = null;
        if(!tmp.isJsonNull()){
            result = tmp
                            .get(0)
                            .getAsJsonObject()
                            .get("id")
                            .getAsString();
        }
        return result; 
    }
    public int getUserInstanceCount(String username, String authenticationToken) throws IOException{
        String url = openstackDomain+"/compute/v2.1/servers?all_tenants&user_id="+username;
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doGet(url, headers);
        
        String responseBody = response.body().string();
        
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("servers")
                            .iterator();
        int cnt =0;
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("name").getAsString().equals(username))
                cnt++;
        }
        return cnt;
        
    }
    public String getFixedIpAddress(String authenticationToken, String instanceId) throws IOException {
        String url = openstackDomain+"/compute/v2.1/servers/"+instanceId;
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);

        Response response = apiUtil.doGet(url, headers);
        
        String responseBody = response.body().string();
        String result = null;
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonObject("server")
                            .get("addresses")
                            .getAsJsonObject()
                            .getAsJsonArray("heat-net")
                            .iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            if(next.getAsJsonObject().get("version").getAsString().equals("4") && 
                next.getAsJsonObject().get("OS-EXT-IPS:type").getAsString().equals("fixed"))
                result = next.getAsJsonObject().get("addr").getAsString();
        }
        return result;
    }
    public VmStatus getInstanceStatus(String authenticationToken, String instanceId) throws Exception {
        // 그 뭐시냐 담아서 보내기
        if(instanceId.isEmpty()) throw new Exception();
        String url = openstackDomain+"/compute/v2.1/servers/"+instanceId;
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);

        Response response = apiUtil.doGet(url, headers);
        
        String responseBody = response.body().string();
        
        JsonObject obj = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonObject("server");
        String vmStatus = obj
                            .get("OS-EXT-STS:vm_state")
                            .getAsString();
        
        JsonElement launchFlag = obj
                            .get("OS-SRV-USG:launched_at");
        
        String launch = launchFlag.isJsonNull()? "" :launchFlag.getAsString();
        JsonElement terminateFlag =obj
                            .get("OS-SRV-USG:terminated_at");
        String terminate = terminateFlag.isJsonNull()?"":terminateFlag.getAsString();
        
        JsonArray tmp = obj
                            .get("addresses")
                            .getAsJsonObject()
                            .getAsJsonArray("heat-net");
        int flag = 0;
        if(!tmp.isJsonNull()){
            Iterator<JsonElement> iterator = tmp.iterator();
            while(iterator.hasNext()){
                JsonElement next = iterator.next();
                if(next.getAsJsonObject().get("OS-EXT-IPS:type").getAsString().equals("floating"))
                    flag = 1;
            }
        }
        VmStatus result = new VmStatus();
        result.setFloatingIp(flag);
        result.setLaunch(launch);
        result.setStatus(vmStatus);
        result.setTerminate(terminate);
        return result;
        
    }
    public String getPortId(String authenticationToken, String fixedIpAddress) throws IOException {
        String url = openstackDomain+":9999/v2.0/ports";
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);

        Response response = apiUtil.doGet(url, headers);
        
        String responseBody = response.body().string();
        String result = null;
        
        Iterator<JsonElement> iterator = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonArray("ports")
                            .iterator();
        while(iterator.hasNext()){
            JsonElement next = iterator.next();
            Iterator<JsonElement> it = next.getAsJsonObject().get("fixed_ips").getAsJsonArray().iterator();
            boolean flag = false;
            while(it.hasNext()){
                JsonElement nx = it.next();
                if(nx.getAsJsonObject().get("ip_address").getAsString().equals(fixedIpAddress)){
                    flag = true;
                    break;
                }
            }
            if(flag)
                result = next.getAsJsonObject().get("id").getAsString();
        }
        return result;
        
    }
    private String assignFloatingIpPostBody(String networkId, String fixedIp, String portId){
        return "{\"floatingip\": {\"floating_network_id\":\""+networkId+"\","+
             "\"fixed_ip_address\":\""+fixedIp+"\",\"port_id\":\""+portId+"\"}}";
    }
    public String assignFloatingIp(String networkId, String fixedIp, String portId, String authenticationToken)
            throws IOException {
        String url = openstackDomain+":9999/v2.0/floatingips";
        String postBody = this.assignFloatingIpPostBody(networkId, fixedIp, portId);
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doPost(url, postBody, headers);
        String responseBody = response.body().string();
        String result = JsonParser
                            .parseString(responseBody)
                            .getAsJsonObject()
                            .getAsJsonObject("floatingip")
                            .get("floating_ip_address")
                            .getAsString();
        return result;

    }
    public String getCodeServer(String authenticationToken, String floatingAddr, String username) throws IOException {
        String url = openstackDomain+":8890/urlinfo";
        String postBody = "{\"name\": \""+username+"\", \"addr\": \""+floatingAddr+"\"}";
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);
        Response response = apiUtil.doPost(url, postBody, headers);
        String responseBody = response.body().string();
        return responseBody;
    }
    public void deleteVm(String authenticationToken, String instanceId) throws IOException {
        String url = openstackDomain+"/compute/v2.1/servers/"+instanceId;
        Map<String,String> headers = new HashMap<>();
        this.settingHeaders(headers,authenticationToken);
        apiUtil.doDelete(url, headers, "");
        
    }
    
    public void afterCreate(String authenticationToken, String username) throws IOException {
        String instanceId = this.getUserInstanceId(username, authenticationToken);
        if(!instanceId.isEmpty()){
            String fixedIpAddress =this.getFixedIpAddress(authenticationToken,instanceId);
            String portId = this.getPortId(authenticationToken,fixedIpAddress);
            String floatingNetworkId =this.getFloatingNetworkId(authenticationToken);
            String floatingIp = this.assignFloatingIp(floatingNetworkId,fixedIpAddress, portId, authenticationToken);
            this.getCodeServer(authenticationToken, floatingIp, username);
        }
    }

}