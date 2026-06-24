/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #easy #union #built-in

  ### Question

  Implement the built-in `Pick<T, K>` generic without using it.

  Constructs a type by picking the set of properties `K` from `T`

  For example:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/4
*/

/* _____________ Your Code Here _____________ */

type MyPick<T, K extends keyof T> = {[key in K]: T[key]}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,

  // extendsのジェネリクスが効いてる
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>, // invalid, compile error
  MyPick<Todo, 'title' | 'completed'>, // valid
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/


// description from opus4.6
// > https://github.com/type-challenges/type-challenges/issues/13427
/*
---
  keyof

  keyof T は、型 T のすべてのプロパティ名をユニオン型として取り出す演算子。

  keyof Todo  →  'title' | 'description' | 'completed'

  公式ドキュメント: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html

  ---
  extends（ジェネリクス制約）

  K extends keyof T は「K は keyof T の部分集合でなければならない」という制約。

  extends には複数の用法があるが、ここでは ジェネリクスの型パラメータに上限を設ける 用法。Todo に存在しないキー（例: 'invalid'）を渡すとコンパイルエラーになる。43行目の
  @ts-expect-error はまさにそれをテストしている。

  公式ドキュメント: https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints

  ---
  in（Mapped Types）

  [key in K] は Mapped Type の構文。K のユニオンの各メンバーを1つずつ key に束縛して、各プロパティを生成する。

  K = 'title' | 'completed' の場合、key が 'title' → 'completed' と順に回り、プロパティを1つずつ作る。JavaScript の for...in ループに近いイメージ。

  公式ドキュメント: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

  ---
  T[key]（Indexed Access Types）

  T[key] は、型 T のプロパティ key の型を取得する。

  Todo['title']      →  string
  Todo['completed']  →  boolean

  公式ドキュメント: https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

  ---
  全体の流れ

  MyPick<Todo, 'title' | 'completed'> を展開すると:

  1. K extends keyof T → 'title' | 'completed' は keyof Todo の部分集合か？ → OK
  2. {[key in K]: T[key]} → K の各メンバーでプロパティを生成:
    - key = 'title' → title: Todo['title'] → title: string
    - key = 'completed' → completed: Todo['completed'] → completed: boolean
  3. 結果: { title: string; completed: boolean } → Expected2 と一致

  これがコンパイルが通る理由です。
  */