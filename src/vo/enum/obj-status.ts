export enum ObjStatus {
    NoValue = 0, // 无状态，非法值
    Invalid = 1, // 无效状态
    Valid = 2,   // 有效状态
}

export const statusIsInvalid = (i: ObjStatus) => i === ObjStatus.Invalid
export const statusIsValid = (i: ObjStatus) => i === ObjStatus.Valid
export const statusIsNotValid = (i: ObjStatus) => !statusIsValid(i)
