// 定义格式化时间的函数
function dataFormat(dateStr) {
  const dt = new Date(dateStr);

  const y = addZero(dt.getFullYear());
  const mm = addZero(dt.getMonth() + 1);
  const dd = addZero(dt.getDate());

  const hh = addZero(dt.getHours());
  const mmh = addZero(dt.getMinutes());
  const ss = addZero(dt.getSeconds());
  return `${y}-${mm}-${dd}-${hh}-${mmh}-${ss}`;
}
// 补零
function addZero(n) {
  return n > 9 ? n : "0" + n;
}
module.exports = {
  dataFormat,
};
