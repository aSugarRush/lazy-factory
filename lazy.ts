export type Lazy<T> = { value: T };

/**
 * Initializes a new instance of {@link Lazy}. When lazy initialization occurs, the specified initialization function is used.
 * @param valueFactory The delegate that is invoked to produce the lazily initialized value when it is needed.
 * @returns A {@link Lazy}.
 */
 export function lazy<T>(valueFactory: () => T): Lazy<T> {
    return {
      // Using a lazy self-overwriting getter, this way it is ensured that the factory delegate is invoked once without further inner state and no closure is kept in memory (garbage colelctor can clean up any heavy obejct enclosed in the factory).
      get value() {
        // @ts-ignore
        delete this.value;
        return (this.value = valueFactory());
      },
    };
  }