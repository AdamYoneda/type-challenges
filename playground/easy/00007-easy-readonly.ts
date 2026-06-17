/*
  7 - Readonly
  -------
  by Anthony Fu (@antfu) #easy #built-in #readonly #object-keys

  ### Question

  Implement the built-in `Readonly<T>` generic without using it.

  Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

  For example:

  ```ts
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```

  > View on GitHub: https://tsch.js.org/7
*/

/* _____________ Your Code Here _____________ */

type MyReadonly<T> = { readonly [P in keyof T]: T[P]}
// type MyReadonly<T> = { +readonly [P in keyof T]: T[P]} // +, - mapping modifier（明示的に付ける | 外す）
// type MyReadonly<T> = readonly {[P in keyof T]: T[P]} // 'readonly' type modifier is only permitted on array and tuple literal types.
// type MyReadonly<T> = {[P in keyof T]: readonly T[P]} // 'readonly' type modifier is only permitted on array and tuple literal types.

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7/answer
  > View solutions: https://tsch.js.org/7/solutions
  > More Challenges: https://tsch.js.org
*/


// readonly operator
// https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly
// `readonly`は使える箇所が文脈によって異なる
/*
  ---
  readonly が使える場所は3つ

  1. オブジェクト型のプロパティ修飾子

  { readonly [P in keyof T]: T[P] }  // OK（34行目）

  readonly を 個々のプロパティの前 に付ける。これが Mapped Type で使う正しい位置。

  2. 配列・タプルのリテラル型

  readonly string[]        // OK → ReadonlyArray<string>
  readonly [string, number] // OK → readonly タプル

  エラーメッセージの「only permitted on array and tuple literal types」はこちらを指している。

  3. クラスのプロパティ宣言

  class Foo {
    readonly name: string  // OK
  }

  ---
*/