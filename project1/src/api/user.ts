import myAxios from "@/request";
// 登录功能
export function Login(data:any){
  return myAxios.request({
    method: "post",
    url:"/api/user/login",
    data
  })
}
// 登录功能
export function Register(data:any){
  return myAxios.request({
    method: "post",
    url:"/api/user/register",
    data
  })
}
// 修改用户名称
export function ChangeUsernameInfo(data:any, token: string){
  return myAxios.request({
    method: "post",
    url:"/api/setting/update/username",
    data,
    headers: {
      token
    }
  })
}
//修改密码
export function ChangePasswordInfo(data:any, token: string){
  return myAxios.request({
    method: "post",
    url:"/api/setting/update/password",
    data,
    headers: {
      token
    }
  })
}
//修改头像
export function ChangeAvatarInfo(data:any, token: string){
  return myAxios.request({
    method: "post",
    url:"/api/setting/update/avatar",
    data,
    headers: {
      token
    }
  })
}
//发表文章
export function PushArticle(data:any, token: string){
  return myAxios.request({
    method: "post",
    url:"/api/article/publish",
    data,
    headers: {
      token
    }
  })
}
//获取用户信息
export function GetUserInfo(data: any, token: string) {
  return myAxios.request({
    method: "get",
    url: "/api/user/info",
    params: data,
    headers: {
      token
    }
  })
}
//获取用户发布的文章
export function GetUserPublish(data: any, token: string) {
  return myAxios.request({
    method: "get",
    url: "/api/personal/article/my",
    params: data,
    headers: {
      token
    }
  })
}
//获取用户点赞的文章
export function GetUserLike(data: any, token: string) {
  return myAxios.request({
    method: "get",
    url: "/api/personal/article/like",
    params: data,
    headers: {
      token
    }
  })
}
