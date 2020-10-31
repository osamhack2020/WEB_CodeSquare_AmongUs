---
id: sign-out
title: 로그 아웃
description: 로그아웃을 위한 User REST API입니다.
---

로그아웃을 처리하기 위한 API입니다.

## API 기본 정보

**요청 URL** : `/user/signout/`

**메서드** : `POST`

**인증** : YES

**Permissions required** : None


## 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| Authorization     | string | Y        | -     | 인증토큰 |


**요청 예시**

```json
{
	"Authorization" :"Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImlkMyIsImlhdCI6MTYwMTc3NDU0NCwiZXhwIjoxNjAxNzc0OTA0fQ.qJ6kAPSeiAU4qjfs6mkQHZJ8_uTsPi7MfiuYwJPVFrA"
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
    "message": "로그아웃에 성공했습니다.",
    "data": null
}
```