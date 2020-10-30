# Openstack Cloud/Infra

Codesquare는 frontend 서버, backend 서버, gitlab 서버, Keystone 인증 서버 그리고 유저들에게 할당할 VM 관리를 위해 클라우드 컴퓨팅 오픈소스 프로젝트인 Openstack을 이용합니다. 

# Key features

- Openstack
- Openstack Heat
- Openstack Keystone

# Reproduce CodeSquare Manual

아래의 메뉴얼에선 사용자가 이미 Openstack 환경 구축을 마쳤다고 가정하고 진행합니다. Codesquare과 동일한 Openstack 환경 구축을 위해서는 **docs/setup-openstack.md** 를 참고해주세요.

default로 생성되는 admin 계정의 admin 프로젝트에 대한 환경변수를 세팅해줍니다.

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

codesquare project를 새로 생성해줬으니 openrc를 이용해 알맞는 환경변수를 세팅해줍니다.

```bash
source openrc admin codesquare
```

방금 막 생성된 따끈따끈한 프로젝트에는 현재 public network와 shared network를 제외하고는 network가 존재하지 않습니다.

```bash
openstack network list
```

User들에게 나누어줄 Ubuntu VM은 Tenant 독립적인 사설망에서 구성되길 원하므로, private network를 생성해줍니다. *hot/create_private_network.yml* template 을 이용하면 private network와 private subnet 그리고 external network로 이어지는 router 까지 자동으로 생성해줍니다.

```bash
openstack stack create codesquare-private-network \
		-t create_private_network.yml \
		--parameter "public_net=public" \
		--parameter "private_net_name=private-cdr-net"
```

또한, devstack에는 기본적으로 cirros와 fedora image가 내장되어 있는데, 범용적으로 많이 사용되는 Ubuntu18.04와 CentOS7을 image list에 등록해줍니다.

```bash
#CentOS7
wget https://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud.qcow2
openstack image create --disk-format qcow2 --container-format bare \
			--public --file CentOS-7-x86_64-GenericCloud.qcow2 \
												CentOS7
#Ubuntu18.04 amd64
wget https://cloud-images.ubuntu.com/bionic/current/bionic-server-cloudimg-amd64.img
openstack image create --disk-format qcow2 --container-format bare \
			--public --file bionic-server-cloudimg-amd64.img \
												Ubuntu18.04-amd64
```

CodeServer Instance에 접속하기 위한 ssh keypair를 생성하여, openstack에 cdr_key로 등록해줍니다.

```bash
ssh-keygen -q -N ""
openstack keypair create --public-key ~/.ssh/id_rsa.pub cdr_key
```

CodeServer에서는 8080/tcp을 이용하므로, openstack에서 8080/tcp를 허용하는 security group을 생성해줘야 합니다. 네트워크 상태 체크를 위해 ICMP 또한 뚫어줍니다.

```bash
openstack security group create cdr-rule
openstack security group rule create --proto tcp --dst-port 8080 cdr-rule
openstack security group rule create --proto icmp cdr-rule
```

User VM을 배포할 네트워크와 image가 준비되었으니, 이제 Instance를 만들고 Codeserver package를 설치하고 구동시킬 차례입니다. hot/create_cdr_instance.yml을 이용하면 명령어 한번에 Codeserver가 구동되는 instance를 배포할 수 있습니다.

```bash
openstack stack create cdr-admin -t create_cdr_instance.yml \
		--parameter "hostname=cdr-admin" \
		--parameter "key_name=cdr_key" \
		--parameter "image=Ubuntu18.04-amd64" \
		--parameter "flavor=m1.small" \
		--parameter "public_net_id=$(openstack network list | grep public | cut -f2 -d '|' | tr -d ' ')" \
		--parameter "private_net_id=$(openstack network list | grep private-cdr-net | cut -f2 -d '|' | tr -d ' ')" \
		--parameter "private_subnet_id=$(openstack network list | grep private-cdr-net | cut -f4 -d '|' | tr -d ' ')" \
		--parameter "zone_host_name=nova:codesquare-devstack-compute2" \
		--parameter "security_group=$(openstack security group list | grep cdr-rule | cut -f2 -d '|' | tr -d ' ')"
```

# How to contribute
