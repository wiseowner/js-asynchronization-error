const fetchSuccess = () => Promise.resolve(); // 伪代码，毕竟我们的 fetch 都是返回一个 Promise 对象

const fetchFailure = () => new Promise((resolve, reject) => {
  setTimeout(() => {// 模拟请求
    if(1) reject('fetch failure...');
  })
})

const handleTryCatch = (fn: (...args: any[]) => Promise<{}>) => async (...args: any[]) => {
  try {
    return [null, await fn(...args)];
  } catch(e) {
    console.log(e, 'e.messagee');
    return [e];
  }
}

async function main () {
  const [err, res] = await handleTryCatch(fetchFailure)('');
  if(err) {
    console.log(err, 'err');
    return;
  }
  console.log(res, 'res');
}

main();


function main1() {

}