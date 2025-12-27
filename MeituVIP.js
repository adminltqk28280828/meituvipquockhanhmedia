/*
 * @name: Meitu VIP Fix Connection
 * @author: Quoc Khanh Media
 */

const url = $request.url;
let body = $response.body;

try {
    if (body) {
        let obj = JSON.parse(body);
        if (url.includes("/vip/info") || url.includes("/user/info")) {
            obj.data = {
                ...obj.data,
                "is_vip": true,
                "vip_type": 1,
                "expire_time": "2099-12-31 23:59:59",
                "can_use_vip_feature": true
            };
        }
        // Chặn quảng cáo nhanh hơn
        if (url.includes("/ad/get") || url.includes("/startup")) {
            obj.data = [];
        }
        $done({ body: JSON.stringify(obj) });
    } else {
        $done({});
    }
} catch (e) {
    $done({}); // Trả về dữ liệu gốc nếu có lỗi để tránh mất mạng
}
