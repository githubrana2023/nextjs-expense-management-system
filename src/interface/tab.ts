import { CamelCase } from "."



type Value = 'defaultActive' | 'queryString'
type ClientRole = 'family' | 'member'

export type TrxTabType = 'transaction' | 'trx-name'
export type TrxNameTabType = 'details' | 'update' | 'assign'
export type ShopkeeperTabType = 'details' | 'update' | 'assign'
export type BankTabType = 'details' | 'update'
export type LoanTabType = 'details' | 'update'


// 1. Centralized tab types
type TabTypes = {
  trx: TrxTabType
  'trx-name': TrxNameTabType
  shopkeeper: ShopkeeperTabType
  bank: BankTabType
  loan: LoanTabType
}

// 2. Helper to create tab map
type TabMap<
  Tabs extends string,
  Mode extends Value
> = Mode extends 'defaultActive'
  ? { [T in Tabs as CamelCase<T>]: T }
  : Mode extends 'queryString'
  ? { [T in Tabs as `${CamelCase<T>}Tab`]: `?tab=${T}` }
  : never

// 3. Final type
export type DefaultActiveTab = {
  [Role in ClientRole]: {
    [Nav in keyof TabTypes as CamelCase<Nav & string>]: {
      [V in Value as CamelCase<V>]: TabMap<TabTypes[Nav], V>
    }
  }
}




// type Value = 'defaultActive' | 'queryString'
// type ClientRole = 'family' | 'member'
// export type TrxTabType = 'transaction' | 'trx-name'
// export type TrxNameTabType = 'details' | 'update' | 'assign'
// export type ShopkeeperTabType = 'details' | 'update' | 'assign'
// export type BankTabType = 'details' | 'update'
// export type LoanTabType = 'details' | 'update'

// export type NavLabel = 'trx' | 'trx-name' | 'shopkeeper' | 'bank' | 'loan'

// export type DefaultActiveTab = Record<
//     ClientRole, {
//         [Nav in NavLabel as `${CamelCase<Nav>}`]: {
//             [V in Value as `${CamelCase<V>}`]:
//             Nav extends 'trx'
//             ? V extends 'defaultActive'
//             ? { [TrxTab in TrxTabType as `${CamelCase<TrxTab>}`]: TrxTab }
//             : V extends 'queryString'
//             ? { [TrxTab in TrxTabType as `${CamelCase<TrxTab>}Tab`]: `?tab=${TrxTab}` } : never
//             : Nav extends 'trx-name'
//             ? V extends 'defaultActive'
//             ? { [TrxNameTab in TrxNameTabType as `${CamelCase<TrxNameTab>}`]: TrxNameTab }
//             : V extends 'queryString'
//             ? { [TrxNameTab in TrxNameTabType as `${CamelCase<TrxNameTab>}Tab`]: `?tab=${TrxNameTab}` } : never
//             : Nav extends 'shopkeeper'
//             ? V extends 'defaultActive'
//             ? { [ShopkeeperTab in ShopkeeperTabType as `${CamelCase<ShopkeeperTab>}`]: ShopkeeperTab }
//             : V extends 'queryString'
//             ? { [ShopkeeperTab in ShopkeeperTabType as `${CamelCase<ShopkeeperTab>}Tab`]: `?tab=${ShopkeeperTab}` } : never
//             : Nav extends 'bank'
//             ? V extends 'defaultActive'
//             ? { [BankTab in BankTabType as `${CamelCase<BankTab>}`]: BankTab }
//             : V extends 'queryString'
//             ? { [BankTab in BankTabType as `${CamelCase<BankTab>}Tab`]: `?tab=${BankTab}` } : never
//             : Nav extends 'loan'
//             ? V extends 'defaultActive'
//             ? { [LoanTab in LoanTabType as `${CamelCase<LoanTab>}`]: LoanTab }
//             : V extends 'queryString'
//             ? { [LoanTab in LoanTabType as `${CamelCase<LoanTab>}Tab`]: `?tab=${LoanTab}` } : never
//             : never

//         } }
// >
