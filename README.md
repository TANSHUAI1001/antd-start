# 兼容

1. window.fetch polyfill: whatwg-fetch';
2. 'promise-polyfill/src/polyfill'; 
3. setImmediate

# 浏览器跨域问题

package.json 加上转发 "proxy":"http://localhost:8082/hello",
可参见
https://stackoverflow.com/questions/45696999/fetch-unexpected-end-of-input
https://developers.google.com/web/updates/2015/03/introduction-to-fetch#response_types
https://www.jianshu.com/p/070faf348a6a

# form表单提交

#Cookie设置问题
服务器返回的Response的Path与当前浏览器路径不一致时：
Chrome下fetch不会设置也不会带上。
Firefox会设置但下次请求不带上。

# 跨域问题
后端设置