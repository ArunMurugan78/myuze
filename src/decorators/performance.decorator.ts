/* eslint @typescript-eslint/no-explicit-any: 0 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const LogPerformance = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): any => {
  if (process.env.REACT_APP_ENV !== 'dev') return;

  const original = descriptor.value;
  if (typeof original === 'function') {
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function fn(...args: any[]): any {
      const start = performance.now();
      const result = original.apply(this, args);

      const log = () => {
        console.log('[', (this as any).name, ']', performance.now() - start, 'ms  ', original.name, ' to finish', args);
      };

      if (result instanceof Promise) {
        return result.then((val) => {
          log();
          return val;
        });
      }

      log();
      return result;
    };
  }
};
