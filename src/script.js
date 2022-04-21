function usuarioTemQuiz () {
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

function mostrarBotaoPequeno (quizesDoUsuario) {
    quizesDoUsuario.classList.remove("sem-quiz");
    quizesDoUsuario.innerHTML = `
    <div class="titulo">Seus Quizzes <ion-icon name="add-circle" onclick="mostrarTelaCriacaoQuiz()"></ion-icon></div>
    <div class="quiz-cards"></div>`;
}

function mostrarTelaCriacaoQuiz () {
    conteudoMutavel.innerHTML = `
    <input type="button" value="Prosseguir pra criar perguntas" onclick="mostrarTelaCriacaoPerguntas()">`;
    // Essa função está incompleta, precisamos poder criar quizz para completá-la
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


const conteudoMutavel = document.querySelector(".container");
let mostrando;
// mock para numero de perguntas
let numeroPerguntas = 5;
const backgroundGradient = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)";
mostrarTelaInicial();
