import { addBtn, addDiv } from './helpers'
import { IDataAccess } from './storage'

export function debugTools(access: IDataAccess) {
  const div = addDiv(undefined, 'debug')
  const clear = addBtn(div, 'clear')
  clear.addEventListener('click', () => {
    access.data.log = []
    access.unsavedData = true
  })
}

export default debugTools
