import * as dingtalk from 'dingtalk-jsapi'
import router from "@/router/index.js";
import {useUserStore} from "@/stores/user.js";
import {jsSdkAuthorized} from "@/api/index.js";


let whileList = ["/warning", "/404", "/405"];
router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  showLoadingToast({
    message: "加载中...",
    duration: 0, //duration为0保持显示，直到手动关闭
    forbidClick: true //禁止点击
  });
  // closeToast();
  document.title = to.meta.title || import.meta.VIT_APP_TITLE
  if (whileList.includes(to.path)) {
    closeToast()
    return;
  }
  if (dingtalk.env.platform === "notInDingTalk") {
    closeToast()
    return {name: "404"};
  } else {
    let res = await jsSdkAuthorized(location.href.split('#')[0]);
    if (res.code === 200) {
      let {agentId, corpId, timeStamp, nonceStr, signature} = res.signatureObj;
      dingtalk.config({
        agentId,
        corpId,
        timeStamp,
        nonceStr,
        signature,
        type: 0,
        jsApiList: ['chooseChat', 'chooseImage', 'share']
      });
      dingtalk.error(async (err) => {
        console.log(err, "err")
        closeToast()
        await showDialog({
          title: "标题",
          message: "dd.error:" + JSON.stringify(err),
          zIndex: 2000,
        });
      });
      dingtalk.ready(async () => {

      })
    }
  }
})

router.afterEach(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
})