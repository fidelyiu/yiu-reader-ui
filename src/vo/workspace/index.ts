import { ObjStatus } from '/@/vo/enum/obj-status'

export type WorkspaceEntity = {
    id: string,
    name: string,
    path: string,
    sortNum: number,
    status: ObjStatus,
}
