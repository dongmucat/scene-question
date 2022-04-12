const express = require('express');
const cors = require('cors');
const app = express();
const port = 9091;
//允许所有源访问
app.use(
    cors({
        origin:'*',
        methods:['GET','POST'],//允许正常使用的方法
    })
)
app.get('/', (req, res) => {
    const data = ['js', 'cors'];
    res.send(data)
})

app.listen(port, () => {
  console.log("Server running at http://127.0.0.1:" + port + "/")
})