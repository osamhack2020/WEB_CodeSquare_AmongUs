---
id: reply
title: 게시글의 답글
description: 게시글의 답글을 위한 User REST API입니다.
---

게시글의 댓글을 처리하기 위한 API입니다.

# API 기본 정보

**중요** : 해당 요청은 헤더를 추가하셔야 합니다. signin 후 받은 accessToken을 Bearer 표기법에 맞추어 "Authorization" 헤더에 넣어주시기 바랍니다.
```json
{
    "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImlkMyIsImlhdCI6MTYwMTc3NDU0NCwiZXhwIjoxNjAxNzc0OTA0fQ.qJ6kAPSeiAU4qjfs6mkQHZJ8_uTsPi7MfiuYwJPVFrA"
}
```

## 1. 게시글의 모든 답글 조회

**요청 URL** : `/replies/{게시글아이디}`

**메서드** : `GET`

**인증** : YES

**Permissions required** : None

### 응답 결과


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
  "message": "답글 조회 성공",
  "data": [
    {
      "id": 5,
      "username": "testme",
      "adopted": 0,
      "recommend": 0,
      "body": "body 1",
      "member_name": "name225",
      "created_at": "2020-10-31T11:49:42.376+00:00",
      "updated_at": "2020-10-31T11:49:42.376+00:00"
    },
    {
      "id": 6,
      "username": "testme",
      "adopted": 0,
      "recommend": 0,
      "body": "body 1",
      "member_name": "name225",
      "created_at": "2020-10-31T11:49:46.419+00:00",
      "updated_at": "2020-10-31T11:49:46.419+00:00"
    }
  ],
  
}

```


## 2. 특정 게시글의 답글 추가

**요청 URL** : `/replies/{게시글아이디}`

**메서드** : `POST`

**인증** : YES

**Permissions required** : None

### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| body     | string | Y        | -     | 본문 |


**요청 예시**

```json
{
    "body":"my body"
}

```

### 응답 결과


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
  "message": "댓글 생성 성공",
  "data": {
    "id": 3,
    "username": "test1",
    "adopted": 0,
    "recommend": 0,
    "body": "body 1",
    "member_name": "남규",
    "created_at": "2020-10-18T14:15:38.829+00:00",
    "updated_at": "2020-10-18T14:15:38.829+00:00"
  }
}
```



## 3. 특정 게시글의 답글 수정

**요청 URL** : `/replies/{답글아이디}`

**메서드** : `PUT`

**인증** : YES

**Permissions required** : None

### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| body     | string | Y        | -     | 본문 |


**요청 예시**

```json
{
    "body":"my body"
}

```

### 응답 결과


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
    "message": "댓글 수정 성공",
    "data": null
}
```


## 4. 특정 게시글의 답글 삭제

**요청 URL** : `/replies/{답글아이디}`

**메서드** : `DELETE`

**인증** : YES

**Permissions required** : None


### 응답 결과


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
    "message": "댓글 삭제 성공",
    "data": null
}
```

## 5. 답글 추천수 증가

**요청 URL** : `/replies/recommend`

**메서드** : `PUT`

**인증** : YES

**Permissions required** : None

### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| username     | string | Y        | -     | 아이디 |
| id     | string | Y        | -     | 답글번호 |
| value     | string | Y        | -     | 값 |


**요청 예시**

```json
{
    "username":"test3",
    "id":2,
    "value":1
}
```

### 응답 결과


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
    "message": "답글 추천수 수정 성공",
    "data": null
}
```

## 5. 답글 추천수 증가

**요청 URL** : `/replies/adopted/{답글아이디}`

**메서드** : `PUT`

**인증** : YES

**Permissions required** : None


### 응답 결과


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
    "message": "댓글 채택 성공",
    "data": null
}
```


