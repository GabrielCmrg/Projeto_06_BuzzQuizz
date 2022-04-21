function usuarioTemQuiz() {
    // Essa função está incompleta, precisamos poder criar quizz para completá-la
    const temQuiz = true;
    if (temQuiz) {
        return true;
    }

    return false;
}

function mostrarTelaInicial() {
    conteudoMutavel.innerHTML = `
    <div class="quizes">
        <div class="quizes-do-usuario"></div>
        <div class="todos-quizes">
            <div class="titulo">Todos os Quizzes</div>
            <div class="quiz-cards"></div>
        </div>
    </div>`;
    const quizesDoUsuario = document.querySelector(".quizes-do-usuario");
    const todosQuizes = document.querySelector(".todos-quizes");

    if (usuarioTemQuiz()) {
        mostrarBotaoPequeno(quizesDoUsuario);
        listarQuizes(quizesDoUsuario);
    } else {
        mostrarBotaoCriarQuiz(quizesDoUsuario);
    }

    listarQuizes(todosQuizes);
}

function mostrarBotaoCriarQuiz(quizesDoUsuario) {
    quizesDoUsuario.classList.add("sem-quiz");
    quizesDoUsuario.innerHTML = `
    <span class="texto-sem-quiz">Você não criou nenhum<br/>quizz ainda :(</span>
    <input type="button" value="Criar Quizz" class="criar-quiz" onclick="mostrarTelaCriacaoQuiz()"/>`;
}

function mostrarBotaoPequeno(quizesDoUsuario) {
    quizesDoUsuario.classList.remove("sem-quiz");
    quizesDoUsuario.innerHTML = `
    <div class="titulo">Seus Quizzes <ion-icon name="add-circle" onclick="mostrarTelaCriacaoQuiz()"></ion-icon></div>
    <div class="quiz-cards"></div>`;
}

function mostrarTelaCriacaoQuiz() {
    conteudoMutavel.innerHTML = `
    <div class="informacoes-basicas">
    <h3>Comece pelo começo</h3>
    <div class="informacoes-basicas-form">
        <input type="text" placeholder="Título do seu quizz" name="titulo-quiz"
            onchange="checkContentInformacoesBasicas(this)" />
        <div class="incorreto quiz-title none">
            <h6>
                Título do quizz incorreto, coloque algo entre 20 e 65 caracteres.
            </h6>
        </div>
        <input type="text" placeholder="URL da imagem do seu quizz" name="url-imagem"
            onchange="checkContentInformacoesBasicas(this)" />
        <div class="incorreto quiz-url none">
            <h6>
                URL da imagem não encontrada.
            </h6>
        </div>
        <input type="text" placeholder="Quantidade de perguntas do quizz" name="qtd-perguntas"
            onchange="checkContentInformacoesBasicas(this)" />
        <div class="incorreto quiz-qtdpergunta none">
            <h6 class="numbererror none">
                Quantidade de perguntas insuficientes. É necessário pelo menos 3.
            </h6>
            <h6 class="texterror none">
                Por favor, digite um número.
            </h6>
        </div>
        <input type="text" placeholder="Quantidade de níveis do quizz" name="qtd-niveis"
            onchange="checkContentInformacoesBasicas(this)" />
        <div class="incorreto quiz-nivel none">
            <h6 class="numbererror none">
                Quantidade de Níveis insuficientes. É necessário pelo menos 2.
            </h6>
            <h6 class="texterror none">
                Por favor, digite um número.
            </h6>
        </div>
    </div>
    <input type="button" value="Prosseguir pra criar perguntas" class="prosseguir"
        onclick="prosseguirParaPerguntas()" />
    </div>
    `;
}

function mostrarTelaCriacaoPerguntas() {
    const inicio = `
    <div class="criacao-perguntas">
        <h2>Crie suas perguntas</h2>`;

    let meio = ``;

    const fim = `
        <input type="button" value="Prosseguir pra criar níveis" class="prosseguir" />
    </div>`;

    for (let i = 0; i < numeroPerguntas; i++) {
        meio += `
        <div class="pergunta">
            <h3>Pergunta ${i + 1} <ion-icon name="create-outline" onclick="mostra(this)"></ion-icon></h3>
            <div class="wrapper none">
                <input type="text" onchange="checkContent(this)" placeholder="Texto da pergunta" name="pergunta"/>
                <input type="text" onchange="checkContent(this)" placeholder="Cor de fundo da pergunta" name="cor-da-pergunta"/>
                <div class="sep"></div>
                <h3>Resposta correta</h3>
                <input type="text" onchange="checkContent(this)" placeholder="Resposta correta" name="resposta"/>
                <input type="text" onchange="checkContent(this)" placeholder="URL da imagem" name="url-resposta"/>
                <div class="sep"></div>
                <h3>Respostas incorretas</h3>
                <input type="text" onchange="checkContent(this)" placeholder="Resposta incorreta 1" name="resposta-errada"/>
                <input type="text" onchange="checkContent(this)" placeholder="URL da imagem 1" name="url-resposta-errada"/>
                <div class="sep"></div>
                <input type="text" onchange="checkContent(this)" placeholder="Resposta incorreta 2" name="resposta-errada"/>
                <input type="text" onchange="checkContent(this)" placeholder="URL da imagem 2" name="url-resposta-errada"/>
                <div class="sep"></div>
                <input type="text" onchange="checkContent(this)" placeholder="Resposta incorreta 3" name="resposta-errada"/>
                <input type="text" onchange="checkContent(this)" placeholder="URL da imagem 3" name="url-resposta-errada"/>
            </div>
        </div>`;
    }

    conteudoMutavel.innerHTML = inicio + meio + fim;

    mostra(document.querySelector(".pergunta ion-icon"));
}

function mostra(icone) {
    if (mostrando !== undefined) {
        esconde(mostrando);
    }
    icone.classList.add("none");
    const pergunta = icone.parentNode.parentNode
    pergunta.querySelector(".wrapper").classList.remove("none");
    mostrando = pergunta;
}

function esconde(pergunta) {
    pergunta.querySelector("h3 ion-icon").classList.remove("none");
    pergunta.querySelector(".wrapper").classList.add("none");
}

function checkContent(input) {
    const url = /^(https|http):\/\/.*\.(png|jpeg|jpg|svg)/g;
    switch (input.name) {
        case "pergunta":
            if (input.value.length < 20) {
                alert("Pergunta deve ter mais de 20 caracteres.")
            }
            break;
        case "cor-da-pergunta":
            const hex = /^#[0-9A-Fa-f]{6}$/g;
            if (!hex.test(input.value) || input.value === "") {
                alert("Cor de fundo deve ser uma cor em hexadecimal válida");
            }
            break;
        case "resposta":
            if (input.value === "") {
                alert("Deve existir uma resposta correta.");
            }
            break;
        case "url-resposta":
            if (!url.test(input.value) || input.value === "") {
                alert("Deve ser um url válido");
            }
            break;
    }
}


function checkContentInformacoesBasicas(element) {
    const informacoes = document.querySelectorAll(".informacoes-basicas input")
    if (element.name === "titulo-quiz") {
        console.log(element.name)
        if (caracteresIncorretos()) {
            document.querySelector(".quiz-title").classList.remove("none")
            element.classList.add("background-error")
        } else {
            document.querySelector(".quiz-title").classList.add("none")
            element.classList.remove("background-error")
        }
    }
    if (element.name === "url-imagem") {
        if (urlInvalida()) {
            document.querySelector(".quiz-url").classList.remove("none")
            element.classList.add("background-error")

        } else {
            document.querySelector(".quiz-url").classList.add("none");
            element.classList.remove("background-error")
        }
    }
    if (element.name === "qtd-perguntas") {
        if (isNaN(element.value)) {
            document.querySelector(".quiz-qtdpergunta .numbererror").classList.add("none")
            document.querySelector(".quiz-qtdpergunta .texterror").classList.remove("none")
            element.classList.add("background-error")
            document.querySelector(".quiz-qtdpergunta").classList.remove("none")
        } else if (qtdPerguntasInsuficientes()) {
            document.querySelector(".quiz-qtdpergunta .numbererror").classList.remove("none")
            document.querySelector(".quiz-qtdpergunta .texterror").classList.add("none")
            element.classList.add("background-error")
            document.querySelector(".quiz-qtdpergunta").classList.remove("none")
        } else {
            document.querySelector(".quiz-qtdpergunta").classList.add("none")
            element.classList.remove("background-error")
        }
    }
    if (element.name === "qtd-niveis") {
        if (isNaN(element.value)) {
            document.querySelector(".quiz-nivel .numbererror").classList.add("none")
            document.querySelector(".quiz-nivel .texterror").classList.remove("none")
            element.classList.add("background-error")
            document.querySelector(".quiz-nivel").classList.remove("none")
        } else if (niveisInsuficientes()) {
            document.querySelector(".quiz-nivel .numbererror").classList.remove("none")
            document.querySelector(".quiz-nivel .texterror").classList.add("none")
            document.querySelector(".quiz-nivel").classList.remove("none")
            element.classList.add("background-error")
        } else {
            document.querySelector(".quiz-nivel").classList.add("none")
            element.classList.remove("background-error")
        }
    }
}

function caracteresIncorretos() {
    const informacoes = document.querySelectorAll(".informacoes-basicas input")
    if (informacoes[0].value.length < 20 || informacoes[0].value.length > 65) {
        return true;
    }
    return false;
}

function urlInvalida() {
    const informacoes = document.querySelectorAll(".informacoes-basicas input")
    const url = /^(https|http):\/\/.*\.(png|jpeg|jpg|svg)/g
    if (!url.test(informacoes[1].value)) {
        return true;
    }
    return false;
}

function qtdPerguntasInsuficientes() {
    const informacoes = document.querySelectorAll(".informacoes-basicas input")
    if (informacoes[2].value < 2) {
        return true;
    }
    return false;
}

function niveisInsuficientes() {
    const informacoes = document.querySelectorAll(".informacoes-basicas input")
    if (informacoes[3].value < 2) {
        return true;
    }
    return false;
}

function prosseguirParaPerguntas() {
    const incorretos = document.querySelectorAll(".incorreto")
    const inputs = document.querySelectorAll(".informacoes-basicas-form input")
    console.log(inputs)
    let haCampoIncorreto = []
    console.log(incorretos)
    for (let i = 0; i < incorretos.length; i++) {
        if (!incorretos[i].classList.contains("none") || inputs[i].value === "") {
            haCampoIncorreto.push("mais um");
        }
    }
    if (haCampoIncorreto.length !== 0) {
        alert("Preencha corretamente os campos")
    } else {
        mostrarTelaCriacaoPerguntas();
    }
}

function listarQuizes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promise.then(putQuizes);
}

function putQuizes(quiz) {
    let quizDosOutros = document.querySelector(".todos-quizes .quiz-cards");
    quizDosOutros.innerHTML = ""
    for (let i = 0; i < quiz.data.length; i++) {
        const htmlQuizz = `
        <div class="quiz-card" onclick="showQuiz()">
            <p>
            ${quiz.data[i].title}
            </p>
        </div>
        `;
        quizDosOutros.innerHTML += htmlQuizz
    }
    // put the background image
    let allQuizes = document.querySelectorAll(".todos-quizes .quiz-card")
    for (let i = 0; i < allQuizes.length; i++) {
        allQuizes[i].style.backgroundImage = `${backgroundGradient}, url("${quiz.data[i].image}")`
    }
}

function showQuiz() {
    document.querySelector(".quizes").classList.add("none")
    // add the quizz information
}

function reload() {
    window.location.reload()
}


const conteudoMutavel = document.querySelector(".container");
let mostrando;
// mock para numero de perguntas
let numeroPerguntas = 5;
const backgroundGradient = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)";
mostrarTelaInicial();
