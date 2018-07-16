import { request } from '../utils/util.js';

const testRootUrl = 'http://101.201.237.72:4000';

module.exports = {
  getMovies: function (params) { // 获取首页电影列表
    return request(testRootUrl + '/api/client/movie/get_all',
      params
    ).then((res) => {
      return res.data
    })
  },
  getDetail: function (id) { // 获取详情
    return request(testRootUrl + '/api/client/movie/get_detail/'+ id).then((res) => {
      return res.data
    })
  },
  getRelative: function(id){
    return request(testRootUrl + '/api/client/movie/get_relative/'+ id).then((res) => {
      return res.data
    })
  },
  getHotKey: function (){
    return request(testRootUrl + '/api/client/movie/gethotkey').then((res) => {
      return res.data
    })
  },
  searchMovie: function(params){
    return request(testRootUrl + '/api/client/movie/search', params).then((res) => {
      return res.data
    })
  }
}