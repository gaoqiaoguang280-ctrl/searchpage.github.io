// ノイズ
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

// タイプライター
function typeText(el, text, speed = 26) {
  return new Promise((resolve) => {
    let i = 0;
    const t = setInterval(() => {
      el.textContent += text[i++] || "";
      if (i >= text.length) {
        clearInterval(t);
        resolve();
      }
    }, speed);
  });
}

(async () => {
  await typeText(type1, "Route corrupted… Verifying.");
  await new Promise(r => setTimeout(r, 400));
  await typeText(type2, "Log: Passed through an unknown relay node.");
  await new Promise(r => setTimeout(r, 350));
  await typeText(type3, "Warning: Access denied.");
})();

// SHA-256
async function sha256Hex(message) {
  const msgUint8 = new TextEncoder().encode(message.trim().normalize("NFKC"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}


const ANSWER_HASH = "fb7b7029d7bdee148b02abab6ff9f8d83d01058da533f9bedf2a2c5b161349ee";　

// DOM
const keyInput = document.getElementById("keyInput");
const btnCheck = document.getElementById("btnCheck");
const keyMsg = document.getElementById("keyMsg");
const linkBox = document.getElementById("linkBox");

// 判定
async function verifyKey() {
  const raw = keyInput.value ?? "";
  if (!raw.trim()) {
    keyMsg.textContent = "key required.";
    keyMsg.className = "passMsg ng";
    return;
  }

  const hashed = await sha256Hex(raw);

  if (hashed === ANSWER_HASH) {
  keyMsg.textContent = "access granted.";
  keyMsg.className = "passMsg ok";

  const res = await fetch("./secret.json");
  const data = await res.json();

  noteLink.href = data.url;
  noteLink.textContent = data.url;

  linkBox.hidden = false;
}else {
    keyMsg.textContent = "invalid key.";
    keyMsg.className = "passMsg ng";
  }
}

btnCheck.addEventListener("click", verifyKey);
keyInput.addEventListener("keydown", e => {
  if (e.key === "Enter") verifyKey();
});

// ゆらし
const panel = document.querySelector(".panel");
setInterval(() => {
  if (Math.random() < 0.18) {
    panel.animate(
      [
        { transform: "translate(0,0)" },
        { transform: "translate(1px,-1px)" },
        { transform: "translate(-1px,1px)" },
        { transform: "translate(0,0)" },
      ],
      { duration: 180 }
    );
  }
}, 700);
