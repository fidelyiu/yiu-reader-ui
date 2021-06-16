import { ObjStatus } from '/@/vo/enum/obj-status'

export type WorkspaceEntity = {
    id: string,
    name: string,
    path: string,
    readonly sortNum: number,
    status: ObjStatus,
}
