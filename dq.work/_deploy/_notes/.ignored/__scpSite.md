# SCP v1
## Local Shell
```shell
cd ~/Development/_dq/dq/downquark.ventureCore.DownQuark/src/statics/_qore \
&& zip -r ~/Desktop/dq.qore.v1.$(date +%Y%m%d).zip v1 \
&& scp -i ~/.ssh/dqLinux2.pem -r ~/Desktop/dq.qore.v1.$(date +%Y%m%d).zip ec2-user@ec2-3-13-19-89.us-east-2.compute.amazonaws.com:_scp \
&& rm -rf ~/Desktop/dq.qore.v1.$(date +%Y%m%d).zip
```
## SERVER
> `% dqssh`
```shell
dq \
&& cd __downquark/statics/_qore/ \
&& mv ~/_scp/dq.qore.v1.$(date +%Y%m%d).zip . \
&& mv _v1/ _v1BAK \
&& unzip dq.qore.v1.$(date +%Y%m%d).zip \
&& mv v1 _v1 \
&& rm -rf dq.qore.v1.$(date +%Y%m%d).zip \
&& rm -rf _v1BAK
```
