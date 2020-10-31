---
id: magazine
title: 회원가입
description: 회원가입을 위한 User REST API입니다.
---

회원가입을 처리하기 위한 API입니다.

## API 기본 정보

**요청 URL** : `/user/signup/`

**메서드** : `POST`

**인증** : YES

**Permissions required** : None


## 요청 변수

| 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명     |
|--------------|--------|:--------:|:-----:|----------|
| member_group | string | Y        | -     | 부대이름 |
| member_name  | string | Y        | -     | 이름 |
| password     | string | Y        | -     | 비밀 번호 |
| member_rank  | string | Y        | -     | 계급 |
| username     | string | Y        | -     | 아이디 |
| dog_tags     | string | Y        | -     | 군번 |


**요청 예시**

```json
{
    "member_group": "group522",
    "member_name":"name225",
    "password":"passwd52",
    "member_rank":"rank52",
    "username":"id52",
    "dog_tags":"20-71004856"
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
    "message": "회원가입을 성공적으로 완료했습니다.",
    "data": null
}
```