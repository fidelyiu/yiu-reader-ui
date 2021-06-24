import { LayoutType } from '/@/vo/enum/layout-type'
import { ObjStatus } from '/@/vo/enum/obj-status'

export type LayoutEntity = {
    id?: string,
    type: LayoutType,
    status: ObjStatus,
    width: number,
    height: number,
    left: number,
    top: number,
    setting: any,
    updateTime: any,
}
