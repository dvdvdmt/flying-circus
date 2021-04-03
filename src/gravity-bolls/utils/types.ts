export type OptionalProperties<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K
  }[keyof T],
  undefined
>

export type PickOptional<T extends object> = Required<
  Pick<T, OptionalProperties<T>>
>
