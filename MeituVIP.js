/*
 * @name: Meitu VIP & AdBlock Exclusive
 * @author: Quoc Khanh Media
 * @description: Mở khóa tính năng VIP Meitu và chặn quảng cáo startup
 */

const url = $request.url;
let body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 1. Xử lý Mở khóa VIP (Endpoint: vip/info, user/info)
    if (url.includes("/vip/info") || url.includes("/user/info") || url.includes("/subs/info")) {
        const vipData = {
            "is_vip": true,
            "vip_type": 1,
            "expire_time": "2099-12-31 23:59:59",
            "is_expire": false,
            "subscription_status": 1,
            "can_use_vip_feature": true,
            "level": 9,
            "status": 1,
            "is_in_free_trial": false
        };

        if (obj.data) {
            obj.data.vip_info = { ...obj.data.vip_info, ...vipData };
            obj.data.is_vip = true;
            obj.data.vip_type = 1;
        }
    }

    // 2. Xử lý Chặn Quảng cáo (Endpoint: ad/get, startup)
    if (url.includes("/ad/get") || url.includes("/startup") || url.includes("/launch")) {
        if (obj.data) obj.data = [];
        if (obj.ads) obj.ads = [];
        if (obj.response) obj.response = {};
    }

    body = JSON.stringify(obj);
}

$done({ body });
