package codeholic.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Component;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.Request.Builder;


@Component
public class ApiUtil {
    
    public Response doPost(String url, String postBody,Map<String,String> headers) {
        final OkHttpClient client = new OkHttpClient();
        Builder requestBuilder = new Request.Builder();
        headers.forEach((k,v)-> requestBuilder.addHeader(k,v));
        final Request request = requestBuilder
                .url(url)
                .post(RequestBody.create(postBody,MediaType.parse("application/json")))
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            response = null;
        }
        return response;
    }
    public Response doGet(String url, Map<String,String> headers){
        final OkHttpClient client = new OkHttpClient();
        Builder requestBuilder = new Request.Builder();
        headers.forEach((k,v)-> requestBuilder.addHeader(k,v));
        final Request request = requestBuilder.url(url)
                .get()
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            response = null;
        }
        return response;
    }
    public Response doPut(String url, Map<String,String> headers, String putBody){
        final OkHttpClient client = new OkHttpClient();
        Builder requestBuilder = new Request.Builder();
        headers.forEach((k,v)-> requestBuilder.addHeader(k,v));
        final Request request = requestBuilder.url(url)
                .put(RequestBody.create(putBody,MediaType.parse("application/json")))
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            response = null;
        }
        return response;
    }
    


}