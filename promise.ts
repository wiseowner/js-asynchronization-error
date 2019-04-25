const p1 = new Promise((reslove, reject) => {
  if(1) {
    reject('p1 error');
  }
});
p1.catch((msg) => console.log(msg));

const p2 = new Promise((reslove, reject) => {
  if(1) {
    throw new Error('p2 error')
  }
});

p2.catch((e) => console.log(e.message));



function main1() {
  try {
    new Promise(() => {
      throw new Error('promise1 error')
    }).catch((e) => {

    });
  } catch(e) {
    console.log(e.message);
  }
}

function main2() {
  try {
    Promise.reject('promise2 error').catch();
  } catch(e) {
    console.log(e.message);
  }
}

const p3 = () =>  new Promise((reslove, reject) => {
  setTimeout(() => {
    reject('async error');
  })
});

function main3() {
  p3().catch(e => console.log(e));
}

// main3();


Promise.resolve(1).then(function (value) {
  new Promise((reslove, reject) => {
    reject('123');
  }).catch(e => { console.log(e)});
}, function (err) {
  console.log(err, 'err');
});
