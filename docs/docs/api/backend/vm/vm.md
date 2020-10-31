---
id: vm
title: Virtual Machine
description: 사용자 VM을 관리하는 API입니다.
---

vm을 처리하기 위한 API입니다.

# API 기본 정보

**중요** : 해당 요청은 헤더를 추가하셔야 합니다. signin 후 받은 accessToken을 Bearer 표기법에 맞추어 "Authorization" 헤더에 넣어주시기 바랍니다.
```json
{
    "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImlkMyIsImlhdCI6MTYwMTc3NDU0NCwiZXhwIjoxNjAxNzc0OTA0fQ.qJ6kAPSeiAU4qjfs6mkQHZJ8_uTsPi7MfiuYwJPVFrA"
}
```

## 1. vm 조회

**요청 URL** : `/vm/get`

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
  "message": "VM 조회 성공",
  "data": {
    "status": "ready",
    "data": {
      "url": "url",
      "created_at": "2020-10-31 10:09:23",
      "latest": "2020-10-31 10:12:32"
    }
  }
}
```

## 2. vm 생성

**요청 URL** : `/vm/create`

**메서드** : `POST`

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
  "message": "VM 조회 성공",
  "data": {
    "status": "ready",
    "data": {
      "url": "url",
      "created_at": "2020-10-31 10:09:23",
      "latest": "2020-10-31 10:12:32"
    }
  }
}
```

## 3. vm 삭제

**요청 URL** : `/vm/delete`

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
  "message": "VM 삭제중",
  "data": {
    "status": "loading",
    "data": {
      "url": null,
      "created_at": null,
      "latest": null
    }
  }
}
```


## 4. vm 일시정지


**요청 URL** : `/user/stop`

**메서드** : `POST`

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
  "message": "VM 일시정지중",
  "data": {
    "status": "loading",
    "data": {
      "url": null,
      "created_at": "2020-10-31 10:09:23",
      "latest": "2020-10-31 10:12:32"
    }
  }
}
```

## 5. vm 재개


**요청 URL** : `/user/board`

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
  "message": "VM 켜는중",
  "data": {
    "status": "loading",
    "data": {
      "url": null,
      "created_at": "2020-10-31 10:09:23",
      "latest": "2020-10-31 10:12:32"
    }
  }
}
```

## 6. vm 상태 체크(websocket)

**요청 URL** : `/status`

**메서드** : `websocket`

**인증** : YES

**Permissions required** : None

### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| accessToken     | string | Y        | -     | 인증토큰 |


**요청 예시**

```json
{
  "accessToken": "Bearer ..."
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
  "status": "loading",
  "data": {
    "url": null,
    "created_at": "2020-10-31 10:09:23",
    "latest": "2020-10-31 10:12:32"
  }
}
```
