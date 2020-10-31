---
id: openstack-api
title: OpenStack API
description: CodeSquare는 군 복무중인 개발자를 위한 통합 개발 플랫폼입니다.
---
openstack VM 생성을 위한 api입니다.

## Getting Started
### Obtaining an openstack api token
```bash
curl -i -H "Content-Type: application/json" \
-d '
{ "auth": {
    "identity": {
        "methods": ["password"],
            "password": {
                "user": {
                    "name": "admin",
                    "domain": { 
                        "id": "default" 
                       },
                    "password": "password"
                   }
              }
         },
        "scope": {
            "project": {
                "name": "admin",
                    "domain": { "id": "default" }
              }
         }
    }
}' \
"http://stack.codesquare.space/identity/v3/auth/tokens" | grep X-Subject-Token
```
reference : https://docs.openstack.org/api-ref/identity/v3/index.html?expanded=list-users-detail#users
이후 나오는 $OS_TOKEN은 위에서 **X-Subject-Token** 값을 저장한 변수입니다.

## User
### User 목록
```bash
curl -s \
 -H "X-Auth-Token: $OS_TOKEN" \
 "http://stack.codesquare.space/identity/v3/users" | python -m json.tool
 ```
### User 생성
```bash
curl -X POST \
 -H "X-Auth-Token: $OS_TOKEN" \
 -H "Content-Type: application/json" \
 -d '
{"user": {
    "default_project_id": [project_id],
    "name": "newuser1234",
    "password": "qwerty"
    }
}' \
"http://stack.codesquare.space/identity/v3/users" | python -m json.tool
```
[project_id] 조회 :
```bash
curl -X GET \
 -H "X-Auth-Token: $OS_TOKEN" \
 "http://stack.codesquare.space/identity/v3/projects" | python -m json.tool
```
### User ID를 통한 조회
```bash
curl -s \
 -H "X-Auth-Token: $OS_TOKEN" \
 "http://stack.codesquare.space/identity/v3/users/267efb41d24746119e49dd64340f6d49" | python -m json.tool
```
### User 비밀번호 변경
```bash
curl -s \
 -H "X-Auth-Token: $OS_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"user": {"password": "new_pw", "original_password": "original_pw"}}' \
 "http://stack.codesquare.space/identity/v3/users/[user_id]" | python -m json.tool
 ```
 ### User 프로젝트 및 역할 배정
 ```bash
 curl -s -X PUT \
 -H "X-Auth-Token: $OS_TOKEN" \
 "http://stack.codesquare.space/identity/v3/projects/[project_id]/users/[user_id]/roles/[role_id]"
 ```    
 [project id]는 아래와 같은 방법으로 얻을 수 있습니다.
 ```bash
curl -s \
 -H "X-Auth-Token: $OS_TOKEN" \
 "http://stack.codesquare.space/identity/v3/projects" | python -m json.tool
 ```
 [user_id]는 아래와 같은 방법으로 얻을 수 있습니다.
 ```bash
 curl -s \
 -H "X-Auth-Token: $OS_TOKEN" \
 "http://stack.codesquare.space/identity/v3/roles" | python -m json.tool
 ```
 [role_id]는 아래와 같은 방법으로 얻을 수 있습니다.
 ```bash
 curl -s \
-H "X-Auth-Token: $OS_TOKEN"  \
"http://stack.codesquare.space/identity/v3/roles" | python -m json.tool
```
 ### 프로젝트 생성
 ```
 curl -s \
 -H "X-Auth-Token: $OS_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"project": {"name": "new1", "domain_id": "default"}}' \
 "http://stack.codesquare.space/identity/v3/projects" | python -m json.tool
 ```
 ## User VM 생성
 ### image 목록
 ```bash
 curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \
"http://stack.codesquare.space/compute/v2.1/images" | python -m json.tool
```
### flavor(사양) 목록
```bash
curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \
"http://stack.codesquare.space/compute/v2.1/flavors" | python -m json.tool
```
### 네트워크 목록
```bash
curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \
"http://stack.codesquare.space:9999/v2.0/networks" | python -m json.tool
```
### 보안 그룹 목록
```bash
curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \
"http://stack.codesquare.space:9999/v2.0/security-groups" | python -m json.tool
```
### VM 생성
```bash
curl -X GET \
-H "User-Agent: python-novaclient" \
-H "Content-Type:application/json" \
-H "Accept: application/json" \
-H "X-Auth-Token:$OS_TOKEN" \
-d '
{"server": {
	"name":"test",
	"imageRef":[image_id],
	"flavorRef":[flavor_id],
	"networks":[{"uuid":[network_id]}],
	"security_groups": [{"name": [security_group_name]}],
  "availability_zone": "nova:codesquare-devstack-compute2"
	}
}' "http://stack.codesquare.space/compute/v2.1/servers"
```
위에서 얻은 이미지 uuid(`[image_id]`), flavor id(`[flavor_id]`) 네트워크 uuid(`[network_id]`), 보안 그룹 이름(`[security_group_name]`)을 이용하여 유저 vm을 생성할 수 있습니다.    
availability_zone은 vm 연산을 담당하는 compute node중 codesquare-devstack-compute2 노드를 사용하겠다는 의미입니다. 
## User VM 관리
### 인스턴스 목록
```bash
curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \
"http://stack.codesquare.space/compute/v2.1/servers?all_tenants" | python -m json.tool
```
세부사항 확인 시에는 `/servers/detail` 을, 특정 유저가 만든 인스턴스만 보려면 url끝 부분을 `servers?all_tenants&user_id=[user_id]` 로 해주시면 됩니다.
### User VM status
```bash
curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \
"http://stack.codesquare.space/compute/v2.1/servers/[instance id]" | python -m json.tool
```
위의 인스턴스 목록에서 확인한 instance id를 위 명령어의 `[instance id]` 부분에 넣고 실행하면 아래와 같은 response를 받을 수 있습니다.
```json
{
    "server": {
        "OS-DCF:diskConfig": "AUTO",
        "OS-EXT-AZ:availability_zone": "nova",
        "OS-EXT-SRV-ATTR:host": "codesquare-devstack-compute2",
        "OS-EXT-SRV-ATTR:hypervisor_hostname": "codesquare-devstack-compute2",
        "OS-EXT-SRV-ATTR:instance_name": "instance-00000005",
        "OS-EXT-STS:power_state": 1,
        "OS-EXT-STS:task_state": null,
        "OS-EXT-STS:vm_state": "active",
        "OS-SRV-USG:launched_at": "2020-10-16T06:26:08.000000",
        "OS-SRV-USG:terminated_at": null,
        "accessIPv4": "",
        "accessIPv6": "",
        "addresses": {
            "private": [
                {
                    "OS-EXT-IPS-MAC:mac_addr": "fa:16:3e:9c:c3:19",
                    "OS-EXT-IPS:type": "fixed",
                    "addr": "fd07:2ead:dd0b:0:f816:3eff:fe9c:c319",
                    "version": 6
                },
                {
                    "OS-EXT-IPS-MAC:mac_addr": "fa:16:3e:9c:c3:19",
                    "OS-EXT-IPS:type": "fixed",
                    "addr": "10.0.0.28",
                    "version": 4
                },
                {
                    "OS-EXT-IPS-MAC:mac_addr": "fa:16:3e:9c:c3:19",
                    "OS-EXT-IPS:type": "floating",
                    "addr": "192.168.1.145",
                    "version": 4
                }
            ]
        },
        "config_drive": "",
        "created": "2020-10-16T06:26:03Z",
        "flavor": {
            "id": "42",
            "links": [
                {
                    "href": "http://34.64.118.138/compute/flavors/42",
                    "rel": "bookmark"
                }
            ]
        },
        "hostId": "92c073e37ee42a64987f4aaddb73d523f002658a39be9d5677693c9d",        "id": "43fd359d-1af1-47fa-b9d8-df7d9beba4e7",
        "image": {
            "id": "a0de3833-a8e9-4730-8094-ed55285520c6",
            "links": [
                {
                    "href": "http://34.64.118.138/compute/images/a0de3833-a8e9-4730-8094-ed55285520c6",
                    "rel": "bookmark"
                }
            ]
        },
        "key_name": "demo_key",
        "links": [
            {
                "href": "http://34.64.118.138/compute/v2.1/servers/43fd359d-1af1-47fa-b9d8-df7d9beba4e7",
                "rel": "self"
            },
            {
                "href": "http://34.64.118.138/compute/servers/43fd359d-1af1-47fa-b9d8-df7d9beba4e7",
                "rel": "bookmark"
            }
        ],
        "metadata": {},
        "name": "demo_cirros",
        "os-extended-volumes:volumes_attached": [],
        "progress": 0,
        "security_groups": [
            {
                "name": "default"
            }
        ],
        "status": "ACTIVE",
        "tenant_id": "01f2a49eb6e94189b643e76fec5dda3b",
        "updated": "2020-10-16T06:26:09Z",
        "user_id": "1b8082a40c474a8387723bd1285f0525"
    }
}
```
위에서부터 차근차근 필요한 정보만 부가 설명 들어갑니다.
**Instance power state**    
"OS-EXT-STS:power_state": 1
```
0: NOSTATE
1: RUNNING
3: PAUSED
4: SHUTDOWN
6: CRASHED
7: SUSPENDED
```
**Instance booting info**
"OS-SRV-USG:launched_at": "2020-10-16T06:26:08.000000"    
"OS-SRV-USG:terminated_at": null    
날짜 및 시간 포맷은 ISO8601    
`CCYY-MM-DDThh:mm:ss±hh:mm`    
아직 instance가 종료되지 않았으므로 terminated at 은 null로 나타나고 있습니다.    
만약 date and time stamp에 ±hh:mm가 포함된다면, UTC로부터의 offset을 의미합니다.
### 네트워크 포트 목록
```bash
curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \ 
"http://stack.codesquare.space:9999/v2.0/ports" | python -m json.tool
```
### floating/fixed ip 목록
```bash
curl -X GET \
-H "X-Auth-Token: $OS_TOKEN" \
"http://stack.codesquare.space:9999/v2.0/floatingips" | python -m json.tool
```
### 생성된 인스턴스에 유동 ip 할당
```bash
curl -s \
 -H "X-Auth-Token: $OS_TOKEN" \
 -H "Content-Type: application/json" \
 -d '
{"floatingip": {
    "floating_network_id":[network_id],
    "fixed_ip_address":[ip_address],
    "port_id":[port_id]
    }
}' "http://stack.codesquare.space:9999/v2.0/floatingips" | python -m json.tool
```
`[network_id]`는 유동 ip를 할당받을 public 네트워크의 id,    
`[ip_address]`는 생성된 인스턴스에 할당된 고정 ip,    
`[port_id]`는 생성된 인스턴스에 할당된 고정 ip의 포트입니다    
네트워크 id는 vm 생성시에 요청한 네트워크 목록 중에서, 고정 ip 주소는 위의 floating/fixed ip목록 중에서, 고정 ip의 포트는 위의 네트워크 포트 목록에서 찾을 수 있습니다.    
## User VM 삭제
### VM에 연결되어있는 유동 ip 해제 및 삭제
단순히 vm만 삭제하면 vm에 연결되어있는 유동 ip는 지워지지 않고 다른 vm에 연결할 수 있는 상태로 남아있게 됩니다. 이를 재사용하기에는 문제가 발생할 수 있으므로 연결되어있던 유동 ip의 연결을 해제한 뒤, 삭제해줍니다.
```bash
curl -X DELETE \
-H "X-Auth-Token: $OS_TOKEN" \
-H "Accept: application/json" \
"http://stack.codesquare.space:9999/v2.0/floatingips/[floatingIp_id]" | python -m json.tool
```
`[floatingIp_id]`는 인스턴스에 유동 ip 할당 시 요청했던 floating/fixed ip 목록으로부터 확인할 수 있습니다.
### vm 삭제
```bash
curl -X DELETE \
-H "X-Auth-Token:$OS_TOKEN" \
"http://stack.codesquare.space/compute/v2.1/servers/[Instance_Id]"
```
`[Instance_Id]`는 VM 관리 항목의 인스턴스 목록으로부터 확인할 수 있습니다.
