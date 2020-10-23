# Openstack Environment Setup Manual

# Openstack Minimum Requirements

[Openstack 공식 문서](https://docs.openstack.org/newton/install-guide-rdo/environment.html)에 의하면 openstack controller 노드와 compute 노드의 최소 사양은 아래와 같습니다.

- Controller Node: 1 processor, 4 GB memory, and 5 GB storage
- Compute Node: 1 processor, 2 GB memory, and 10 GB storage

Codesquare에서는 1개의 Controller 노드와 2개의 Compute 노드로 Overcloud openstack 환경을 구축하고자 합니다.

# Network Configuration

Codesquare는 Google Cloud를 이용하여 Openstack host machine들을 구축할 내부망을 VPC(Virtual Private Cloud) 네트워크를 이용하여 아래와 같이 구축하였습니다.

- **IP Address Range** : 192.168.1.0/24
- **Gateway IP Address** : 192.168.1.1
- **NAT IP Address** : 192.168.1.2
- **Controller Node** : 192.168.1.10
- **Compute Node 1** : 192.168.1.20
- **Compute Node 2** : 192.168.1.25

# Openstack Install

Codesquare는 openstack install automation tool로 **[devstack](https://docs.openstack.org/devstack/latest/)**을 채택하였습니다.

그리고 install automation을 수행할 machine으로 아래의 구성으로 동일한 3개의 Ubuntu 18.04 instance를 생성하였습니다.

- e2-standard-4(vCPU 4개, 16GB 메모리)
- Intel Skylake
- 80GB Standard Persistent Disk
- ubuntu-1804-bionic-v20200923

각각의 instance에 ssh를 통해 접속하여 

/etc/network/interfaces를 아래와 같이 개인의 환경과 동일하게 생성해줍니다. 아래의 예는 Codesquare의 Openstack Controller Node의 network interface입니다.

```
auto eth0
iface eth0 inet static
    address 192.168.1.10
    netmask 255.255.255.0
    gateway 192.168.1.1
```

Openstack 공식 문서에서는 root access 권한을 가진 non-root user를 생성할 것을 권하고 있으므로, 

각각의 인스턴스에 대하여 아래와 같이 stack 유저를 생성한 후 root access 권한을 부여해줬습니다.

```bash
sudo useradd -s /bin/bash -d /opt/stack -m stack
echo "stack ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/stack
sudo su - stack
```

각각의 node에서 stack 유저 access를 위해 ssh-key를 추가합니다.

```bash
mkdir ~/.ssh; chmod 700 ~/.ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCyYjfgyPazTvGpd8OaAvtU2utL8W6gWC4JdRS1J95GhNNfQd657yO6s1AH5KYQWktcE6FO/xNUC2reEXSGC7ezy+sGO1kj9Limv5vrvNHvF1+wts0Cmyx61D2nQw35/Qz8BvpdJANL7VwP/cFI/p3yhvx2lsnjFE3hN8xRB2LtLUopUSVdBwACOVUmH2G+2BWMJDjVINd2DPqRIA4Zhy09KJ3O1Joabr0XpQL0yt/I9x8BVHdAx6l9U0tMg9dj5+tAjZvMAFfye3PJcYwwsfJoFxC8w/SLtqlFX7Ehw++8RtvomvuipLdmWCy+T9hIkl+gHYE4cS3OIqXH7f49jdJf stack@codesquare" > ~/.ssh/authorized_keys
```

각각의 node에서 devstack의 latest repository를 clone 합니다.

```bash
git clone https://opendev.org/openstack/devstack
cd devstack
cp samples/local.conf ./local.conf
```

이후에는 Controller Node와 Compute Node 각각 다르게 local.conf 파일을 편집한 후, devstack 폴더에 있는 [stack.sh](http://stack.sh) 스크립트를 실행하여 openstack 설치를 진행합니다.

## Openstack 설치 이전 local.conf 편집

### Controller Node

원하는 편집기로 samples폴더에서 복사한 local.conf로 들어가서, 패스워드 설정을 한 후 그 아래에 다음과 같은 설정값을 입력합니다.

```bash
HOST_IP=192.168.1.10
FIXED_RANGE=10.4.128.0/20
FLOATING_RANGE=192.168.1.128/25
```

 heat plugin 추가를 위해 아래의 내용도 추가합니다.

```bash
enable_service h-eng h-api h-api-cfn h-api-cw
enable_plugin heat https://opendev.org/openstack/heat
enable_plugin heat-dashboard https://opendev.org/openstack/heat-dashboard
```

### Compute Node

Compute Node 1과 Compute Node 2는 HOST_IP를 제외하고는 서로 local.conf에 입력해야 하는 내용이 같습니다.

```bash
HOST_IP=192.168.1.20
FIXED_RANGE=10.4.128.0/20
FLOATING_RANGE=192.168.1.128/25
DATABASE_TYPE=mysql
SERVICE_HOST=192.168.1.10
MYSQL_HOST=$SERVICE_HOST
RABBIT_HOST=$SERVICE_HOST
GLANCE_HOSTPORT=$SERVICE_HOST:9292
ENABLED_SERVICES=n-cpu,q-agt,c-vol,placement-client
NOVA_VNC_ENABLED=True
NOVNCPROXY_URL="http://$SERVICE_HOST:6080/vnc_lite.html"
VNCSERVER_LISTEN=$HOST_IP
VNCSERVER_PROXYCLIENT_ADDRESS=$VNCSERVER_LISTEN
```

## After Openstack install

Control Node와 Compute Node의 Openstack Setup이 모두 끝났다면, Controller Node에서 **devstack/tools/discover_hosts.sh** 스크립트를 실행하여 compute node host들을 controller node에 mapping 시켜줍니다.

이후, Controller Node에서 다음 명령어로 compute node가 제대로 mapping 되었는지 확인합니다.

```bash
openstack host list
```

출력되는 리스트에서 compute1과 compute2가 나타난다면 성공입니다.
