import { format, addDiv } from './helpers'

export function initTime() {
  const div = addDiv(undefined, 'time')
  let last = ''

  function updateTime() {
    const d = new Date()
    const hour = format(d.getHours(), 2)
    const min = format(d.getMinutes(), 2)
    const newValue = `${hour}:${min}`
    if (last !== newValue) div.innerText = last = newValue
  }

  updateTime()

  return updateTime
}
