# lazy-factory
Simply utility function to provide lazy evaluation of a value thought a factory function.

It uses an [self-overwriting getter](https://www.merrickchristensen.com/articles/lazy-evaluation-in-javascript/) that ensures that the factory function provided is not kept in memory
(it is picked up by the garbage collector if it is no longer referenced), thus cleaning up any variables enclosed by it.

Example:

```ts

function foo(){

// A havy memory-usage object we don't want to keep in memory;
const bar = Array.from({ length: 10**10 }, () => Math.floor(Math.random() * 40))

// A time-wasting operation we want to run only when needed that has a closure over the object.
const factory = () => bar.map(x => "foo-" + x);

return lazy(factory)
}

const lazyBar = foo();

// The factory is invoked.
const val = lazyBar.value;

// The 'factory' and 'bar' constants can be cleaned-up by the GC.

// The factory is not invoked again.
const val2 = lazyBar.value;

```
