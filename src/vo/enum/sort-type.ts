export enum SortType {
    ASE = 0, // 升序
    DESC = 1, // 降序
}

export const sortTypeIsAse = (s: SortType) => s === SortType.ASE
export const sortTypeIsDesc = (s: SortType) => s === SortType.DESC
