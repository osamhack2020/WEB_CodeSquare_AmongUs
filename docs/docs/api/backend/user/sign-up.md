---
id: sign-up
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
| member_group | string | Y        | -     | 회원 그룹 |
| member_name  | string | Y        | -     | 회원 그룹 |
| password     | string | Y        | -     | 회원 그룹 |
| member_rank  | string | Y        | -     | 회원 그룹 |
| username     | string | Y        | -     | 회원 그룹 |
| username     | string | Y        | -     | 군번 |


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

* 조건 : Update can be performed either fully or partially by the Owner
of the Account.
* 상태 코드 : `200 OK`

| 필드         | 타입    |  설명     |
|--------------|--------|----------|
| response     | string |  |
| message      | string |  |
| data         | string |  |

### 응답 예시

For a User with ID 1234 on the local database where that User has saved an
email address and name information.

```json
{
    "id": 1234,
    "first_name": "Joe",
    "last_name": "Bloggs",
    "email": "joe25@example.com"
}
```

For a user with ID 4321 on the local database but no details have been set yet.

```json
{
    "id": 4321,
    "first_name": "",
    "last_name": "",
    "email": ""
}
```

## 에러 코드

**Condition** : Account does not exist at URL

**Code** : `404 NOT FOUND`

**Content** : `{}`

## 기타사항

* If the User does not have a `UserInfo` instance when requested then one will
  be created for them.