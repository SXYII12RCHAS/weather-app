import './style.css'
import { getWeather } from './weather'
import { ICON_MAP } from './iconMap'

navigator.geolocation.getCurrentPosition(function (position) {
  const { latitude, longitude } = position.coords
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  getWeather(latitude, longitude, timezone).then(renderWeather).catch(console.error)
}, function (error) {
  console.log(error)
  getWeather(11, 50, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(console.error)
})

function renderWeather ({ current, daily, hourly })
{
  renderCurrentWeather(current)
  renderDailyWeather(daily)
  renderHourlyWeather(hourly)
  document.body.classList.remove('blurred')
}

function setValue(selector,value, {parent = document} = {}){
  parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
  return ICON_MAP.get(iconCode)
}

const currentIcon = document.getElementById('sun')

function renderCurrentWeather (current)
{
  currentIcon.src = getIconUrl(current.iconCode)
  setValue('current-temp',current.currentTemp)
  setValue('current-high',current.highTemp)
  setValue('current-low',current.lowTemp)
  setValue('current-fl-high',current.highFeelsLike)
  setValue('current-fl-low',current.lowFeelsLike)
  setValue('current-wind',current.windSpeed)
  setValue('current-precip',current.precip)
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
})

function renderDailyWeather (daily)
{
  const dayCardTemplate = document.getElementById('day-card-template')
  daily.forEach(daily => {
    const dayCard = dayCardTemplate.content.cloneNode(true)
    dayCard.querySelector('[data-icon]').src = getIconUrl(daily.iconCode)
    dayCard.querySelector('[data-day]').textContent = DAY_FORMATTER.format(new Date(daily.timestamp))
    dayCard.querySelector('[data-temp]').textContent = daily.maxTemp
    document.querySelector('[data-day-section ]').appendChild(dayCard)
  })
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
})

function renderHourlyWeather (hourly)
{
  const hourRowTemplate = document.getElementById('hour-row-template')
  hourly.forEach(hour => {
    const hourRow = hourRowTemplate.content.cloneNode(true)
    hourRow.querySelector('[data-day]').textContent = HOUR_FORMATTER.format(new Date(hour.timestamp))
    hourRow.querySelector('[data-icon]').src = getIconUrl(hour.iconCode)
    hourRow.querySelector('[data-temp]').textContent = hour.temp
    hourRow.querySelector('[data-fl-temp]').textContent = hour.feelsLike
    hourRow.querySelector('[data-wind]').textContent = hour.windSpeed
    hourRow.querySelector('[data-precip]').textContent = hour.precip
    document.querySelector('[data-hour-section]').appendChild(hourRow)
  })
}

const themeToggle = document.getElementById('theme')
const theme = localStorage.getItem('theme')
if (theme === 'dark') {
  themeToggle.checked = true
}
themeToggle.addEventListener('change', function () {
  storeTheme(themeToggle.checked ? 'dark' : 'light')
})
const storeTheme = function (theme) {
  localStorage.setItem('theme', theme)
}
