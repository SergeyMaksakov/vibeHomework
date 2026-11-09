const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const selected = services.filter(function (service) {
    if (service.id === 'guide') return guideChecked
    if (service.id === 'audio') return audioChecked
    if (service.id === 'catalog') return catalogChecked
    return false
  })

  const items = selected.map(function (service) {
    const { title, price } = service
    return { title: title.trim(), price: price }
  })

  const total = items.reduce(function (sum, item) {
    return sum + item.price
  }, 0)

  return { count: items.length, total: total, items: items }
}

const eventTitle = document.querySelector('#event-title')
const showProgramBtn = document.querySelector('#show-program')
const programBlock = document.querySelector('#program')
const serviceForm = document.querySelector('#service-form')
const guideCheckbox = document.querySelector('#guide')
const audioCheckbox = document.querySelector('#audio')
const catalogCheckbox = document.querySelector('#catalog')
const choiceError = document.querySelector('#choice-error')
const dataError = document.querySelector('#data-error')
const resultBlock = document.querySelector('#result')
const reportJsonBlock = document.querySelector('#report-json')

let data = null

try {
  data = JSON.parse(sourceJson)
} catch (error) {
  dataError.hidden = false
  serviceForm.hidden = true
}

if (data) {
  showProgramBtn.addEventListener('click', function () {
    programBlock.innerHTML = data.event.meeting
    programBlock.hidden = false
  })

  serviceForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const report = buildReport(
      data.services,
      guideCheckbox.checked,
      audioCheckbox.checked,
      catalogCheckbox.checked,
    )

    if (report.count === 0) {
      choiceError.hidden = false
      resultBlock.hidden = true
      reportJsonBlock.hidden = true
      return
    }

    choiceError.hidden = true

    let html = 'Выбрано услуг: ' + report.count + '<br>'
    html += 'Итого: ' + report.total + ' руб.<br>'
    for (let i = 0; i < report.items.length; i++) {
      html += report.items[i].title + '<br>'
    }
    resultBlock.innerHTML = html
    resultBlock.hidden = false

    const jsonString = JSON.stringify(report)
    JSON.parse(jsonString)
    reportJsonBlock.textContent = jsonString
    reportJsonBlock.hidden = false
  })
}
