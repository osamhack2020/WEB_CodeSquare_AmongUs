# Openstack Cloud/Infra

Codesquare는 frontend 서버, backend 서버, gitlab 서버, Keystone 인증 서버 그리고 유저들에게 할당할 VM 관리를 위해 클라우드 컴퓨팅 오픈소스 프로젝트인 Openstack을 이용합니다. 

# Key features

- Openstack
- Openstack Heat
- Openstack Keystone

# Quick Start

아래의 메뉴얼에선 사용자가 이미 Openstack 환경 구축을 마쳤다고 가정하고 진행합니다. Codesquare과 동일한 Openstack 환경 구축을 위해서는 setup-openstack.md를 참고해주세요.

default로 생성되는 admin 계정의 admin 프로젝트로 들어갑니다.

```bash
# source openrc [account-name] [project-name]
source openrc admin admin
```

Codesquare를 배포하기 위한 project(tenant)를 아래와 같이 생성하고 admin 계정에 해당 project에 대해 admin 권한을 줍니다.

```bash
openstack project create codesquare --domain default
openstack role assignment list --user admin \
  --project codesquare --names
```

# How to contribute
