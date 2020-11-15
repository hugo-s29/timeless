import { IStoredData } from './types'

export const STORAGE_NAME = 'timeless'

export const defaultStoredData: IStoredData = {
  log: [],
  taskLabels: ['Work', 'Study', 'Sleep', 'Relax', 'Sport'],
}

export const getRawData = () => localStorage.getItem(STORAGE_NAME)

export const getData = () => unsetPropertiesToDefault(JSON.parse(getRawData()), defaultStoredData)

const unsetPropertiesToDefault = <ObjectType extends {}>(data: Partial<ObjectType>, def: ObjectType) => {
  const d: ObjectType = def

  if (data === null || data === undefined) data = {}

  for (const key of Object.keys(data)) {
    d[key] = data[key]
  }

  return d
}

export const storeData = (data: IStoredData) => localStorage.setItem(STORAGE_NAME, JSON.stringify(data))
