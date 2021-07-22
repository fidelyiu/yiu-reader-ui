import { ObjStatus } from '/@/vo/enum/obj-status'

export type NoteEntity = {
    id?: string,
    absPath: string,
    path: string,
    name: string,
    alias: string,
    sortNum: number,
    status: ObjStatus,
    workspaceId: string,
    parentId: string,
    parentAbsPath: string,
    parentPath: string,
    level: number,
    show: boolean,
    isDir: boolean,
    isDirStr: string,
}
