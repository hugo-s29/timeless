import { initTime } from './time'
import { accessData, initSaveIndicator } from './storage'
import { initCurrentTask, initButtons } from './task'
import { wait } from './helpers'
import { initBarChart, initPieChart } from './charts'

import debugTools from './debug'

import 'normalize.css'

async function main() {
  const access = accessData()
  const updateTime = initTime()
  const updateCurrentTask = initCurrentTask(access)
  const updateButtons = initButtons(access)
  const updateSaveIndicator = initSaveIndicator(access)
  const updateBarChart = initBarChart(access)
  const updatePieChart = initPieChart(access)
  debugTools(access)
  access.forceSaveData()

  await wait(1)

  document.body.classList.add('loaded')

  function update() {
    updateCurrentTask()
    updateTime()
    updateButtons()
    updateSaveIndicator()
    updateBarChart()
    updatePieChart()

    requestAnimationFrame(update)
    access.saveData()
  }

  //@ts-ignore
  window.access = access

  requestAnimationFrame(update)
}

addEventListener('load', main)
