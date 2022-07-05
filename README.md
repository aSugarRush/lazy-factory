# lazy-factory
Utility for lazy evaluation through factory functions.

[Self-overwriting getters](https://www.merrickchristensen.com/articles/lazy-evaluation-in-javascript/) automatically free up factory functions (along with their variables) when it is no longer needed.

Example:

```ts

function foo(){

// A heavy object we don't want to keep in memory;
const bar = Array.from({ length: 10**10 }, () => Math.floor(Math.random() * 40))

// A time-wasting operation we want to run only when needed and that has a closure over the object.
const factory = () => bar.map(x => "foo-" + x);

return lazy(factory)
}

const lazyBar = foo();

// Invoking the factory
const val = lazyBar.value;

// The 'factory' and 'bar' constants can be cleaned-up by the GC.

// The factory is not invoked again.
const val2 = lazyBar.value;

```
