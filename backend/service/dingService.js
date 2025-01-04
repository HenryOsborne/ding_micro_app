import {getRandomStr, sign} from "../utils/sign.js";
import config from "../datas/ding.config.json" with {type: 'json'}

const dingService = {
  sign(ticket, url) {
    let nonceStr = getRandomStr(16);
    let agentId = config.AgentId;
    let corpId = config.CorpId;
    let timeStamp = Date.now();
    let signature = sign(ticket, nonceStr, timeStamp, url);
    return {
      agentId,
      corpId,
      timeStamp,
      nonceStr,
      signature
    }
  }
}

export default dingService