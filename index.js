'use strict';

/**
 * Save each $listener with $instance
 * @type {Map<$instance: $listener>} map
 */
const map = new Map;

/**
 * Noop
 */
const noop = () => {};

/**
 * Invoke method safely
 * @param {Function} method
 * @param {Arguments} args
 */
const safe = ( method, ...args ) => {
    try {
        method.apply(null, args);
    } catch (err) {
        ProxyAll.error({ err, args });
    }
};

/**
 * Return an instance of ProxyAll
 * @param {Function} $listener
 * @return {Proxy} $instance
 */
function ProxyAll ( $listener = noop ) {

    const handler = {
        /**
         * [get description]
         * @param  {[type]} target [description]
         * @param  {[type]} key    [description]
         * @return {[type]}        [description]
         */
        get ( target, key ) {
            const type = 'getter';
            safe(map.get($instance), { type, key });
            return ProxyFunction(key);
        },
        /**
         * [set description]
         * @param {[type]} target   [description]
         * @param {[type]} key      [description]
         * @param {[type]} receiver [description]
         */
        set ( target, key, receiver ) {
            const type = 'setter';
            safe(map.get($instance), { type, key, receiver });
            return receiver;
        },
    };

    /**
     * [ProxyFunction description]
     * @param {[type]} key [description]
     */
    const ProxyFunction = ( key ) =>
        new Proxy(
            function ( ...args ) {
                const self = this;
                const type = 'caller';
                safe(map.get($instance), { type, key, self, args });
                return ProxyFunction(key);
            },
            handler,
        )
    ;

    const $instance = new Proxy({}, handler);

    ProxyAll.listen($instance, $listener);

    return $instance;
}

/**
 * [listen description]
 * @param  {[type]} $instance [description]
 * @param  {[type]} $listener [description]
 * @return {[type]}           [description]
 */
ProxyAll.listen = function listen ( $instance, $listener ) {
    map.set($instance, $listener);
};

/**
 * [error description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
ProxyAll.error = function error ({ err }) {
    console.error(err);
};

export default ProxyAll;
