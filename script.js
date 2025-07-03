function calcularMedia() {
    const quantidadeStr = prompt("Olá! Informe quantos números deseja calcular a média:");
    const quantidade = parseInt(quantidadeStr);
    let total = 0;

    for (let i = 0; i < quantidade; i++) {
        const numeroStr = prompt(`Digite o número ${i + 1}:`);
        const numero = parseInt(numeroStr);
        total += numero;
    }

    const resultado = total / quantidade;
    console.log("Resultado da média:", resultado);
}

function formularioValores() {
    const container = document.getElementById("conteudo");
    const campos = Array.from({ length: 5 }, (_, idx) => `
        <input type="text" id="entrada${idx + 1}" placeholder="Valor ${idx + 1}" required><br>
    `).join('');

    container.innerHTML = `
        <form id="dadosForm">
            ${campos}
            <button type="submit">Salvar</button>
        </form>
    `;

    const form = document.getElementById("dadosForm");

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const entradas = [];
        for (let j = 1; j <= 5; j++) {
            const valorCampo = document.getElementById(`entrada${j}`).value.trim();
            if (!valorCampo) {
                alert(`O campo Valor ${j} está vazio.`);
                return;
            }
            entradas.push(valorCampo);
        }

        const textoArquivo = entradas.map((val, idx) => `Valor ${idx + 1}: ${val}`).join('\n');
        const arquivo = new Blob([textoArquivo], { type: "text/plain;charset=utf-8" });

        const linkDownload = document.createElement("a");
        linkDownload.href = URL.createObjectURL(arquivo);
        linkDownload.download = "valores.txt";
        linkDownload.click();
    });
}

function jogoNumeroSecreto() {
    document.getElementById("conteudo").innerHTML = `
        <h2>Jogo do Número Secreto</h2>
        <p></p>
        <input type="number" min="1" max="10" />
        <button onclick="validarPalpite()">Chutar</button>
        <button id="btnReiniciar" onclick="iniciarNovoJogo()" disabled>Reiniciar</button>
    `;

    window.historicoNumeros = [];
    window.limiteNumero = 10;
    window.alvo = gerarNumero();
    window.contadorTentativas = 1;

    mostrarMensagemInicial();
}

function atualizarTexto(tag, conteudo) {
    const elemento = document.querySelector(tag);
    elemento.innerHTML = conteudo;
}

function mostrarMensagemInicial() {
    atualizarTexto("p", "Escolha um número entre 1 e 10");
}

function validarPalpite() {
    const palpite = document.querySelector("input").value;
    if (parseInt(palpite) === alvo) {
        atualizarTexto("h2", "Acertou!");
        const plural = contadorTentativas > 1 ? "tentativas" : "tentativa";
        atualizarTexto("p", `Você acertou em ${contadorTentativas} ${plural}!`);
        document.getElementById("btnReiniciar").disabled = false;
    } else {
        const dica = palpite > alvo ? "menor" : "maior";
        atualizarTexto("p", `O número secreto é ${dica}`);
        contadorTentativas++;
        document.querySelector("input").value = '';
    }
}

function gerarNumero() {
    const novoNumero = Math.floor(Math.random() * limiteNumero) + 1;

    if (historicoNumeros.length === limiteNumero) {
        historicoNumeros = [];
    }

    if (historicoNumeros.includes(novoNumero)) {
        return gerarNumero();
    }

    historicoNumeros.push(novoNumero);
    return novoNumero;
}

function iniciarNovoJogo() {
    alvo = gerarNumero();
    contadorTentativas = 1;
    mostrarMensagemInicial();
    document.querySelector("input").value = '';
    document.getElementById("btnReiniciar").disabled = true;
}
