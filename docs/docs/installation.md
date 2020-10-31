---
id: installation
title: 설치하기
description: CodeSquare는 군 복무중인 개발자를 위한 통합 개발 플랫폼입니다.
---
## Openstack Minimum Requirements
Openstack 공식 문서에 의하면 openstack controller 노드와 compute 노드의 최소 사양은 아래와 같습니다.
* Controller Node: 1 processor, 4 GB memory, and 5 GB storage
* Compute Node: 1 processor, 2 GB memory, and 10 GB storage
Codesquare에서는 1개의 Controller 노드와 2개의 Compute 노드로 Overcloud openstack 환경을 구축하고자 합니다.

## Network Configuration
Codesquare는 Google Cloud를 이용하여 Openstack host machine들을 구축할 내부망을 VPC(Virtual Private Cloud) 네트워크를 이용하여 아래와 같이 구축하였습니다.
* **`IP Address Range`** : 192.168.1.0/24
* **`Gateway IP Address`** : 192.168.1.1
* **`NAT IP Address`** : 192.168.1.2
* **`Controller Node`** : 192.168.1.10
* **`Compute Node 1`** : 192.168.1.20
* **`Compute Node 2`** : 192.168.1.25
## Openstack Install
Codesquare는 openstack install automation tool로 devstack을 채택하였습니다.    
그리고 install automation을 수행할 machine으로 아래의 구성으로 동일한 3개의 Ubuntu 18.04 instance를 생성하였습니다.
* e2-standard-4(vCPU 4개, 16GB 메모리)
* Intel Skylake 
* 80GB Standard Persistent Disk
* ubuntu-1804-bionic-v20200923
각각의 instance에 ssh를 통해 접속하여 `/etc/network/interfaces`를 아래와 같이 개인의 환경과 동일하게 생성해줍니다. 아래의 예는 Codesquare의 Openstack Controller Node의 network interface입니다.
> Ubuntu 18.04 LTS (xenial) 이후의 운영체제에서 아래 설정 파일을 사용하려면 먼저 sudo apt install ifupdown 명령어를 실행해야 합니다.
```
auto eth0
iface eth0 inet static
    address 192.168.1.10
    netmask 255.255.255.0
    gateway 192.168.1.1
```
Openstack 공식 문서에서는 root access 권한을 가진 non-root user를 생성할 것을 권하고 있으므로, 각각의 인스턴스에 대하여 아래와 같이 stack 유저를 생성한 후 root access 권한을 부여해줬습니다.
```bash
$ sudo useradd -s /bin/bash -d /opt/stack -m stack
$ echo "stack ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/stack
$ sudo su - stack
```
각각의 node에서 stack 유저 access를 위해 ssh-key를 추가합니다.
```bash
$ mkdir ~/.ssh; chmod 700 ~/.ssh
$ echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCyYjfgyPazTvGpd8OaAvtU2utL8W6gWC4JdRS1J95GhNNfQd657yO6s1AH5KYQWktcE6FO/xNUC2reEXSGC7ezy+sGO1kj9Limv5vrvNHvF1+wts0Cmyx61D2nQw35/Qz8BvpdJANL7VwP/cFI/p3yhvx2lsnjFE3hN8xRB2LtLUopUSVdBwACOVUmH2G+2BWMJDjVINd2DPqRIA4Zhy09KJ3O1Joabr0XpQL0yt/I9x8BVHdAx6l9U0tMg9dj5+tAjZvMAFfye3PJcYwwsfJoFxC8w/SLtqlFX7Ehw++8RtvomvuipLdmWCy+T9hIkl+gHYE4cS3OIqXH7f49jdJf jesse@spacey.local" > ~/.ssh/authorized_keys
```
각각의 node에서 devstack의 stable branch 중 가장 up-to-date한 victoria를 clone 해줍니다.
```bash
$ git clone https://opendev.org/openstack/devstack -b stable/victoria
$ cd devstack
$ cp samples/local.conf ./local.conf
```
이후에는 Controller Node와 Compute Node 각각 다르게 local.conf 파일을 설정하는데, Compute Node1은 CodeSquare의 주요 서비스들을 docker 형태로 서비스 하기 위해 zun 관련 설정들을, Compute Node2는 CodeSquare의 유저들에게 제공해줄 VM들을 관리하기 위해 default로 설정해줍니다.
## Openstack 설치 이전 local.conf 편집
### Controller Node
원하는 편집기로 samples폴더에서 복사한 local.conf로 들어가서, 패스워드 설정을 한 후 그 아래에 다음과 같은 설정값을 입력합니다. 그리고 heat plugin과 zun plugin 관련 설정 또한 추가해줍니다.
```bash
HOST_IP=192.168.1.10
FIXED_RANGE=10.4.128.0/20
FLOATING_RANGE=192.168.1.128/25
```
### heat plugin
```bash
enable_service h-eng h-api h-api-cfn h-api-cw
enable_plugin heat https://opendev.org/openstack/heat stable/victoria
enable_plugin heat-dashboard https://opendev.org/openstack/heat-dashboard stable/victoria
```
### zun plugin
```bash
enable_plugin zun https://opendev.org/openstack/zun stable/victoria
enable_plugin zun-tempest-plugin https://opendev.org/openstack/zun-tempest-plugin
# This below plugin enables installation of container engine on Devstack.
# The default container engine is Docker
enable_plugin devstack-plugin-container https://opendev.org/openstack/devstack-plugin-container
# This enables CRI plugin for containerd
ENABLE_CONTAINERD_CRI=True
# Optional:  uncomment to enable Kata Container
# ENABLE_KATA_CONTAINERS=True
# In Kuryr, KURYR_CAPABILITY_SCOPE is `local` by default,
# but we must change it to `global` in the multinode scenario.
KURYR_CAPABILITY_SCOPE=global
KURYR_PROCESS_EXTERNAL_CONNECTIVITY=False
enable_plugin kuryr-libnetwork https://opendev.org/openstack/kuryr-libnetwork stable/victoria
# install python-zunclient from git
LIBS_FROM_GIT="python-zunclient"
# Optional:  uncomment to enable the Zun UI plugin in Horizon
enable_plugin zun-ui https://opendev.org/openstack/zun-ui stable/victoria
```
### Compute Node
#### compute node #1
```bash
HOST_IP=192.168.1.20
FIXED_RANGE=10.4.128.0/20
FLOATING_RANGE=192.168.1.128/25
ENABLE_CONTAINERD_CRI=True
enable_plugin devstack-plugin-container https://opendev.org/openstack/devstack-plugin-container
enable_plugin zun https://opendev.org/openstack/zun stable/victoria
# Optional:  uncomment to enable Kata Container
# ENABLE_KATA_CONTAINERS=True
KURYR_CAPABILITY_SCOPE=global
KURYR_PROCESS_EXTERNAL_CONNECTIVITY=False
enable_plugin kuryr-libnetwork https://opendev.org/openstack/kuryr-libnetwork stable/victoria
# Following is for multi host settings
MULTI_HOST=True
SERVICE_HOST=192.168.1.10
DATABASE_TYPE=mysql
MYSQL_HOST=$SERVICE_HOST
RABBIT_HOST=$SERVICE_HOST
ENABLED_SERVICES=zun-compute,kuryr-libnetwork,q-agt
```
#### compute node #2
```bash
HOST_IP=192.168.1.25
FIXED_RANGE=10.4.128.0/20
FLOATING_RANGE=192.168.1.128/25
DATABASE_TYPE=mysql
MULTI_HOST=True
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
## After Openstack Install
Control Node와 Compute Node의 Openstack Setup이 모두 끝났다면, Controller Node에서 `devstack/tools/discover_hosts.sh` 스크립트를 실행하여 compute node host를 controller node에 mapping 시켜줍니다.    
이후, Controller Node에서 다음 명령어로 compute node가 제대로 mapping 되었는지 확인합니다.
```bash
$ source openrc admin admin  #openstack env setting
$ zun service list  #compute node1 나타나는지 확인
$ openstack host list  #compute node2 나타나는지 확인
```
## Delete unnecessary projects
```bash
$ openstack project purge --project alt_demo
$ openstack project purge --project invisible_to_admin
```
## Synchronize Zun and Virtual Kubelet
### Kubernetes Install
```bash
sudo apt update -y
sudo apt install -y apt-transport-https
sudo curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add
sudo chmod 777 /etc/apt/sources.list.d/
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" > sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update -y
sudo apt install -y kubelet kubeadm kubectl kubernetes-cni
sudo swapoff -a
echo '1' > sudo tee /proc/sys/net/ipv4/ip_forward
sudo kubeadm init --pod-network-cidr 10.4.128.0/20
```
kubeadm init 중에 process 2379, 2380이 사용중이라며 에러가 난다면 아래처럼 netstat으로 2379, 2380을 사용하는 process를 찾아내어 kill 명령어로 강제종료 시킵니다.
```bash
netstat -nlap | grep 2379
sudo kill 5382 #In my case, etcd have 5382 as PID
sudo kubeadm init --pod-network-cidr 10.4.128.0/20
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/amin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
# kubernetes verification
kubectl version
```
이후 kubectl get pods -A로 모든 네임스페이스의 모든 팟을 찍어보면, coredns가 pending 상태에서 멈춘 것을 확인할 수 있다.
```bash
$ kubectl get pods -A

NAMESPACE     NAME                             READY   STATUS    RESTARTS   AGE
kube-system   coredns-5c98db65d4-5jmmv         0/1     Pending   0          4h38m
kube-system   coredns-5c98db65d4-tqdpj         0/1     Pending   0          4h38m
kube-system   etcd-master                      1/1     Running   0          4h37m
kube-system   kube-apiserver-master            1/1     Running   0          4h38m
kube-system   kube-controller-manager-master   1/1     Running   0          4h38m
kube-system   kube-proxy-n8f76                 1/1     Running   0          4h38m
kube-system   kube-scheduler-master            1/1     Running   0          4h37m\
```
coredns의 yaml 파일에서 loop를 제외합니다. 다음 명령을 하여 보여지는 yaml 파일에서 loop 항목을 #loop 로 수정합니다.
```bash
$ kubectl edit cm coredns -n kube-system
```
flannel CNI를 설치합니다.
```bash
$ kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

podsecuritypolicy.policy/psp.flannel.unprivileged created
clusterrole.rbac.authorization.k8s.io/flannel created
clusterrolebinding.rbac.authorization.k8s.io/flannel created
serviceaccount/flannel created
configmap/kube-flannel-cfg created
daemonset.apps/kube-flannel-ds-amd64 created
daemonset.apps/kube-flannel-ds-arm64 created
daemonset.apps/kube-flannel-ds-arm created
daemonset.apps/kube-flannel-ds-ppc64le created
daemonset.apps/kube-flannel-ds-s390x created
```
이후, coredns가 RUNNING으로 올바르게 뜨는지 확인합니다.
```bash
stack@codesquare-devstack-control:~/openstack-zun$ kubectl get pods -A
NAMESPACE     NAME                                                  READY   STATUS    RESTARTS   AGE
kube-system   coredns-f9fd979d6-j9cv8                               1/1     Running   0          34m
kube-system   coredns-f9fd979d6-jzxq9                               1/1     Running   0          34m
kube-system   etcd-codesquare-devstack-control                      1/1     Running   0          34m
kube-system   kube-apiserver-codesquare-devstack-control            1/1     Running   0          34m
kube-system   kube-controller-manager-codesquare-devstack-control   1/1     Running   0          34m
kube-system   kube-flannel-ds-8mcxf                                 1/1     Running   0          11m
kube-system   kube-proxy-78jcw                                      1/1     Running   0          34m
kube-system   kube-scheduler-codesquare-devstack-control            1/1     Running   0          34m
```
### Golang latest install
```
stack@control:~$ cd /tmp
stack@control:~$ sudo wget https://golang.org/dl/go1.15.3.linux-amd64.tar.gz
stack@control:~$ sudo tar -xvzf go1.15.3.linux-amd64.tar.gz 
stack@control:~$ sudo mv go /usr/local
stack@control:~$ export GOROOT=/usr/local/go
stack@control:~$ export GOPATH=$HOME/go
stack@control:~$ export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
stack@control:~$ source ~/.profile
```
### Virtual-Kubelet 설치 및 node 등록
```
stack@control:~$ git clone https://github.com/virtual-kubelet/openstack-zun
stack@control:~$ cd openstack-zun
stack@control:~$ make build
stack@control:~$ ./bin/virtual-kubelet --provider openstack > /tmp/vk.out 2>&1 &
```

