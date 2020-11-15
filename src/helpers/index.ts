export function format(n: number, count: number) {
  const str = n.toString()
  const digits = str.length

  if (digits >= count) return str

  const toAdd = count - digits

  const added = new Array(toAdd).fill('0').join('')
  return `${added}${n}`
}

export function wait(t: number) {
  return new Promise((res, rej) => {
    setTimeout(() => res(), t * 1000)
  })
}

export function addDiv(parent: HTMLElement = document.body, ...classes: string[]) {
  const div = document.createElement('div')
  parent.appendChild(div)

  div.classList.add(...classes)
  return div
}

export function addSpan(parent: HTMLElement = document.body, ...classes: string[]) {
  const span = document.createElement('span')
  parent.appendChild(span)

  span.classList.add(...classes)
  return span
}

export function addBtn(parent: HTMLElement = document.body, name: string, ...classes: string[]) {
  const btn = document.createElement('button')

  parent.appendChild(btn)

  btn.innerText = name

  btn.classList.add(...classes)
  return btn
}

export function formatDuration(ms: number) {
  return new Date(ms).toISOString().slice(11, -5)
}
