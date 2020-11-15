export interface IStoredData {
  currentTask?: string
  log: ITask[]
  taskLabels: string[]
  startCurrentTask?: number
}

export interface ITask {
  label: string
  start: number
  end?: number
}
