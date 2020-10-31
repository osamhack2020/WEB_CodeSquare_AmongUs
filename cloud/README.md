# Openstack Cloud/Infra

Codesquare는 frontend 서버, backend 서버, gitlab 서버, Keystone 인증 서버 그리고 유저들에게 할당할 VM 관리를 위해 클라우드 컴퓨팅 오픈소스 프로젝트인 Openstack을 이용합니다. 

# Key features

- Openstack
- Openstack Heat
- Openstack Keystone
- Openstack Zun + Virtual-Kubelet

# Reproduce CodeSquare Manual

아래의 메뉴얼에선 사용자가 이미 Openstack 환경 구축을 마쳤다고 가정하고 진행합니다. Codesquare과 동일한 Openstack 환경 구축을 위해서는 **docs/setup-openstack.md** 를 참고해주세요.

default로 생성되는 admin 계정의 admin 프로젝트에 대한 환경변수를 세팅해줍니다.

```bash
# source openrc [account-name] [project-name]
source openrc admin admin
```

devstack 설치 이후에 기본으로 만들어지는 demo 프로젝트를 이름을 codesquare로 변경해줍니다.

```bash
openstack project set demo --name codesquare
source openrc admin codesquare
stack@codesquare-devstack-control:~/images$ openstack network list
+--------------------------------------+----------+----------------------------------------------------------------
------------+
| ID                                   | Name     | Subnets                                                        
            |
+--------------------------------------+----------+----------------------------------------------------------------
------------+
| 2e2aaa5b-b30d-41bc-85dc-0a0ea27be91b | private  | 0c7addff-01ea-4464-8ffb-b2c958f401b5, b258bde6-956d-45eb-be2b-d
14336aff498 |
| 62c9b698-9f4a-4fef-a8cf-6541e2309e12 | heat-net | f124f402-1961-46ab-94a8-3d2a69749d9e                           
            |
| e84fcbdd-d2c6-4df6-aede-de5d397eb809 | shared   | 2cb5bb69-1173-48fc-86fe-5851c2722d6d                           
            |
| f4307d1f-9ba4-4edb-a983-660496d25c68 | public   | 1ae6ba4b-9e89-4060-83c1-17be83644088, 57d44c28-2eac-4615-b36d-a
5cc19c0b22b |
+--------------------------------------+----------+----------------------------------------------------------------
------------+
```

demo 프로젝트에서 provider 역할을 하는 public과, self-service network인 heat-net과 shared를 이용하여 서비스를 구성해보도록 하겠습니다.

또한, devstack에는 기본적으로 cirros와 fedora image가 내장되어 있는데, 범용적으로 많이 사용되는 Ubuntu18.04와 CentOS7을 image list에 등록해줍니다.

```bash
#CentOS7
wget https://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud.qcow2
openstack image create --disk-format qcow2 --container-format bare \
  --public --file CentOS-7-x86_64-GenericCloud.qcow2 CentOS7
#Ubuntu18.04 amd64
wget https://cloud-images.ubuntu.com/bionic/current/bionic-server-cloudimg-amd64.img
openstack image create --disk-format qcow2 --container-format bare \
  --public --file bionic-server-cloudimg-amd64.img Ubuntu18.04-amd64
```

CodeServer Instance에 접속하기 위한 ssh keypair를 생성하여, openstack에 cdr_key로 등록해줍니다.

```bash
$ ssh-keygen -q -N ""
$ openstack keypair create --public-key ~/.ssh/id_rsa.pub cdr_key
```

CodeServer에서는 8080/tcp을 이용하므로, openstack에서 8080/tcp를 허용하는 security group을 생성해줘야 합니다. 인스턴스 상태 체크를 위해 ICMP와 22/tcp 또한 뚫어줍니다.

```bash
openstack security group create cdr-rule
openstack security group rule create --proto tcp --dst-port 22 cdr-rule
openstack security group rule create --proto tcp --dst-port 8080 cdr-rule
openstack security group rule create --proto icmp cdr-rule
```

User VM을 배포할 네트워크와 image가 준비되었으니, 이제 Instance를 만들고 Codeserver package를 설치하고 구동시킬 차례입니다. template/create_cdr_instance.yml을 이용하면 명령어 한번에 Codeserver가 구동되는 instance를 배포할 수 있습니다.

```bash
openstack stack create cdr-admin -t templates/create_cdr_instance.yml \
  --parameter "hostname=cdr-admin" \
  --parameter "key_name=cdr_key" \
  --parameter "image=Ubuntu18.04-amd64" \
  --parameter "flavor=ds1G" \
	--parameter "public_net_id=$(openstack network list | grep public | cut -f2 -d '|' | tr -d ' ')" \
  --parameter "private_net_id=$(openstack network list | grep heat-net | cut -f2 -d '|' | tr -d ' ')" \
  --parameter "private_subnet_id=$(openstack network list | grep heat-net | cut -f4 -d '|' | tr -d ' ')" \
  --parameter "zone_host_name=nova:codesquare-devstack-compute2" \
  --parameter "security_group=$(openstack security group list | grep cdr-rule | cut -f2 -d '|' | tr -d ' ')"	
```

codeserver instance는 openstack heat를 이용하여 생성가능함을 확인했으니, 이제 openstack zun + virtual kubelet을 이용하여 codesquare의 서비스들을 kubernetes deployment로 올리고 openstack에서 제공하는 서비스들로 관리해봅시다.

Virtual-Kubelet의 동작으로 이후 kubectl을 통해 등록되는 pod들은 virtual-kubelet node를 등록할 때 환경변수로 설정되어있던 tenant의 private network에 올라갑니다.

CodeSquare에서는 backend 서비스들을 docker-compose.yml로 관리하고 있습니다. kubernetes에 등록하기 위해서는 docker-compose template을 kubernetes의 것으로 변환하여야 하는데 이때 필요한게 **Kompose(Kubernetes + Compose)**입니다.

설치는 매우 간단합니다.

```bash
# Linux
curl -L https://github.com/kubernetes/kompose/releases/download/v1.22.0/kompose-linux-amd64 -o kompose

chmod +x kompose
sudo mv ./kompose /usr/local/bin/kompose
```

이제 docker-compose.yml이 있는 디렉토리에서 아래 명령어를 실행하면 docker-compose.yml의 서비스를 Pod, Deployment, Service, PolicyNetwork로 변환하여 줍니다. kompose를 통해 생성된 파일들을 kubectl apply -f 를 통해 하나하나 등록해줍니다.

```bash
kompose build --volumes=hostPath
kubectl apply -f 
```
