import config  from '@/config'
import axios from 'axios'
const requests = axios.create({
    baseURL:config.baseUrl,// process.env.VUE_APP_API, // 基础url,如果是多环境配置这样写，也可以像下面一行的写死。
    timeout: 6000 // 请求超时时间
  })
// request interceptor(请求拦截器)
requests.interceptors.request.use(config => {
    //   const token = Vue.ls.get(ACCESS_TOKEN)
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
      }
      config.withCredentials = true
      return config
    }, err)
// response interceptor（接收拦截器）
requests.interceptors.response.use((response) => {
    const res = response.data
    if (res.code !== 0&&res.code!==200) { 
    //   Notify({ type: 'danger', message: res.message||res.msg });
    //   // 401:未登录;
    //   if (res.code === 401||res.code === 403||res.code===999) {
    //     Notify({ type: 'danger', message: '请登录'});
    //   }
    console.log('error')
      return Promise.reject('error')
    } else {
      return res
    }
  }, err)

  const err = (error) => {
    if (error.response) {
      const data = error.response.data
      console.log(data)
      // const token = Vue.ls.get(ACCESS_TOKEN)
      if (error.response.status === 403) {
        //   Notify({ type: 'danger', message: data.message||data.msg });
      }
      if (error.response.status === 401) {
        //   Notify({ type: 'danger', message: '你没有权限。' });
        // if (token) {
        //   store.dispatch('Logout').then(() => {
        //     setTimeout(() => {
        //       window.location.reload()
        //     }, 1500)
        //   })
        // }
      }
    }
    return Promise.reject(error)
  } 

function myFetch(option){
    let url = option.url;
    let  method = option.method ? option.method : 'POST';
    let data = option.data ? option.data : {};
    return new Promise((res,rej)=>{
        fetch(config.baseUrl + url,{
            method: method,
            mode: 'cors',
            
            headers: {
                "Content-Type": 'application/json'//"application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data),
            
        }).then((response) => {
            
            if (response.ok) {  
                return response.json();  
            } else {  
                rej({status:response.status})  
            }  
          }).then(
            (myBlob)=>{
                console.log(myBlob);
                res(myBlob.msg.data)
            }
        ).catch(
            function(error){
                console.log(error)
                rej(error)
            }
        )
    })
}

// export default myFetch

export {
    requests,
    myFetch
  }