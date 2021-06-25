export enum LayoutType {
    Link = 1,
    Directory = 2,
    File = 3,
    Workspace = 4,
    MainBox = 5,
}

export const layoutTypeIsLink = (i: LayoutType) => i === LayoutType.Link
export const layoutTypeIsDirectory = (i: LayoutType) => i === LayoutType.Directory
export const layoutTypeIsFile = (i: LayoutType) => i === LayoutType.File
export const layoutTypeIsWorkspace = (i: LayoutType) => i === LayoutType.Workspace
export const layoutTypeIsMainBox = (i: LayoutType) => i === LayoutType.MainBox
