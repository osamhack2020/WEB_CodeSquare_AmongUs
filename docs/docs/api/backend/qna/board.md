---
id: board
title: 게시글
description: 게시글을 위한 User REST API입니다.
---

게시글을 처리하기 위한 API입니다.

## API 기본 정보

### 1. 게시글 조회(최신순)

**요청 URL** : `/board/{pageNum}/`

**메서드** : `GET`

**인증** : YES

**Permissions required** : None

**특이사항** : 1/2/3 번 항목에서 검색된 게시물은 5개씩(변동가능) 한페이지로 반환합니다. 예컨대 총 게시물이 21개라면, 총 5개로 나뉘어 리턴됩니다. 따라서 원하는 게시물이 11번째라면 pageNum = 3이고 리스트로 반환된 게시물중 첫번째가 11번째 게시물이 됩니다. 또한 응답으로 반환되는 total page는 총 페이지 개수가 됩니다.


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
  "message": "조회성공",
  "data": {
    "totalPage": 4,
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
        
      },
      {
        "id": 18,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:47.888+00:00",
        "updated_at": "2020-10-31T11:46:47.888+00:00",
        "tags": [
          {
            "id": 66,
            "body": "tag1"
          },
          {
            "id": 67,
            "body": "tag2"
          },
          {
            "id": 68,
            "body": "tag3"
          },
          {
            "id": 69,
            "body": "tag5"
          }
        ],
        
      },
      {
        "id": 17,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:45.562+00:00",
        "updated_at": "2020-10-31T11:46:45.562+00:00",
        "tags": [
          {
            "id": 62,
            "body": "tag1"
          },
          {
            "id": 63,
            "body": "tag2"
          },
          {
            "id": 64,
            "body": "tag3"
          },
          {
            "id": 65,
            "body": "tag5"
          }
        ],
        
      },
      {
        "id": 16,
        "username": "testme",
        "member_name": "name225",
        "title": "new title1",
        "body": "new body 1",
        "view": 0,
        "recommend": 0,
        "created_at": "2020-10-31T11:46:41.814+00:00",
        "updated_at": "2020-10-31T11:46:41.814+00:00",
        "tags": [
          {
            "id": 58,
            "body": "tag1"
          },
          {
            "id": 59,
            "body": "tag2"
          },
          {
            "id": 60,
            "body": "tag3"
          },
          {
            "id": 61,
            "body": "tag5"
          }
        ],
        
      }
    ],
    
  }
}
```