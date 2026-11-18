// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed === true)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => attempt.passed === false)
  }

  return attempts
}

function renderAttempts(attempts) {
  let html = ''

  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'

    html += `
          <li class="result-item">
            <span class="result-name">${escapeHtml(attempt.name)}</span>
            <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%) — ${status}</span>
          </li>`
  })

  document.querySelector('#result-list').innerHTML = html

  const total = window.reportData.attempts.length
  document.querySelector('#result-count').textContent =
    `Показано: ${attempts.length} из ${total}`
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  const count = document.querySelector('#result-count')
  const list = document.querySelector('#result-list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const filter = select.value
    const attempts = selectAttempts(filter)

    renderAttempts(attempts)

    count.textContent = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
    list.innerHTML = list.innerHTML
  })
}

startFilter()
