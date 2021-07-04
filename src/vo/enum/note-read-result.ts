export enum NoteReadResult {
    Fail = 0,
    Start = 1,
    Import = 2,
    NotImport = 3,
}

export const noteReadResultIsFail = (i: NoteReadResult) => i === NoteReadResult.Fail
export const noteReadResultIsStart = (i: NoteReadResult) => i === NoteReadResult.Start
export const noteReadResultIsImport = (i: NoteReadResult) => i === NoteReadResult.Import
export const noteReadResultIsNotImport = (i: NoteReadResult) => i === NoteReadResult.NotImport
