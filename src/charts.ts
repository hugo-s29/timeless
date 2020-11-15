import { IDataAccess } from './storage'
import { addDiv } from './helpers'
import { getColor } from './task'
import { ITask } from './storage/types'

function defineAttributes<T extends HTMLElement>(elem: T, height: number, color: string) {
  elem.style.backgroundColor = color
  elem.style.height = `calc(50vh * ${height})`
  elem.classList.add('colored')
  return elem
}

function duration(t: ITask) {
  return (t.end || Date.now()) - t.start
}

export function initBarChart({ data }: IDataAccess) {
  const chart = addDiv(undefined, 'chart', 'bar-chart')
  const total = data.log.map((t) => duration(t)).reduce((v, acc) => v + acc, 0)
  const bars = data.log.map((task) => defineAttributes(addDiv(chart, 'bar-chart-element'), duration(task) / total, getColor(data.taskLabels.findIndex((l) => l === task.label))))

  function updateChart() {
    const total = data.log.map((t) => duration(t)).reduce((v, acc) => v + acc, 0)
    if (data.log.length > bars.length) {
      const log = data.log[data.log.length - 1]
      bars.push(defineAttributes(addDiv(chart, 'bar-chart-element'), ((log.end || Date.now()) - log.start) / total, getColor(data.taskLabels.findIndex((l) => l === log.label))))
    }
    data.log.forEach((task, i) => bars[i] && (bars[i].style.height = `calc(50vh * ${duration(task) / total})`))
  }

  updateChart()

  return updateChart
}

export function initPieChart({ data }: IDataAccess) {
  function sumUpData() {
    const values: Record<string, number> = {}
    for (const task of data.log) {
      if (!values[task.label]) values[task.label] = duration(task)
      else values[task.label] += duration(task)
    }
    return values
  }

  const values = sumUpData()
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '-200 -200 400 400')
  document.body.appendChild(svg)
  const total = Object.values(values).reduce((v, acc) => v + acc, 0)
  const circles = Object.keys(values).map((label, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const value = values[label]
    circle.setAttribute('r', '100')
    circle.setAttribute('cx', '0')
    circle.setAttribute('cy', '0')
    circle.classList.add('colored')
    svg.appendChild(circle)
    const totalLength = circle.getTotalLength()
    circle.style.strokeDasharray = totalLength.toString()
    circle.style.strokeDashoffset = (totalLength * (1 - value / total)).toString()
    const k = data.taskLabels.findIndex((l) => l === label)
    circle.style.stroke = getColor(k)
    return circle
  })

  let i = 0
  let offset = 0
  for (const circle of circles) {
    const label = Object.keys(values)[i]
    const value = values[label]
    const rotation = (offset / total) * 360
    offset += value
    circle.style.transform = `rotate(${rotation}deg)`
    i++
  }

  function updateChart() {
    const values = sumUpData()
    let offset = 0
    circles.forEach((circle, i) => {
      const label = Object.keys(values)[i]
      const value = values[label]
      const totalLength = circle.getTotalLength()
      circle.style.strokeDasharray = totalLength.toString()
      circle.style.strokeDashoffset = (totalLength * (1 - value / total)).toString()
      const rotation = (offset / total) * 360
      offset += value
      circle.style.transform = `rotate(${rotation}deg)`
    })
  }

  updateChart()
  return updateChart
}
