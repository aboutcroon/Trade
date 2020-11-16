## 部署 agent

> 在每台要部署链节点的服务器上执行如下步骤

<br>

1. 创建初始目录，下载并解压 baas-agent

```
mkdir /baas
curl -sSL http://<nginx server>/deploy/baas-agent.tgz | tar zxf - -C /baas/
```

<br>

2. 编辑 baas-agent 配置文件 /baas/agent/config.toml，修改如下配置

```
nginxIp='xxxx'
user='xxxx'
password='xxxx'
```

<br>

3. 配置 baas-agent 服务，启动并设置开机启动

```
mv /baas/baas-agent.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable baas-agent
systemctl start baas-agent
```

<br>

4. baas-agent 启动成功后，会监听本机 8080 端口