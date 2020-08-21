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

function measureText (text, fontSize=50) {
  // wx canvas 未实现measureText方法, 此处自行实现
  text = String(text);
  var text = text.split('');
  var width = 0;
  text.forEach(function(item) {
      if (/[a-zA-Z]/.test(item)) {
          width += 7;
      } else if (/[0-9]/.test(item)) {
          width += 5.5;
      } else if (/\./.test(item)) {
          width += 2.7;
      } else if (/-/.test(item)) {
          width += 3.25;
      } else if (/[\u4e00-\u9fa5]/.test(item)) {
          width += 10;
      } else if (/\(|\)/.test(item)) {
          width += 3.73;
      } else if (/\s/.test(item)) {
          width += 2.5;
      } else if (/%/.test(item)) {
          width += 8;
      } else {
          width += 10;
      }
  });
  return width * fontSize / 10;
}

module.exports = {
  formatTime: formatTime,
  formatYMD: formatYMD,
  formatYM: formatYM,
  measureText:measureText
}