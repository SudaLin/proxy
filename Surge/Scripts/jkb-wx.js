// /ebus/jxjxcxzcfu/jingxinju/jkb/businessTravel/
const path1 = "getBaseData";
const path2 = "getHealthCode";
const path3 = "check";
// /ebus/jxjxcxzcfu/hsjc/jkb/codeHsjc/resultQuery
const path4 = "resultQuery";

const url = $request.url;
const body = $response.body;
const param = $argument

// 入参解析
eval(param)
let healthCode = code ? code : 0;
let afterTestTime = att ? att : 0;
let detResult = result === 0 ? "阳性" : "阴性";
console.log("健康码(0=绿、1=黄、2=红) : " + healthCode)
console.log("检测日期 : " + afterTestTime)
console.log("检测结果 : " + detResult)

console.log("请求路径 : " + url)
console.log("修改前 : " + body)

if (url.indexOf(path1) != -1) {
    let createTime = new Date();
    createTime.setDate(createTime.getDate())
    createTime.setHours(8)
    let validDate = new Date()
    validDate.setDate(validDate.getDate())
    validDate.setHours(0, 0, 0, 0);

    let obj = JSON.parse(body);
    obj.errcode = "BIS:10200"
    obj.errmsg = null
    obj.data.createTime = dateFormat("mm-dd hh:MM", createTime)
    obj.data.gifUrl = "gifUrl=https://xcx-static.yqgz.beijing.gov.cn/images/security/39A0FF.gif"
    obj.data.iconUrl = "gifUrl=https://xcx-static.yqgz.beijing.gov.cn/images/security/39A0FF.gif"
    obj.data.validDate = validDate.getTime()
    obj.data.validDateStr = dateFormat("mm-dd", validDate) + " 24:00"

    let data = JSON.stringify(obj);
    console.log("修改后 : " + data)
    $done({body: data});
} else if (url.indexOf(path2) != -1) {
    let obj = JSON.parse(body);
    obj.errcode = "BIS:10200"
    obj.errmsg = null
    // 0：绿(未见异常)，1(居家观察)：黄，2：红(集中观察)
    obj.data.code = healthCode

    let data = JSON.stringify(obj);
    console.log("修改后  : " + data)
    $done({body: data});
} else if (url.indexOf(path3) != -1) {
    let obj = {
        "errcode": "BIS:10200",
        "errmsg": null,
        "data": {
            "isLeaveOrEnterBj": false,
            "healthStatus": {
                "errorCode": null,
                "errorMsg": null,
                "name": null,
                "idCard": null,
                "realIdCard": null,
                "code": "0",
                "createTime": null,
                "validDateStr": null,
                "validDate": null,
                "userUUID": null,
                "encourage": null,
                "image": null,
                "iconUrl": null,
                "gifUrl": null,
                "msg": "1",
                "isDefaultImg": null,
                "isSixteen": null,
                "time": null
            },
            "enableFjsb": true
        }
    };

    let data = JSON.stringify(obj);
    console.log("修改后 : " + data);
    $done({body: data});
} else if (url.indexOf(path4) != -1) {
    /*
    {
      "errcode": "BIS:10200",
      "errmsg": null,
      "data": {
        "detTime": "2022-06-13 02:26:09",
        "detResult": "阴性",
        "afterTestTime": 0
      }
    }
    */
    let detTime = new Date();
    detTime.setDate(detTime.getDate() - afterTestTime)
    let obj = JSON.parse(body);
    obj.errcode = "BIS:10200"
    obj.errmsg = null
    obj.data.detTime = dateFormat("yyyy-mm-dd hh:MM:ss", detTime);
    obj.data.detResult = detResult;
    obj.data.afterTestTime = afterTestTime;

    let data = JSON.stringify(obj);
    console.log("修改后  : " + data)
    $done({body: data});
} else {
    console.log("未更改");
    $done({});
}


function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "h+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "s+": date.getSeconds().toString()
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}