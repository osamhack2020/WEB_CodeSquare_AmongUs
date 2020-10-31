---
id: sign-in
title: 로그인
description: 로그인을 위한 User REST API입니다.
---

로그인을 처리하기 위한 API입니다.

## API 기본 정보

**요청 URL** : `/user/signin/`

**메서드** : `POST`

**인증** : YES

**Permissions required** : None


## 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| username     | string | Y        | -     | 아이디 |
| password     | string | Y        | -     | 비밀 번호 |


**요청 예시**

```json
{
    "username":"id52",
    "password":"passwd52"
}
```

## 응답 결과


* 상태 코드 : `200 OK`

| 필드         | 타입    |  설명     |
|--------------|--------|----------|
| response     | string | 응답 결과 |
| message      | string | 응답 메세지 |
| data         | string | 응답 데이터 |

### 응답 예시

```json
{
    "response": "success",
    "message": "로그인에 성공했습니다.",
    "data": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImlkIiwiaWF0IjoxNjAxNzEyNTM5LCJleHAiOjE2MDE3MTI1NDl9.2nw12hvcVy2LTP2PjDTbsKjN-uWKL2wPctvfvsr9-qg"
}
```