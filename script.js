/* ====== TEXTO QUE APARECE QUANDO ELA DIZ "SIM" (edite aqui) ====== */
const RESPOSTA = {
  titulo: "Meu pedido de namoro pra você",
  mensagem: "oe dressa, eu sei que a gente se conhece a um tempo e eu não consigo mais guardar oque eu sempre senti por você, Pra mim você é a pessoa mais importante da minha vida. Eu te quero, quero ter você só pra mim a minha vida toda, mesmo nos momentos dificeis seus e Tudo, independente de Qualquer coisa, nada vai separar ou oque eu sinto por você minha bonequinha. Eu espero no fundo do coração mesmo que você sinta o mesmo que eu sinto por você, Mas sempre saiba de que eu faria de tudo por você mesmo se a gente ainda fosse amigos, Eu quero você, Quero namorar com você choi, Eu te amo tanto que sinto vontade de chorar só de criar uma Situação na minha cabeça em que eu perco você, Então vose aceita namorar comigo?(Preciso que você responda isso pra mim okei)"
};

/* ====== Estrelinhas caindo ====== */
const ceu = document.getElementById("ceu");
const formas = ["✦", "★", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯"];
const cores = ["#ffb3cd", "#ff9fc0", "#ffc9dc", "#ffa8c8"];
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function criarEstrela() {
  const e = document.createElement("span");
  e.className = "estrela";
  e.textContent = formas[Math.floor(Math.random() * formas.length)];
  e.style.left = Math.random() * 100 + "vw";
  e.style.fontSize = 10 + Math.random() * 20 + "px";
  e.style.color = cores[Math.floor(Math.random() * cores.length)];
  e.style.setProperty("--balanco", (Math.random() * 60 - 30) + "px");
  const duracao = 6 + Math.random() * 6;
  e.style.animationDuration = duracao + "s";
  ceu.appendChild(e);
  setTimeout(() => e.remove(), duracao * 1000);
}

// No celular usamos menos estrelinhas para não pesar nem gastar bateria
const celular = window.matchMedia("(max-width: 600px)").matches;

if (!reduzirMovimento) {
  for (let i = 0; i < (celular ? 7 : 12); i++) setTimeout(criarEstrela, i * 300);
  setInterval(() => { if (!document.hidden) criarEstrela(); }, celular ? 750 : 450);
}

/* ====== Edição do texto ====== */
const titulo = document.getElementById("titulo");
const mensagem = document.getElementById("mensagem");
const btnEditar = document.getElementById("editar");
const editaveis = [titulo, mensagem];
const CHAVE = "pedido-namoro-v2";

// Carrega o texto salvo (se existir)
try {
  const salvo = JSON.parse(localStorage.getItem(CHAVE));
  if (salvo) {
    titulo.innerHTML = salvo.titulo;
    mensagem.innerHTML = salvo.mensagem;
  }
} catch (erro) { /* sem texto salvo, usa o padrão do HTML */ }

btnEditar.addEventListener("click", () => {
  const editando = document.body.classList.toggle("editando");
  editaveis.forEach(el => el.contentEditable = editando);
  btnEditar.textContent = editando ? "💾 Salvar texto" : "✏️ Editar texto";

  if (editando) {
    mensagem.focus();
  } else {
    try {
      localStorage.setItem(CHAVE, JSON.stringify({
        titulo: titulo.innerHTML,
        mensagem: mensagem.innerHTML
      }));
    } catch (erro) { /* navegador bloqueou o salvamento */ }
  }
});

/* ====== Botão "Não" que foge (mouse e toque) ====== */
const btnNao = document.getElementById("nao");
const btnSim = document.getElementById("sim");

function fugir() {
  const margem = 16;
  btnNao.style.position = "fixed";
  btnNao.style.zIndex = "4";

  const largura = btnNao.offsetWidth;
  const altura = btnNao.offsetHeight;
  const maxX = Math.max(margem, window.innerWidth - largura - margem);
  const maxY = Math.max(margem, window.innerHeight - altura - margem);
  const sim = btnSim.getBoundingClientRect();

  let x, y;
  for (let i = 0; i < 12; i++) {
    x = margem + Math.random() * (maxX - margem);
    y = margem + Math.random() * (maxY - margem);
    // evita cair em cima do botão "Sim"
    const encosta = x < sim.right + 12 && x + largura > sim.left - 12 &&
                    y < sim.bottom + 12 && y + altura > sim.top - 12;
    if (!encosta) break;
  }
  btnNao.style.left = x + "px";
  btnNao.style.top = y + "px";
}

btnNao.addEventListener("pointerenter", fugir);
btnNao.addEventListener("pointerdown", (ev) => { ev.preventDefault(); fugir(); });
btnNao.addEventListener("click", (ev) => { ev.preventDefault(); fugir(); });

// se girar a tela ou abrir o teclado, garante que o botão continue visível
window.addEventListener("resize", () => {
  if (btnNao.style.position !== "fixed") return;
  const r = btnNao.getBoundingClientRect();
  if (r.right > window.innerWidth || r.bottom > window.innerHeight) fugir();
});

/* ====== Botão "Sim" ====== */
btnSim.addEventListener("click", () => {
  document.getElementById("botoes").style.display = "none";
  btnNao.remove();
  btnEditar.remove();

  // Troca o ursinho pelo lírio-do-vale e inicia a animação
  document.querySelector(".ursinho").remove();
  const lirio = document.getElementById("lirio");
  lirio.hidden = false;
  lirio.classList.add("abrindo");

  titulo.innerHTML = RESPOSTA.titulo;
  mensagem.innerHTML = RESPOSTA.mensagem;

  const emojis = ["⋆˙⟡", "⋆˚࿔", "۶ৎ", ".✦", "𖦹", "✮"];
  const total = celular ? 24 : 40;
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const c = document.createElement("span");
      c.className = "coracao";
      c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      c.style.left = Math.random() * 100 + "vw";
      c.style.top = 60 + Math.random() * 40 + "vh";
      c.style.fontSize = 18 + Math.random() * 28 + "px";
      c.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 2300);
    }, i * 70);
  }
});
