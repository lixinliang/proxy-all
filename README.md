[![npm](https://img.shields.io/npm/l/proxy-all.svg)](https://www.npmjs.org/package/proxy-all)
[![npm](https://img.shields.io/npm/v/proxy-all.svg)](https://www.npmjs.org/package/proxy-all)
[![npm](https://img.shields.io/npm/dm/proxy-all.svg)](https://www.npmjs.org/package/proxy-all)
[![Travis CI](https://img.shields.io/travis/lixinliang/proxy-all.svg)](https://travis-ci.org/lixinliang/muse-vue)
[![Twitter](https://img.shields.io/badge/twitter-@qq393464140-blue.svg)](http://twitter.com/qq393464140)

# proxy-all
> Proxy all properties as anonymous function, including the properties and return value of this function.

## Getting started

```
$ npm install --save proxy-all
```

[→ online playground](https://fiddle.jshell.net/lixinliang/zkjvLqnb/)

## Usage

```js
import ProxyAll from 'proxy-all';

const sdk = new ProxyAll;
```

* What ever you type, always will work without error.
* No more to do any fallback in different environment.

```js
import ProxyAll from 'proxy-all';

window.sdk = window.sdk || new ProxyAll;

sdk.component.confirm();

sdk.widget.create('loading').show();
```

### Access unlimitedly

```js
sdk.api.www.github.com;

sdk.table.user.name = 'lixinliang';
```

### Invoke unlimitedly

```js
sdk.say('i')('like')('currify')('!');
```

### Chaining unlimitedly

```js
sdk.query('#app').addClass('active').on(() => {});
```

### Proxy handler

* Your fallback code could be written in handler.

```js
ProxyAll.listen(sdk, ({ type, key, receiver, self, args }) => {

    // getter
    // setter
    // caller

    if (type == 'getter') {
        return 'this is the correct value.';
    }
});
```

## License

MIT
