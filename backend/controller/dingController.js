import dingService from "../service/dingService.js";
import ConstCode from "../utils/ConstCode.js";

/**
 *
 * @param {import("express").request} req 请求头对象
 * @param {import("express").response} res 响应头对象
 */

const dingController = {
  async jsSdkAuthroized(req, res) {
    let ticket = req(ConstCode.DING_ACCESS_TICKET);
    let url = req.query.url;
    let signatureObj = dingService.sign(ticket, url);
    res.send({
      code: 200,
      signatureObj
    })
  }
}

export default dingController