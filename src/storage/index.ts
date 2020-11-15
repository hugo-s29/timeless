import { IStoredData } from './types'
import { getData, storeData } from './data'
import { addDiv } from '../helpers'

export function accessData() {
  const data = getData()

  return {
    forceSaveData() {
      this.unsavedData = true
      this.saveData()
    },
    saveData() {
      if (this.unsavedData) {
        storeData(data)

        this.unsavedData = false
      }
    },
    data,
    unsavedData: false,
  }
}

export function initSaveIndicator(data: IDataAccess) {
  const div = addDiv(undefined, 'save-indicator')

  function updateIndicator() {
    if (data.unsavedData && !div.classList.contains('unsaved')) {
      div.classList.remove('saved')
      div.classList.add('unsaved')
    }
    if (!data.unsavedData && !div.classList.contains('saved')) {
      div.classList.remove('unsaved')
      div.classList.add('saved')
    }
  }

  updateIndicator()

  return updateIndicator
}

export type IDataAccess = ReturnType<typeof accessData>
