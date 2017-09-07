'use strict';

const ProxyAll = require('../proxy-all.min.js');
const assert = require('assert');
const _ = require('lodash');

describe('ProxyAll', () => {
    const sdk = new ProxyAll;
    describe('#instance', () => {
        describe('Initial', () => {
            it('let sdk = new ProxyAll;', () => {
                assert.doesNotThrow(() => {
                    let sdk = new ProxyAll;
                });
            });
        });
        describe('Access', () => {
            it('sdk.api.www.github.com;', () => {
                assert.doesNotThrow(() => {
                    sdk.api.www.github.com;
                });
            });
            it(`sdk.table.user.name = 'lixinliang';`, () => {
                assert.doesNotThrow(() => {
                    sdk.table.user.name = 'lixinliang';
                });
            });
            const keys = _.map(Array.apply(null, { length : 10 }), () => (~~(Math.random() * 255)).toString(16));
            it(`sdk${ _.map(keys, ( key ) => `['${ `0${ key }`.slice(-2) }']`).join('') };`, () => {
                assert.doesNotThrow(() => {
                    let prev = sdk;
                    _.forEach(keys, ( value ) => {
                        prev = prev[value];
                    });
                });
            });
        });
        describe('Invoke', () => {
            it(`sdk.say('i')('like')('currify')('!');`, () => {
                assert.doesNotThrow(() => {
                    sdk.say('i')('like')('currify')('!');
                });
            });
            const keys = Array.apply(null, { length : 10 });
            it(`sdk.test${ _.map(keys, ( key ) => `()`).join('') };`, () => {
                assert.doesNotThrow(() => {
                    let prev = sdk.test;
                    _.forEach(keys, ( value ) => {
                        prev = prev();
                    });
                });
            });
        });
        describe('Chaining', () => {
            it(`sdk.query('#app').addClass('active').on(() => {});`, () => {
                assert.doesNotThrow(() => {
                    sdk.query('#app').addClass('active').on(() => {});
                });
            });
            const keys = _.map(Array.apply(null, { length : 10 }), () => (~~(Math.random() * 255)).toString(16));
            it(`sdk${ _.map(keys, ( key ) => `['${ `0${ key }`.slice(-2) }']()`).join('') };`, () => {
                assert.doesNotThrow(() => {
                    let prev = sdk;
                    _.forEach(keys, ( value ) => {
                        prev = prev[value]();
                    });
                });
            });
        });
        describe('Types', () => {
            it(`typeof sdk === 'object';`, () => {
                assert(typeof sdk === 'object');
            });
            it(`sdk instanceof Object === true;`, () => {
                assert(sdk instanceof Object === true);
            });
            it(`Object.prototype.toString.call(sdk) === '[object Object];`, () => {
                assert(Object.prototype.toString.call(sdk) === '[object Object]');
            });
        });
    });
    // TODO: describe #listen and handler and freeze test
    // TODO: describe #error
});
