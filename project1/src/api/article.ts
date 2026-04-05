import myAxios from "@/request";

//获取文章榜
export function GetArticleRanking(data: any) {
  return myAxios.request({
    method: "get",
    url: "/api/index/article/rank",
    params: data,
  })
}

//获取最新文章
export function GetLatestArticle(data: any) {
  return myAxios.request({
    method: "get",
    url: "/api/index/article/newest",
    params: data,
  })
}

//获取上次看到
export function GetLastTimeArticle(token: string) {
  return myAxios.request({
    method: "get",
    url: "/api/read/last",
    headers: {
      token
    }
  })
}

//获取文章详情
export function GetArticle(articleId:number, token: string) {
  return myAxios.request({
    method: "get",
    url: `/api/article/detail/${articleId}`,
    headers: {
      token
    }
  })
}
//获取文章评论
export function GetArticleComment(articleId:number) {
  return myAxios.request({
    method: "get",
    url: `/api/article/comment/list/${articleId}`,
  })
}

// 保存阅读进度
export function SaveReading(data:any, token: string){
  return myAxios.request({
    method: "post",
    url:"/api/read/save",
    data,
    headers: {
      token
    }
  })
}
// 文章点赞/取消点赞
export function PostLike(data:any, token: string){
  return myAxios.request({
    method: "post",
    url:"/api/article/like",
    data,
    headers: {
      token
    }
  })
}
// 发表评论
export function PostComment(data:any, token: string){
  return myAxios.request({
    method: "post",
    url:"/api/article/comment/publish",
    data,
    headers: {
      token
    }
  })
}
