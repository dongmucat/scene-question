//声明端口号
const post = 9090;
const http = require('http');
const url = require('url');
http.createServer((req, res) => {
    if (req.url.includes('/api')) {
        //获取数据
        let data = ['js', 'php'];
        //解析url
        let myurl = url.parse(req.url, true);
        //获取参数
        let params = new URLSearchParams(myurl.query);
        //获取函数
        let mathodName = params.get('callback');
        //返回给前端调用函数
        res.end(`${mathodName}(${JSON.stringify(data)})`)
    }
})
.listen(post, () => {
    console.log("Server running at http://127.0.0.1:" + post + "/");
})
