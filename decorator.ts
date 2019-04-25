// 定义各种各样的错误类型
class DbError extends Error {
  public errmsg: string;
  public errno: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.errmsg = msg || 'db_error_msg';
    this.errno = code || 20010;
  }
}
class ValidatedError extends Error {
  public errmsg: string;
  public errno: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.errmsg = msg || 'validated_error_msg';
    this.errno = code || 20010;
  }
}

// FETCH_ERROR
const errorHandle = (e: Error) => {
  // do something
  console.log(e, 'error');
  if(e instanceof ValidatedError || e instanceof DbError) {
    // do sth
    return e;
  }
  return {
    code: 101,
    errmsg: 'unKnown'
  };
}

const errorDecorator =
(handle: (e: Error) => void = errorHandle) =>
  (fn: (...args: any[]) => Promise<{}>) => 
    async(...args: any[]) => {
      try {
        console.log(...args, 'args');
        return [null, await fn(...args)];
      } catch(e) {
        return [handle(e)];
      }
    }


const fetchFail = () => {
  return Promise.reject('请求失败')
}

const asyncErrorWrapper = (errorHandler: (e: Error) => void = errorHandle) => (target: Function) => {
  const props = Object.getOwnPropertyNames(target.prototype);
  props.forEach((prop) => {
      var value = target.prototype[prop];
      if(Object.prototype.toString.call(value) === '[object AsyncFunction]'){
        target.prototype[prop] = async (...args: any[]) => {
          try{
            return await value.apply(this,args);
          }catch(err){
            return errorHandler(err);
          }
        }
      }
  });
}

const usualHandleTryCatch = errorDecorator(errorHandle);

async function main1 () {
  const a = usualHandleTryCatch(fetchFail)
  const [error, res] = await a(false);
  if(error) {
    // 因为 catch 已经做了拦截，甚至可以加入一些通用逻辑，这里甚至不用判断 if error
    console.log(error, 'error');
    return;
  }
  console.log(res, 'res');
}

@asyncErrorWrapper(errorHandle)
class Store {

  async getList (){
    return Promise.reject();
  }
}
const store = new Store();

async function main2() {
  // console.log(store.getList, 'st');
  const a = await store.getList();
  console.log(a, 'aa');
  // if(error) {
  //   // 因为 catch 已经做了拦截，甚至可以加入一些通用逻辑，这里甚至不用判断 if error
  //   console.log(error, 'error');
  //   return;
  // }
  // console.log(res, 'res');
}
main2()