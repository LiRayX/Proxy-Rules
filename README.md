# QuantumultX-Rules

Quantumult X 远程重写引用：保留京东、淘宝、携程原规则，逐步整合其他指定 App 的**精确广告接口**。仅为社区规则整理，尚未经最新 App 实机验证。

## QX 订阅
```text
https://raw.githubusercontent.com/LiRayX/QuantumultX-Rules/main/Rewrite/MyAds.conf
```
在 QX「重写 → 引用」导入。**不要**把它当作完整主配置，也不要添加 `[rewrite_local]` / `[mitm]`。确认 MITM 证书、主机名和重写总开关。

## 覆盖状态（2026-10-20）

| App | 状态 | 说明 |
|---|---|---|
| 京东、淘宝、携程 | 保留原有 | 旧规则原样保留；京东仍可能无法去开屏；携程存在 MITM 限制 |
| 拼多多 | 已加入 | 精准 splash 接口 |
| 美团 | 已加入 | 美团外卖启动请求；可能不覆盖美团主 App |
| 去哪儿 | 已加入 | 两个开屏接口 |
| 12306 | 已加入（实验） | 广告服务 getAdList，优先测试正常页面；原源使用 JS，本仓库改用 reject-200，响应结构可能不同 |
| Keep | 已加入 | 广告预加载、广告接口和会员引导弹窗 |
| 小红书 | 已加入 | ads/resource 和 ads/apple/record；不是所有推荐内容 |
| 高德地图 | 已加入（实验） | valueadded API，可能影响增值功能；有问题即关闭 |
| 微信 | 已加入（实验） | 仅公众号文章 getappmsgad，可能无法替代原规则的响应体精修 |
| 天猫 | 待验证 | 与淘宝共享广告生态，不代表天猫主 App 已覆盖 |
| 航旅纵横、滴滴出行、盒马 | 待验证 | 无安全、确定的独立开屏接口，未盲目屏蔽 |
| 飞猪 | 待验证 | 源中只有 CDN 图片正则；误伤概率高，暂不加入 |
| 知乎、哔哩哔哩、微博、爱奇艺 | 待验证 | 源中主要依赖外部 JS、宽泛图片路径或非局部重写；未直接照搬 |

## 安全与维护
1. 本配置不承诺 20 个 App 都已实现去广告。优先避免影响机票、酒店、付款、订单、地图等核心功能。
2. 暂停与墨鱼去开屏2.0及 tailadv 重复的重写引用，避免冲突。
3. 若某 App 出现异常，先关闭本引用并提供 QX 请求记录（隐藏 Cookie、token 和隐私）。
4. 与原源相比，12306 与微信条目不使用上游 JS，**行为并不完全等价**，必须测试。
5. 当前为**人工维护**，不会自动同步上游。

## 来源
- [zwf234/rules — tailadv.conf](https://github.com/zwf234/rules/blob/master/QuantumultX/tailadv.conf)
- [墨鱼去开屏2.0 — 官方入口](https://ddgksf2013.top/rewrite/StartUpAds.conf)
- [墨鱼主项目（含专门适配说明）](https://github.com/ddgksf2013/ddgksf2013)
- [blackmatrix7/ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)

墨鱼官方 `StartUpAds.conf` 本次未能直接获取全文；已实际读取的规则主要来自 `tailadv.conf`，因此不声称逐条完全对照最新版墨鱼文件。
