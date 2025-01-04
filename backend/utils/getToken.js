import fs from "fs"
import {fileURLToPath} from "url"
import path from "path"

import config from "../datas/ding.config.json" with {type: "json"}
import {getAccessToken} from "../api/index.js";

const appKey = config.AppKey;
const appSecret = config.AppSecret

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getToken = async () => {
  let currentTime = Date.now();
  let accessTokenJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../datas/token.json")))
  if (accessTokenJSON.accessToken === '' || accessTokenJSON.expireIn < currentTime) {
    //表示token过期，需要获取新的accessToken
    console.log("token过期，需要获取新的accessToken");
    let data = await getAccessToken(appKey, appSecret);
    accessTokenJSON.accessToken = data.accessToken
    accessTokenJSON.expireIn = Date.now() + (data.expireIn - 300) * 1000
    fs.writeFileSync(path.resolve(__dirname, "../datas/token.json"), JSON.stringify(accessTokenJSON))
    return accessTokenJSON.accessToken;
  } else {
    console.log("token没有过期，从本地获取accessToken")
  }
}