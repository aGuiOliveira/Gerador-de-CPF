const geraCpfForm = document.querySelector("#gera-cpf-form");
if (geraCpfForm) {
  const gerarCpfBtn = document.querySelector("#gerar-cpf-btn");
  const campoCpf = document.querySelector("#cpf-gerado");
  const cpfPontuacao = document.querySelector("#CPF-pontuacao");
  const copiarBtn = document.querySelector("#copiar-cpf-btn");

  function gerarNovoCpf(event) {
    event.preventDefault();
    const num1 = aleatorio();
    const num2 = aleatorio();
    const num3 = aleatorio();

    const dig1 = dig(num1, num2, num3);
    const dig2 = dig(num1, num2, num3, dig1);

    if (cpfPontuacao.value === "true") {
      campoCpf.value = `${num1}.${num2}.${num3}-${dig1}${dig2}`;
    } else {
      campoCpf.value = `${num1}${num2}${num3}${dig1}${dig2}`;
    }
  }

  function dig(n1, n2, n3, n4) {
    const nums = n1.split("").concat(n2.split(""), n3.split(""));

    if (n4 !== undefined) {
      nums[9] = n4;
    }

    let x = 0;
    for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
      x += parseInt(nums[j]) * i;
    }

    const y = x % 11;
    return y < 2 ? 0 : 11 - y;
  }

  function aleatorio() {
    const aleat = Math.floor(Math.random() * 999);
    return ("" + aleat).padStart(3, "0");
  }

  function copiarTexto() {
    campoCpf.select();
    campoCpf.setSelectionRange(0, 99999);
    document.execCommand("copy");
    //navigator.clipboard.writeText(campoCpf.value);
    document.querySelector("#copiar-cpf-btn span").innerHTML = "Copiado";
    copiarBtn.classList.add("copiou");

    //Tempo para voltar o texto do botão para "copiar"
    let start = 0;
    let incremento = 1;
    const timer = setInterval(() => {
      start += incremento;
      if (start > 150) {
        document.querySelector("#copiar-cpf-btn span").innerHTML = "Copiar";
        copiarBtn.classList.remove("copiou");
        clearInterval(timer);
      }
    }, 1);
  }

  gerarCpfBtn.addEventListener("click", gerarNovoCpf);
  copiarBtn.addEventListener("click", copiarTexto);
}
