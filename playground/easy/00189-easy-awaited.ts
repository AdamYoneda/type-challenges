/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is a wrapped type like Promise, how can we get the type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

/*
NOTE
簡潔に言うと：

  - Promise → then と catch の両方を持つ（JavaScript の Promise そのもの）
  - PromiseLike → then だけを持つ（より広いインターフェース）

  PromiseLike は「thenable」を表現するための型で、then メソッドさえあればマッチします。line 34 のテストケース T がまさにそれで、catch は無いが then を持つオブジェクトです。

  制約に Promise ではなく PromiseLike を使うことで、この T のようなthenable も受け入れられるようになっています。
*/
// 再帰的に
type MyAwaited<T> =
  T extends PromiseLike<infer P> ? (P extends PromiseLike<unknown> ? MyAwaited<P> : P) : never;

  // NOTE: PromiseLike<unknown> だとargを満たせないパターンがある（line56）

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
