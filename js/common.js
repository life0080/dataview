// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})
// 显示用户名称和退出登录
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.navbar .font-weight-bold').innerHTML = localStorage.getItem('user-name')
  document.querySelector('#logout')?.addEventListener('click', () => {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-name')
    location.href = './login.html'
  })
})

axios.defaults.baseURL = 'http://ajax-api.itheima.net/'
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('user-token')
    return config
  },
  (e) => Promise.reject(e)
)
axios.interceptors.response.use(
  // 直接拿到数据
  (res) => res.data,
  (e) => {
    if (e.response.status === 401) {
      location.href = './login.html'
    }
    return Promise.reject(e)
  }
)
