---
id: magazine
title: 매거진
description: 매거진을 위한 User REST API입니다.
---

매거진을 처리하기 위한 API입니다.

# API 기본 정보

## 1. 게시글 조회(최신순)

**요청 URL** : `/magazine/{pageNum}`

**메서드** : `GET`

**인증** : YES

**Permissions required** : None

**특이사항** : 1/2/3 번 항목에서 검색된 매거진은 5개씩(변동가능) 한페이지로 반환합니다. 예컨대 총 게시물이 21개라면, 총 5개로 나뉘어 리턴됩니다. 따라서 원하는 게시물이 11번째라면 pageNum = 3이고 리스트로 반환된 게시물중 첫번째가 11번째 게시물이 됩니다. 또한 응답으로 반환되는 total page는 총 페이지 개수가 됩니다.


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
  "message": "조회성공",
  "data": {
    "totalPage": 1,
    "magazine": [
      {
        "id": 20,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:52.162+00:00",
        "updated_at": "2020-10-31T11:46:52.162+00:00"
      },
      {
        "id": 19,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:50.044+00:00",
        "updated_at": "2020-10-31T11:46:50.044+00:00"
      }
    ],
    
  }
}
```

## 4. 매거진 등록


**요청 URL** : `/magazine`

**메서드** : `POST`

**인증** : YES

**Permissions required** : None


### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| body     | string | Y        | -     | 본문 |
| title     | string | Y        | -     | 제목 |

**요청 예시**

```json
{
    "body" : "new body 1",
    "title" : "new title1"
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
	"message": "매거진 생성 성공",
	"data": {
		"id": 8,
		"username": "test1",
		"member_name": "박남규",
		"title": "new title1",
		"body": "new body 1",
		"view": 0,
		"recommend": 0,
		"created_at": "2020-10-18T14:04:11.101+00:00",
		"updated_at": "2020-10-18T14:04:11.101+00:00"
	}
}
```

## 5. 매거진 수정


**요청 URL** : `/magazine`

**메서드** : `PUT`

**인증** : YES

**Permissions required** : None


### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| body     | string | N        | -     | 본문 |
| title     | string | N        | -     | 제목 |
| magazine_id     | string | Y        | -     | 매거진아이디 |

**요청 예시**

```json
{
    "body": "update body",
    "title": "update title",
    "magazine_id": 4
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
    "message": "게시글을 수정하였습니다.",
    "data": {
        "id": 4,
        "username": "test1",
        "title": "update title",
        "body": "update body",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-18T11:10:03.188+00:00",
        "updated_at": "2020-10-18T11:10:38.878+00:00"
    }
}
```

## 6. 매거진 삭제


**요청 URL** : `/magazine`

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
    "message": "매거진을 삭제하였습니다.",
    "data": null
}
```