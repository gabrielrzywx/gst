const pass = document.getElementById("password");
const len = document.getElementById("length");
const lenValue = document.getElementById("lenValue");

const bar = document.getElementById("barFill");
const level = document.getElementById("level");
const time = document.getElementById("time");

len.addEventListener("input", () => {
  lenValue.textContent = len.value;
});

function generate() {
  const U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const L = "abcdefghijklmnopqrstuvwxyz";
  const N = "0123456789";
  const S = "!@#$%^&*()_+-=[]{}<>?";

  let chars = "";
  let p = "";

  if (document.getElementById("upper").checked) chars += U;
  if (document.getElementById("lower").checked) chars += L;
  if (document.getElementById("nums").checked) chars += N;
  if (document.getElementById("sym").checked) chars += S;

  if (!chars) return;

  for (let i = 0; i < len.value; i++) {
    p += chars[Math.floor(Math.random() * chars.length)];
  }

  pass.value = p;
  analyze(p);
}

function analyze(p) {
  let score = 0;

  score += p.length * 2;
  if (/[A-Z]/.test(p)) score += 10;
  if (/[a-z]/.test(p)) score += 10;
  if (/[0-9]/.test(p)) score += 15;
  if (/[^A-Za-z0-9]/.test(p)) score += 25;

  let color, text, t;

  if (score < 40) {
    color = "#ef4444";
    text = "Fraca";
    t = "segundos";
  } else if (score < 70) {
    color = "#f59e0b";
    text = "Média";
    t = "dias";
  } else if (score < 100) {
    color = "#22c55e";
    text = "Forte";
    t = "anos";
  } else {
    color = "#06b6d4";
    text = "Impenetrável";
    t = "milhões de anos";
  }

  bar.style.width = Math.min(score, 100) + "%";
  bar.style.background = color;

  level.textContent = "Força: " + text;
  time.textContent = "Quebra: " + t;
}

function copyPassword() {
  if (!pass.value) return;
  navigator.clipboard.writeText(pass.value);

  document.getElementById("msg").textContent =
    "✔ Copiado com sucesso!";
}