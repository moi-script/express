

const VAL = 1000;



// setTimeout(() => console.log('Value after time :: ', VAL), 2000)


function print(val) {
    console.log('Value :: ', val)
}

function delay(cb) {
    return new Promise(res => setTimeout(() => res(cb), 5000))
}

const d = await delay(print);


d('Hello world');