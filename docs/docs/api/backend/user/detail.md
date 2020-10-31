---
id: user-detail
title: 유저 세부사항
description: 유저 세부사항을 위한 User REST API입니다.
---

회원가입을 처리하기 위한 API입니다.

## API 기본 정보

**요청 URL** : `/user/detail/`

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
    "message": "로그아웃에 성공했습니다.",
    "data": {
				"member_group":"group5",
		        "member_name":"name5",
		        "password":"passwd5",
		        "member_rank":"rank5",
		        "username":"id5",
				"dog_tags":"20-71004856"
				"create_at":"2020-10-26 13:44:57.449000",
				"update_at":"2020-10-26 13:44:57.449000"
		}
}
```