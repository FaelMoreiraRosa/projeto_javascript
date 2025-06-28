document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  // Coletar valores
  const valores = [];
  for (let i = 1; i <= 5; i++) {
    const valor = document.getElementById(`valor${i}`).value.trim();
    if (valor === "") {
      alert(`O campo Valor ${i} está vazio.`);
      return;
    }
    valores.push(valor);
  }

  // Criar conteúdo do TXT
  const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");

  // Criar e baixar o arquivo TXT
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "valores.txt";
  link.click();
});
