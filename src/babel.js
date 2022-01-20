async function start() {
    return await Promise.resolve('async is working')
}

start().then(console.log)

const unused2 = 42;

class Util {
    static id = Date.now();
}

console.log('Util.id: ', Util.id)