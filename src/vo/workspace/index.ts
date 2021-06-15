import { ObjStatus } from '/@/vo/enum/obj-status'

export type workspaceEntity = {
    id: string,
    name: string,
    path: string,
    readonly sortNum: number,
    status: ObjStatus,
}
