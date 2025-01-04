import {ref, computed} from 'vue'
import {defineStore} from "pinia";
import {fetchDingUserInfo} from "@/api/index.js";
import {setDingUserInfo, getDingUserInfo as getUserInfo, setToken} from "@/utils/auth.js";

export const useUserStore = defineStore("user", () => {
  const dingUserInfo = ref(null);
  const initDingUserInfo = async (code) => {
    let res = await fetchDingUserInfo(code);
    console.log(res);
    if (res.code == 200) {
      let info = res.data;
      dingUserInfo.value = info.dingUserInfo;
      setToken(info.auto_token);
      setDingUserInfo(info.dingUserInfo)
      return true;
    }
    return false;
  }
  const getDingUserInfo = () => {
    return dingUserInfo.value ? dingUserInfo.value : getUserInfo()
  }
  return {
    dingUserInfo,
    initDingUserInfo,
    getDingUserInfo
  }
})
