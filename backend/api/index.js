import request from '../utils/request.js'

const prefix1 = "https://api.dingtalk.com";

/**
 * 获取accessToken的方法
 * @param {String} appKey
 * @param {String} appSecret
 * @returns {Promise<*>}
 */
export const getAccessToken = async (appKey, appSecret) => {
  return request({
    method: 'post',
    url: `${prefix1}/v1.0/oauth2/accessToken`,
    data: {
      appKey,
      appSecret
    }
  })
}

/**
 * 获取jsapiTicket
 * @param {*} token
 * @returns
 */
export const jsapiTicket = async (token) => {
  return request({
    headers: {
      'Content-Type': 'application/json',
      'x-acs-dingtalk-access-token': token
    },
    method: 'post',
    url: `${prefix1}/v1.0/oauth2/jsapiTickets`,
    data: {}
  });
}