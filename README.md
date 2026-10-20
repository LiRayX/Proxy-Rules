# QuantumultX-Rules

精简的 Quantumult X 广告重写规则，主要面向京东、淘宝与携程开屏广告。

## 订阅
```
https://raw.githubusercontent.com/LiRayX/QuantumultX-Rules/main/Rewrite/MyAds.conf
```

在 Quantumult X 的「重写 → 引用」添加以上 URL。启用 MITM 证书并确认所需 hostname 已生效。

## 原则
- 只保留目标 App 的专项广告接口，避免整域名拒绝。
- 不覆盖购物、酒店、机票、订单和支付等核心 API。
- 不保证最新 App 版本一定有效；如遇异常，先停用本文件。
- 本文件为手动维护配置，不会自动追踪上游更新。

## 规则来源
- [zwf234/rules tailadv.conf](https://github.com/zwf234/rules/blob/master/QuantumultX/tailadv.conf)
- [blackmatrix7/ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)

本仓库仅提供社区规则的筛选与整理，规则效果需要在实际 App 版本下验证。
