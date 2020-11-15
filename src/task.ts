import { addDiv, addBtn, addSpan, formatDuration } from './helpers'
import { IDataAccess } from './storage'
import colors from './data/colors'

export function initCurrentTask(access: IDataAccess) {
  const div = addDiv(undefined, 'current-task')
  const labelSpan = addSpan(div, 'task-label')
  const durationSpan = addSpan(div, 'task-duration')
  let lastLabel = ''
  let lastDuration = ''

  function updateLabel() {
    const newValue = access.data.currentTask

    if (lastLabel !== newValue && newValue !== undefined) labelSpan.innerText = lastLabel = newValue
  }

  function updateDuration() {
    const start = access.data.startCurrentTask
    if (start) {
      const newValue = formatDuration(Date.now() - start)

      if (lastDuration !== newValue) {
        lastDuration = newValue
        durationSpan.innerText = newValue
      }
    }
  }

  function updateCurrentTask() {
    updateLabel()
    updateDuration()
  }

  updateCurrentTask()

  return updateCurrentTask
}

const colorOffset = Math.floor(Math.random() * Object.keys(colors).length)

export function getColor(i: number, v: number = 500) {
  const colorNames = Object.keys(colors)
  const index = (i + colorOffset) % colorNames.length
  const colorName = colorNames[index]

  return colors[colorName][v]
}

export function initButtons(access: IDataAccess) {
  const div = addDiv(undefined, 'buttons')

  const labels = access.data.taskLabels.concat('Stop')

  const buttons: HTMLButtonElement[] = labels.map((label) => addBtn(div, label, 'btn', 'colored'))

  buttons.forEach((btn, i) => {
    btn.style.background = getColor(i)
    btn.style.transitionDelay = `${(i / buttons.length) * 0.5}s`
  })

  buttons.forEach((btn, i) =>
    btn.addEventListener('click', () => {
      const label = labels[i]
      access.unsavedData = true

      if (label === 'Stop') {
        delete access.data.currentTask
        if (access.data.log.length > 0) access.data.log[access.data.log.length - 1].end = Date.now()
        access.data.startCurrentTask = undefined

        return
      }

      access.data.currentTask = label
      const now = Date.now()
      if (access.data.log.length > 0) access.data.log[access.data.log.length - 1].end = now
      access.data.log.push({ label, start: now })
      access.data.startCurrentTask = now
    })
  )

  function updateButtons() {
    buttons.forEach((btn, i) => updateButton(btn, i))
  }
  function updateButton(btn: HTMLButtonElement, i: number) {
    const label = access.data.taskLabels[i]
    const disabled = access.data.currentTask === label
    if (btn.disabled !== disabled) btn.disabled = disabled
  }

  updateButtons()

  return updateButtons
}
