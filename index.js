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
 * @param  {Function} $listener
 * @return {Proxy} $instance
 */
function ProxyAll ( $listener = noop ) {

    const handler = {
        /**
         * Handler of getter
         * @param  {String} key property name
         * @return {Proxy} anonymous proxy
         */
        get ( target, key ) {
            const type = 'getter';
            safe(map.get($instance), { type, key });
            return ProxyFunction(key);
        },
        /**
         * Handler of setter
         * @param  {String} key property name
         * @param  {Any} receiver rightt-hand side in assignment
         * @return {Any} receiver
         */
        set ( target, key, receiver ) {
            const type = 'setter';
            safe(map.get($instance), { type, key, receiver });
            return receiver;
        },
    };

    /**
     * Anonymous proxy factory
     * @param  {String} key property name
     * @return {Proxy} anonymous proxy
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
 * Setting $listener
 * @param {Proxy} $instance
 * @param {Function} $listener
 */
ProxyAll.listen = function listen ( $instance, $listener ) {
    map.set($instance, $listener);
};

/**
 * Setting error handler
 * @param {Object} err message
 */
ProxyAll.error = function error ({ err }) {
    console.error(err);
};

export default ProxyAll;
