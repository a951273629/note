let good = document.querySelector("#good");
console.log(good);
setInterval(() => {
  let now = parseInt(new Date().getTime());
  console.log("时间:", now);
  if (now % 2 === 0) {
    good.innerHTML = "大帅哥";
  } else {
    good.innerHTML = "小帅哥";
  }
}, 500);
