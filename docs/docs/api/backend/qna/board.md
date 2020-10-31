---
id: board
title: 게시글
description: 게시글을 위한 User REST API입니다.
---

게시글을 처리하기 위한 API입니다.

# API 기본 정보

**중요** : 해당 요청은 헤더를 추가하셔야 합니다. signin 후 받은 accessToken을 Bearer 표기법에 맞추어 "Authorization" 헤더에 넣어주시기 바랍니다.
```json
{
    "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImlkMyIsImlhdCI6MTYwMTc3NDU0NCwiZXhwIjoxNjAxNzc0OTA0fQ.qJ6kAPSeiAU4qjfs6mkQHZJ8_uTsPi7MfiuYwJPVFrA"
}
```

## 1. 게시글 조회(최신순)

**요청 URL** : `/board/{pageNum}`

**메서드** : `GET`

**인증** : YES

**Permissions required** : None

**특이사항** : 1/2/3 번 항목에서 검색된 게시물은 5개씩(변동가능) 한페이지로 반환합니다. 예컨대 총 게시물이 21개라면, 총 5개로 나뉘어 리턴됩니다. 따라서 원하는 게시물이 11번째라면 pageNum = 3이고 리스트로 반환된 게시물중 첫번째가 11번째 게시물이 됩니다. 또한 응답으로 반환되는 total page는 총 페이지 개수가 됩니다.


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
    "boards": [
      {
        "id": 20,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:52.162+00:00",
        "updated_at": "2020-10-31T11:46:52.162+00:00",
        "tags": [
          {
            "id": 74,
            "body": "tag1"
          },
          {
            "id": 75,
            "body": "tag2"
          },
          {
            "id": 76,
            "body": "tag3"
          },
          {
            "id": 77,
            "body": "tag5"
          }
        ],
        
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
        "updated_at": "2020-10-31T11:46:50.044+00:00",
        "tags": [
          {
            "id": 70,
            "body": "tag1"
          },
          {
            "id": 71,
            "body": "tag2"
          },
          {
            "id": 72,
            "body": "tag3"
          },
          {
            "id": 73,
            "body": "tag5"
          }
        ],
      }
    ],
    
  }
}
```

## 2. 게시글 조회(타이틀 검색)

**요청 URL** : `/board/title/{검색어}/{pageNum}`

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
  "message": "조회성공",
  "data": {
    "totalPage": 1,
    "boards": [
      {
        "id": 20,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:52.162+00:00",
        "updated_at": "2020-10-31T11:46:52.162+00:00",
        "tags": [
          {
            "id": 74,
            "body": "tag1"
          },
          {
            "id": 75,
            "body": "tag2"
          },
          {
            "id": 76,
            "body": "tag3"
          },
          {
            "id": 77,
            "body": "tag5"
          }
        ],
        
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
        "updated_at": "2020-10-31T11:46:50.044+00:00",
        "tags": [
          {
            "id": 70,
            "body": "tag1"
          },
          {
            "id": 71,
            "body": "tag2"
          },
          {
            "id": 72,
            "body": "tag3"
          },
          {
            "id": 73,
            "body": "tag5"
          }
        ],
      }
    ],
    
  }
}
```

## 3. 게시글 조회(본문 검색)

**요청 URL** : `/board/body/{검색어}{pageNum}`

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
  "message": "조회성공",
  "data": {
    "totalPage": 1,
    "boards": [
      {
        "id": 20,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:52.162+00:00",
        "updated_at": "2020-10-31T11:46:52.162+00:00",
        "tags": [
          {
            "id": 74,
            "body": "tag1"
          },
          {
            "id": 75,
            "body": "tag2"
          },
          {
            "id": 76,
            "body": "tag3"
          },
          {
            "id": 77,
            "body": "tag5"
          }
        ],
        
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
        "updated_at": "2020-10-31T11:46:50.044+00:00",
        "tags": [
          {
            "id": 70,
            "body": "tag1"
          },
          {
            "id": 71,
            "body": "tag2"
          },
          {
            "id": 72,
            "body": "tag3"
          },
          {
            "id": 73,
            "body": "tag5"
          }
        ],
      }
    ],
    
  }
}
```


## 4. 게시글 등록


**요청 URL** : `/user/board`

**메서드** : `POST`

**인증** : YES

**Permissions required** : None


### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| body     | string | Y        | -     | 본문 |
| tags     | string | Y        | -     | 태그 |
| title     | string | Y        | -     | 제목 |

**요청 예시**

```json
{
    "body" : "new body 1",
    "tag" : "tag1 tag2 tag3 tag5",
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
	"message": "게시물 생성 성공",
	"data": {
		"id": 8,
		"username": "test1",
		"member_name": "박남규",
		"title": "new title1",
		"body": "new body 1",
		"view": 0,
		"recommend": 0,
		"created_at": "2020-10-18T14:04:11.101+00:00",
		"updated_at": "2020-10-18T14:04:11.101+00:00",
		"tags": [
		  {
				"id": 29,
				"body": "tag1"
			},
		  {
				"id": 30,
				"body": "tag2"
			},
		  {
				"id": 31,
				"body": "tag3"
			},
		  {
				"id": 32,
				"body": "tag5"
			}
		],
	}
}
```

## 5. 게시글 수정


**요청 URL** : `/user/board`

**메서드** : `PUT`

**인증** : YES

**Permissions required** : None


### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| body     | string | N        | -     | 본문 |
| tags     | string | N        | -     | 태그 |
| title     | string | N        | -     | 제목 |
| board_id     | string | Y        | -     | 게시물아이디 |

**요청 예시**

```json
{
    "body": "update body",
    "tag": "tag1 tag2 tag3 tag5",
    "title": "update title",
    "board_id": 4
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
        "updated_at": "2020-10-18T11:10:38.878+00:00",
        "tags": [
            {
                "id": 0,
                "body": "tag1"
            },
            {
                "id": 0,
                "body": "tag2"
            },
            {
                "id": 0,
                "body": "tag3"
            },
            {
                "id": 0,
                "body": "tag5"
            }
        ]
    }
}
```

## 6. 게시글 삭제


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
    "message": "게시글을 삭제하였습니다.",
    "data": null
}
```

## 7. 게시글 view수 올리기


**요청 URL** : `/user/board/view/{게시물아이디}`

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
    "message": "view 1회 증가",
    "data": null
}
```

## 8. 게시글 recommend 값 올리기


**요청 URL** : `/user/board/view/{게시물아이디}`

**메서드** : `PUT`

**인증** : YES

**Permissions required** : None


### 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| username     | string | Y        | -     | 아이디 |
| id     | string | Y        | -     | 게시물 번호 |
| value     | string | Y        | -     | 값 |
**요청 예시**

```json
{
    "username" : "test2",
    "id":"2",
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
    "message": "recommend 수정",
    "data": null
}
```
