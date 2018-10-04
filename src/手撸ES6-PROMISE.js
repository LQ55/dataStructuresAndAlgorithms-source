/**
 * 检查是是否为js函数
 * @param fn
 * @returns {boolean}
 */
var isFunction = (fn)=>{
    return Object.prototype.toString.call(fn) == "[object Function]";
}
/**
 * Promise类
 */
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class  LQPromise {
    constructor(handle){
        //检查promise构造函数接收的参数是否为一个函数
        if(!(isFunction(handle))){
            throw  new Error("LQPromise must accept a function as a parameter");
        }
        //添加状态
        this._status = PENDING;
        //添加值
        this._value = undefined;
        //添加成功回掉函数队列
        this._fulfilledQueues = [];
        //添加失败回掉函数队列
        this._rejectedQueues = [];
        //执行handle函数
        try{
            handle(this._resolve.bind(this),this._reject.bind(this));
        }catch(err){
            this._reject(err);
        }
    }
    /*
     * @param val
     * @private
     */
    _resolve(val){
        //检查promise的状态是否为pending，如果不为pending，直接返回，啥也不做
        if(this._status !== PENDING){
            return;
        }
        //否则就修改内部状态，状态从pending变为fulfilled
        this._status = FULFILLED;
        this._value = val;
    }
    /**
     * @param err
     * @private
     */
    _reject(err){
        if(this._status != PENDING){
            return;
        }
        this._status = REJECTED;
        this._value = err;
    }
    /**
     * PROMISE的then方法
     * @param onFulfilled
     * @param onRejected
     */
    then(onFulfilled,onRejected){
        const {_value,_status} = this;
        switch (_status){
            //当状态为pending时，将then方法回掉函数加入执行队列等待执行
            case PENDING:
                this._fulfilledQueues.push(onFulfilled);
                this._rejectedQueues.push(onRejected);
                break;
            //当状态已经改变的时候，立即执行对应的回掉函数
            case FULFILLED:
                onFulfilled(_value);
                break;
            case REJECTED:
                onRejected(_value);
                break;
        }
        //then方法返回一个新的promise对象
        return new LQPromise((onFulfilledNext,onRejectedNext)=>{
            //封装一个成功时执行的函数
            let fulfilled = value =>{
                try{
                    if(!isFunction(onFulfilled)){
                        onFulfilledNext(value);
                    }else{
                        let res = onFulfilled(value);
                        if(res instanceof LQPromise){
                            //如果当前回掉函数返回LQPromise对象，必须等待它的状态改变以后再执行下一个回掉函数
                            res.then(onFulfilledNext,onRejectedNext);
                        }else{
                            //否则会将返回结果直接作为参数，传入下一个then回掉函数，并立即执行then的回掉函数
                            onFulfilledNext(res);
                        }
                    }
                }catch(err){
                    //如果函数执行出错，新的promise对象的状态为失败
                    onRejectedNext(err);
                }
            }
        })
    }
}