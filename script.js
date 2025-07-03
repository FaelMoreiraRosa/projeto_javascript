function exemplo1(){

    let qtdNumeros_s =  prompt ("Seja bem vindo!, digite a quantidade de numeros que você deseja fazer a média : ");
    let qtdNumeros_i = parseInt(qtdNumeros_s);

    let soma = 0;

    for (let count = 0; count < qtdNumeros_i ; count++){
        let numeros_s = prompt("Digite aqui o numero :");
        let x1 = parseInt(numeros_s);
        soma += x1;
    }

    let media = soma / qtdNumeros_i;

    console.log("A média é : "+media);

}

function exemplo2(){

    document.getElementById('conteudo').innerHTML = `
    <form id="formulario">
      ${[1, 2, 3, 4, 5].map(i => `<input type="text" id="valor${i}" placeholder="Valor ${i}" required><br>`).join('')}
      <button type="submit">Salvar</button>
    </form>
  `;

    document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const valores = [];
  for (let i = 1; i <= 5; i++) {
    const valor = document.getElementById(`valor${i}`).value.trim();
    if (valor === "") {
      alert(`O campo Valor ${i} está vazio.`);
      return;
    }
    valores.push(valor);
  }

  const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");

  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "valores.txt";
  link.click();
});

}

function exemplo3(){
    document.getElementById('conteudo').innerHTML = `
    <h2>Jogo do Número Secreto</h2>
    <p></p>
    <input type="number" min="1" max="10" />
    <button onclick="verificarChute()">Chutar</button>
    <button id="reiniciar" onclick="reiniciarJogo()" disabled>Reiniciar</button>
  `;

window.listaDeNumerosSorteados = [];
  window.numeroLimite = 10;
  window.numeroSecreto = gerarNumeroAleatorio();
  window.tentativas = 1;

  exibirMensagemInicial();
}

function exibirTextoNaTela(tag, texto) {
  const campo = document.querySelector(tag);
  campo.innerHTML = texto;
}

function exibirMensagemInicial() {
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
  const chute = document.querySelector('input').value;
  if (chute == numeroSecreto) {
    exibirTextoNaTela('h2', 'Acertou!');
    const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    const mensagem = `Você descobriu o número com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagem);
    document.getElementById('reiniciar').disabled = false;
  } else {
    const dica = chute > numeroSecreto ? 'menor' : 'maior';
    exibirTextoNaTela('p', `O número secreto é ${dica}`);
    tentativas++;
    document.querySelector('input').value = '';
  }
}

function gerarNumeroAleatorio() {
  const numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  if (listaDeNumerosSorteados.length === numeroLimite) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  }
  listaDeNumerosSorteados.push(numeroEscolhido);
  return numeroEscolhido;
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  exibirMensagemInicial();
  document.querySelector('input').value = '';
  document.getElementById('reiniciar').disabled = true;
}