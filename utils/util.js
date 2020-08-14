const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//当flag=1的时候返回 "2020-07-31"的形式 当flag=0返回 "2020" "07" "30"
const formatYMD = (date, flag) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  if (flag) return [year, month, day].map(formatNumber).join('-')
  else return [year, month, day].map(formatNumber)
}
const formatYM = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return [year, month].map(formatNumber)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatYMD: formatYMD,
  formatYM: formatYM
}