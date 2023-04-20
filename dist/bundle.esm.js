async function helloWorld(name) {
    console.log(`Running helloWorld in a ${'BUNDLE'} module`);
    const text = `Hello ${name}!`;
    if (text === `Hello ${name}!`) {
        {
            console.log(`Browser says "${text}"`);
        }
    }
    else {
        console.log('This is not going to be printed');
    }
    return text;
}

var helloWorld$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    helloWorld: helloWorld
});

async function sayHello() {
    const helloWorld = (await Promise.resolve().then(function () { return helloWorld$1; })).helloWorld;
    await helloWorld('hello');
}

export { sayHello as default, helloWorld };
