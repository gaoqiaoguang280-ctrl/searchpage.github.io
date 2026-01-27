//ノイズ

const canvas = document.getElementById("noise");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
  canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
}
window.addEventListener("resize", resize);
resize();

function drawNoise() {
  const w = canvas.width, h = canvas.height;
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  // 軽量ノイズ
  for (let i = 0; i < data.length; i += 16) {
    const v = (Math.random() * 255) | 0;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 35; 
  }
  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(drawNoise);
}
drawNoise();


  //タイプライター演出
  function typeText(el, text, speed = 26) {
  return new Promise((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i] ?? "";
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

const t1 = document.getElementById("type1");
const t2 = document.getElementById("type2");
const t3 = document.getElementById("type3");

(async () => {
  await typeText(t1, "ルートが破損しています…確認中", 28);
  await new Promise(r => setTimeout(r, 400));
  await typeText(t2, "ログ: 不明な中継点を経由しました", 22);
  await new Promise(r => setTimeout(r, 350));
  await typeText(t3, "警告: 監視対象フラグが立っています", 22);
})();

//ボタン
const btnBack = document.getElementById("btnBack");
const btnReveal = document.getElementById("btnReveal");
const linkBox = document.getElementById("linkBox");

btnBack.addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = "./index.html"; 
});

btnReveal.addEventListener("click", async () => {
  btnReveal.disabled = true;
  btnReveal.textContent = "解放中…";

  await new Promise(r => setTimeout(r, 700));

  // リンク表示
  linkBox.hidden = false;

  btnReveal.textContent = "解放済み";
});

//ゆらし

const panel = document.querySelector(".panel");
setInterval(() => {
  const n = Math.random();
  if (n < 0.18) {
    panel.animate(
      [
        { transform: "translate(0,0)" },
        { transform: "translate(1px,-1px)" },
        { transform: "translate(-1px,1px)" },
        { transform: "translate(0,0)" },
      ],
      { duration: 180, iterations: 1 }
    );
  }
}, 700);

