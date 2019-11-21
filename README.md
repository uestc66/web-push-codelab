# web-push-codelab

Web Push 演示

## 体验方法

* 下载工程到本地
```
git clone https://github.com/uestc66/web-push-codelab.git
```
* 在 https://web-push-codelab.glitch.me/ 上获取 Application Server Keys，用 Public Key 替换 `scripts/main.js` 中的 applicationServerPublicKey，因为 application server keys 公钥可能过期。
```
// application server keys 公钥
const applicationServerPublicKey =
  "BAU7IR2lmJINafwwk6mMt-S5YeVxGOTW1qKHVrt_ZZNKhpfVX1ARCY3jYypebD7CeTO0ghCpdyzY5kdpFboNs6w";
```

![](https://gw.alicdn.com/tfs/TB1rN0CnQT2gK0jSZPcXXcKkpXa-2862-1710.jpg)
* 使用 Web Sever for Chrome （请先安装 Web Server Chrome 插件）打开工程文件夹。

![](https://gw.alicdn.com/tfs/TB1xg8xnUz1gK0jSZLeXXb9kVXa-2836-1494.jpg)
* 访问 http://127.0.0.1:8887

![](https://gw.alicdn.com/tfs/TB1fcBAnQL0gK0jSZFAXXcA9pXa-2878-1324.jpg)

* 激活消息订阅按钮，复制 push subscription:
```
{"endpoint":"https://fcm.googleapis.com/fcm/send/cWSSVVFJ2go:APA91bErsAqoHZR3fXTP9Op8HtwiFaE66BXWgVl6JR4iD1twEgNlrYMNW6u7qpff7UVaeWz6UTa2in5vJkwCyaPNmHsXQub0KmHKjbaJ7nmPwJYthwU0ob7RekHEWTc68wIikoHGbSz2","expirationTime":null,"keys":{"p256dh":"BLPZHFh2AatzWCH_OfEcb2wr0Hf4TR_09BmGUvVZ3UfoOCbOWMLEB53hokAB5VyJY0s0asT7nIqMus2lopAQioo","auth":"x2Aq1MSHNPNxdXdTrRq7Ow"}}
```

* 在刚才打开的 https://web-push-codelab.glitch.me/ 上粘贴 push subscription 并发送消息：

![](https://gw.alicdn.com/tfs/TB1eF.onAP2gK0jSZPxXXacQpXa-2684-1482.jpg)