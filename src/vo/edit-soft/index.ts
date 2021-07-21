import { ObjStatus } from '/@/vo/enum/obj-status'

export type EditSoftEntity = {
    id?: string,
    name: string,
    img: string,
    path: string,
    sortNum: number,
    status: ObjStatus,
}
