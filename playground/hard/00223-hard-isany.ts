/*
  223 - IsAny
  -------
  by Pavel Glushkov (@pashutk) #hard #utils

  ### Question

  Sometimes it's useful to detect if you have a value with `any` type. This is especially helpful while working with third-party Typescript modules, which can export `any` values in the module API. It's also good to know about `any` when you're suppressing implicitAny checks.

  So, let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.

  > View on GitHub: https://tsch.js.org/223
*/

/* _____________ Your Code Here _____________ */

// type IsAny<T> = Equal<T, any>;

// type IsAny<T> = unknown extends T & never ? true : false;

// type a = IsAny<any>; // false
// type b = unknown extends any ? true : false; // true unknownが弱すぎるけどanyだから
// type c = unknown extends never ? true : false; // false 制約つよい <- ここで引っ掛かる
// type d = any extends never ? true : false; // boolean 制約つよいはず // any vs never 1/2
// type e = any extends unknown ? true : false; // true 制約よわい
// type f = never extends any ? true : false; // true any // never vs any 2/2

// type IsAny<T extends never> = T extends boolean ? true : false;

// https://zenn.dev/kakekakemiya/articles/6ea6b327aec9ea#223%3A-isany
type IsAny<T> = 0 extends 1 & T ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/223/answer
  > View solutions: https://tsch.js.org/223/solutions
  > More Challenges: https://tsch.js.org
*/
