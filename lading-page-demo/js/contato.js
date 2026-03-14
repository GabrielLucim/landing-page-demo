// INICIALIZA EMAILJS

(function () {
    emailjs.init("SEU_PUBLIC_KEY");
})();


// ELEMENTOS DO FORMULÁRIO

const formulario = document.getElementById("conteiner-formulario");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const assunto = document.getElementById("assunto");
const mensagem = document.getElementById("mensagem");

const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const erroAssunto = document.getElementById("erro-assunto");
const erroMensagem = document.getElementById("erro-mensagem");


// FUNÇÕES DE VALIDAÇÃO

function validarNome() {

    if (nome.value.trim() === "") {
        erroNome.textContent = "Por favor, informe seu nome.";
        return false;
    }

    erroNome.textContent = "";
    return true;
}


function validarEmail() {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        erroEmail.textContent = "Por favor, informe seu e-mail.";
        return false;
    }

    if (!regex.test(email.value)) {
        erroEmail.textContent = "Digite um e-mail válido.";
        return false;
    }

    erroEmail.textContent = "";
    return true;
}


function validarAssunto() {

    if (assunto.value.trim() === "") {
        erroAssunto.textContent = "Informe o assunto da mensagem.";
        return false;
    }

    erroAssunto.textContent = "";
    return true;
}


function validarMensagem() {

    if (mensagem.value.trim() === "") {
        erroMensagem.textContent = "Escreva uma mensagem.";
        return false;
    }

    if (mensagem.value.length < 10) {
        erroMensagem.textContent = "A mensagem deve ter pelo menos 10 caracteres.";
        return false;
    }

    erroMensagem.textContent = "";
    return true;
}




// VALIDAÇÃO EM TEMPO REAL

nome.addEventListener("input", validarNome);
email.addEventListener("input", validarEmail);
assunto.addEventListener("input", validarAssunto);
mensagem.addEventListener("input", validarMensagem);



// ENVIO DO FORMULÁRIO

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const assuntoValido = validarAssunto();
    const mensagemValida = validarMensagem();


    if (!nomeValido || !emailValido || !assuntoValido || !mensagemValida) {
        return;
    }


    const botao = document.getElementById("formulario-botao");

    botao.disabled = true;
    botao.textContent = "Enviando...";


    emailjs.sendForm(
        "SEU_SERVICE_ID",
        "SEU_TEMPLATE_ID",
        "#conteiner-formulario"
    )

        .then(function () {

            alert("Mensagem enviada com sucesso!");

            formulario.reset();

            botao.disabled = false;
            botao.textContent = "Enviar Mensagem";

        })

        .catch(function (erro) {

            alert("Erro ao enviar mensagem. Tente novamente.");

            console.error("Erro EmailJS:", erro);

            botao.disabled = false;
            botao.textContent = "Enviar Mensagem";

        });

});