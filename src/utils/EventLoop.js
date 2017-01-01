import Queue from 'utils/Queue.js';

class EventLoopTask{
    constructor(run, checkValid = null, invalidCallback = null){
        if(checkValid == null){
            checkValid = () => true;
        }
        if(invalidCallback == null){
            invalidCallback = () => {};
        }
        this.run = run;
        this.checkValid = checkValid;
        this.invalidCallback = invalidCallback;
    }
};

class EventLoop{
    constructor(updateFunc = null){
        this.tasks = new Queue();
        this.enabled = false;
        this.updateFunc = updateFunc;
        this.loopFunc = () => {
            if(!this.enabled) return;
            if(this.updateFunc != null){
                this.updateFunc();
            }
            while(!this.tasks.isEmpty()){
                const task = this.tasks.pop();
                if(task.checkValid()){
                    task.run();
                    break;
                }
            }
            window.requestAnimationFrame(this.loopFunc);
        };
    }
    start(){
        this.enabled = true;
        if(this.loop == null){
            window.requestAnimationFrame(this.loopFunc);
        }
    }
    stop(){
        this.enabled = false;
    }
    addTask(callback, checkValid = null, invalidCallback = null){
        this.tasks.push(
            new EventLoopTask(callback, checkValid, invalidCallback)
        );
    }
};

module.exports = EventLoop;
