class Scheduler {
    constructor(max) {
        // 最大可并发任务数
        this.max = max;
        // 当前并发任务数
        this.count = 0;
        // 任务队列
        this.queue = [];
    }

    add(fn){
        this.queue.push(fn);
        this.start();
    }

    start(){
        // 不合法直接返回(阻塞) 
        if (!this.queue.length || this.count >= this.max) {
            return;
        }
        // 当前任务数
        this.count++;
        // 取出第一个异步任务执行
        this.queue.shift()().then(()=>{
            this.count--;
            // 执行下一个异步任务
            this.start();
        });
    }
}

const sleep = time => new Promise(resovle => setTimeout(resovle,time));

const scheduler = new Scheduler(2);

const addTask = (time, val) => {
    scheduler.add(() => {
        return sleep(time).then(() => console.log(val));
    });
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');