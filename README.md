**ngClassCallback directive**

The expression passed to this directive is called each time ngClass fires an $animate event.

This directive exposes $animate event and phase to the expression's local scope via $event and $phase, in a similar fashion to directives like ngClick.

This directive can be used to perform an action after all of this element's animations/transitions complete. To do this, perform that action when the value of $phase is 'close' (see $animate, ngAnimate).

As of Angular 1.4.8, ngClass fires exactly one of the three class events (addClass, removeClass, setClass) for each class change. When the ngClass expression contains one class, either addClass or removeClass is fired; when the ngClass expression contains two or more classes, setClass is fired. Since only one event is fired at a time, we can listen for all three in parallel, and expect our callback to be called only once.

The callback of the setClass event graciously waits for all CSS transitions to finish! This is helpful when the element has animations/transitions with varying durations.

Warning: If there are more CSS transitions defined than are used, the animation callbacks seem to wait longer than the sum of all transition durations.

Warning: This directive could break if ngClass changes.

[Live demo](//gomoto.github.io/ngClassCallback).
