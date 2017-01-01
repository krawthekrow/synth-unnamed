/*

With reference to Queue.js

A function to represent a queue

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

class Queue{
    constructor(){
        this.arr = [];
        this.offset = 0;
    }
    getLength(){
        return this.arr.length - this.offset;
    }
    isEmpty(){
        return this.arr.length == 0;
    }
    push(val){
        this.arr.push(val);
    }
    pop(){
        if(this.arr.length == 0){
            throw 'Cannot pop from empty queue.';
        }
        const res = this.arr[this.offset];
        this.offset++;
        if(this.offset * 2 >= this.arr.length){
            this.arr = this.arr.slice(this.offset);
            this.offset = 0;
        }
        return res;
    }
};

module.exports = Queue;
