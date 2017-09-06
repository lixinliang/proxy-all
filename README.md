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
