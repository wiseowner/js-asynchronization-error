function main() {
  try {
    setTimeout(() => {
      throw new Error('async error')
    }, 1000)
  } catch(e) {
    console.log(e, 'err')
    console.log('continue...')
  }
}


main();
const promiseFetch = () => new Promise((reslove) => {
  reslove();
})

function main2() {
  try {
    promiseFetch().then(() => {
      throw new Error('err')
    })
  } catch(e) {
    console.log(e, 'eeee');
    console.log('continue');
  }
}

function main3() {
  promiseFetch().then(() => {
    return new Error('err');
  }).catch(e => {
    console.log(e, 'promise-catch: eee');
  })
}

function main4() {
  promiseFetch().then(() => {
    return new Error('err');
  }).then(e => {
    console.log(e, 'promise-then: eee');
  })
}


const fn = (cb: () => void) => {
  cb();
}
function main6() {

  try {
    fn(() => {
      throw new Error('123');
    })
  } catch(e) {
    console.log('error');
  }
}
main6();