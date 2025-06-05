export * from './response'


export type NotEmptyStr<T extends string> = T extends "" ? never : T

export type Replace<Str extends string> = Str extends `${infer BH}-${infer AH}`
  ? `${Capitalize<BH>} ${Replace<Capitalize<AH>>}`
  : Str extends `${infer BU}_${infer AU}`
  ? `${BU} ${Replace<Capitalize<AU>>}`
  : Str


  export type CamelCase<S extends string> =
  S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;
