import axios from '../../axios.js'

const log = console.log.bind(console)
let baseUrl = axios.baseUrl;
import {
    net_err
} from '@/lib/net_config/index.js'
// 后端 api routes
let configPathFromBack = {
    getBlogLimit: '/blog/limit/',
    getBlogLimitByIndex: '/blog/one/',
    getBlogByTagName: '/blog/tag/',
}

const request_get = async function(api_path, params) {
        let path = baseUrl + api_path + params
        log(path)
        return await axios.get(path)
    }
    /*
     这个接口是后端的 ==> 分页接口 <==
     当用户访问 blog 展示
     created生命周期函数 =>自动调用 methods 里面的 这个 api
     之后的分页 按钮 每回传过来的是 页码 index
    */
const apiGetBlogLimit = async(start = 1) => {
    let path = configPathFromBack.getBlogLimit;
    try {
        let data = await request_get(path, start)
        var real_data = data.data
        return real_data;
    } catch (error) {
        return net_err
    }

}

const apiGetBlogDetail = async(index) => {
    var path = configPathFromBack.getBlogLimitByIndex;
    try {
        // var data = await axios.get(baseUrl + path + index);
        let data = await request_get(path, index)
        var real_data = data.data
        return real_data;
    } catch (error) {
        return net_err
    }
}

const apiGetBlogByTagName = async(tag) => {
    var path = configPathFromBack.getBlogByTagName;
    try {
        // var data = await axios.get(baseUrl + path + tag);
        let data = await request_get(path, tag)
        log('tag data', data)
        var real_data = data.data
        return real_data;
    } catch {
        return net_err
    }
}


export default {
    apiGetBlogLimit,
    apiGetBlogDetail,
    apiGetBlogByTagName,
}