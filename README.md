# QuantumultX-Rules

Quantumult X 远程重写引用：保留京东、淘宝、携程原规则，逐步整合其他指定 App 的**精确广告接口**。仅为社区规则整理，尚未经最新 App 实机验证。

## QX 订阅
```text
https://raw.githubusercontent.com/LiRayX/QuantumultX-Rules/main/Rewrite/MyAds.conf
```
在 QX「重写 → 引用」导入。**不要**把它当作完整主配置，也不要添加 `[rewrite_local]` / `[mitm]`。确认 MITM 证书、主机名和重写总开关。

## 独立分流订阅（QQ 音乐）

```text
https://raw.githubusercontent.com/LiRayX/QuantumultX-Rules/main/Filter/MyFilter.list
```
在 Quantumult X 的「分流 → 规则资源」中添加上述地址，选择与文件中 REJECT 相容的拒绝策略。注意仓库目录名按要求为 `Filter`。

- `Rewrite/MyAds.conf`：包含 QQ 音乐 Moli `t_splash_info` 开屏素材重写，需 MITM。
- `Filter/MyFilter.list`：QQ 音乐 5 条明确的广告域名分流；无需 MITM，暂不加通用腾讯域名或统计域名。
- 不保证屏蔽 QQ 音乐全部内部营销内容；如影响正常加载，先停用对应订阅排查。

## 覆盖状态（2026-10-20）

| App | 状态 | 说明 |
|---|---|---|
| 京东、携程 | 保留原有 | 京东仍可能无法去开屏；携程存在 MITM 限制 |
| 淘宝 | 已整合 Moli 非脚本规则 | 从 Moli ADBlock.conf 直接筛选淘宝相关 reject-dict 规则，并保留单独开屏 reject；其 RuCu6 脚本链接当前 404，未接入 |
| 拼多多 | 已加入 | 精准 splash 接口 |
| 美团 | 已加入 | 美团外卖启动请求；可能不覆盖美团主 App |
| 去哪儿 | 已加入 | 两个开屏接口 |
| 12306 | 已加入（实验） | 广告服务 getAdList，优先测试正常页面；原源使用 JS，本仓库改用 reject-200，响应结构可能不同 |
| Keep | 已加入 | 广告预加载、广告接口和会员引导弹窗 |
| 小红书、高德地图、知乎 | 交由墨鱼专项规则 | 本仓库不重复添加 |
| 哔哩哔哩 | 已加入（开屏专项） | Moli `/x/v2/splash/show` + app2smile `/x/v2/splash/list` 响应体处理；可能与墨鱼 B 站专项规则冲突，需测试 |
| QQ 音乐 | 已加入 | 开屏图片重写 1 条，广告域名分流 5 条；待实机验证 |
| 微信 | 已加入（实验） | 仅公众号文章 getappmsgad，可能无法替代原规则的响应体精修 |
| 天猫 | 待验证 | 与淘宝共享广告生态，不代表天猫主 App 已覆盖 |
| 航旅纵横 | 已加入（素材级） | 仅拦截 `img.umetrip.com/fs/advert/`，不拦截 native 接口；需实机验证 |
| 滴滴出行、盒马 | 待验证 | 尚未确认安全的开屏广告接口 |
| 飞猪 | 待验证 | 源中只有 CDN 图片正则；误伤概率高，暂不加入 |
| 微博、爱奇艺 | 待验证 | 涉及外部 JS 或较宽泛图片规则；未直接照搬 |

## 淘宝补充说明
2026-10-20：用 Moli `Rewrite/ADBlock.conf` 淘宝区块中的非脚本规则替换此前分散添加的淘宝规则，保留 `Startup.conf` 明确的 `splash.awesome.get` 规则。Moli 依赖的 RuCu6 `myBlockAds.js` 地址返回 404，未直接复用该两条脚本规则；因此目前并非完整照搬 Moli 的响应体方案。
2026-10-20 新增四条 Moli 精准接口规则。没有引入 RuCu6 的外部 `myBlockAds.js` 脚本，也没有屏蔽 `acs.m.taobao.com` 整个域名。`newface.awesome.get` 属于启动页配置接口，若首页功能异常可优先停用这一条。与墨鱼等其他订阅命中相同 URL 时，须检查 QX 匹配先后；广告已缓存或采用其他接口时，本次增补也可能无效。

## 安全与维护
1. 本配置不承诺 20 个 App 都已实现去广告。优先避免影响机票、酒店、付款、订单、地图等核心功能。
2. 已移除本仓库的小红书（2 条）和高德地图（1 条）重复规则；知乎保持由墨鱼专项负责；哔哩哔哩只额外加入开屏 show 接口。其余与墨鱼去开屏2.0 / tailadv 重复的内容仍需按 QX 启用情况核对。
3. 若某 App 出现异常，先关闭本引用并提供 QX 请求记录（隐藏 Cookie、token 和隐私）。
4. 与原源相比，12306 与微信条目不使用上游 JS，**行为并不完全等价**，必须测试。
5. 航旅纵横仅使用广告素材路径规则：该路径也可能影响广告位图片显示，不承诺去除所有开屏。
6. 当前为**人工维护**，不会自动同步上游。

## 来源
- [app2smile bilibili-json.js](https://github.com/app2smile/rules/blob/master/js/bilibili-json.js)（B站开屏 list）
- [zqzess QQ 音乐专属 QMusicAd.snippet](https://github.com/zqzess/rule_for_quantumultX/blob/master/QuantumultX/snippet/QMusicAd.snippet)
- [Moli-X ADBlock.conf](https://github.com/Moli-X/Resources/blob/main/Rewrite/ADBlock.conf)（QQ 音乐开屏素材）
- [Moli-X/Resources — Startup.conf](https://github.com/Moli-X/Resources/blob/main/Rewrite/Startup.conf)（淘宝 `splash.awesome.get`）
- [Moli-X/Resources — ADBlock.conf](https://github.com/Moli-X/Resources/blob/main/Rewrite/ADBlock.conf)（淘宝 `tao_splash`）
- [Moli-X/Resources — AD_Bilibili.conf](https://github.com/Moli-X/Resources/blob/main/Rewrite/Bilibili/AD_Bilibili.conf)（只提取 splash/show）
- [zwf234/rules — tailadv.conf](https://github.com/zwf234/rules/blob/master/QuantumultX/tailadv.conf)
- [墨鱼去开屏2.0 — 官方入口](https://ddgksf2013.top/rewrite/StartUpAds.conf)
- [墨鱼主项目（含专门适配说明）](https://github.com/ddgksf2013/ddgksf2013)
- [blackmatrix7/ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)

墨鱼官方 `StartUpAds.conf` 本次未能直接获取全文；已实际读取的规则主要来自 `tailadv.conf`，因此不声称逐条完全对照最新版墨鱼文件。
