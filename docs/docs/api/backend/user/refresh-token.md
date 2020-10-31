---
id: refresh-token
title: refresh-token 토큰 재발급
description: refresh-token 재발급을 위한 User REST API입니다.
---

refresh-token 재발급을 처리하기 위한 API입니다.

## API 기본 정보

**요청 URL** : `/user/refreshtoken/`

**메서드** : `GET`

**인증** : YES

**Permissions required** : None


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
    "message": "accessToken 생성 성공",
    "data": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImlkMyIsImlhdCI6MTYwMTc3NDU0NCwiZXhwIjoxNjAxNzc0OTA0fQ.qJ6kAPSeiAU4qjfs6mkQHZJ8_uTsPi7MfiuYwJPVFrA"
}
```