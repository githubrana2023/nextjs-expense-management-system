export * from './response'


export type NotEmptyStr<T extends string> = T extends "" ? never : T

export type Replace<Str extends string> = Str extends `${infer BH}-${infer AH}`
  ? `${Capitalize<BH>} ${Replace<Capitalize<AH>>}`
  : Str extends `${infer BU}_${infer AU}`
  ? `${BU} ${Replace<Capitalize<AU>>}`
  : Str