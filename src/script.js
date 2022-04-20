function usuarioTemQuiz () {
    // Essa função está incompleta, precisamos poder criar quizz para completá-la
    const temQuiz = false;
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
    conteudoMutavel.innerHTML = "";
    // Essa função está incompleta, precisamos poder criar quizz para completá-la
}


function listarQuizes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promise.then(putQuizes);
}

function putQuizes(quiz) {
    let quizDosOutros = document.querySelector(".quiz-cards");
    quizDosOutros.innerHTML = ""
    for (let i = 0; i < quiz.data.length; i++) {
        const htmlQuizz = `
        <div class="quiz-card" onclick="showQuiz()">
            <p>
            ${quiz.data[i].title}
            </p>
        </div>
        `
        console.log(quiz.data[i].image)
        quizDosOutros.innerHTML += htmlQuizz
    }
    // put the background image
    let Allquizes = document.querySelectorAll(".quiz-card")
    for (let i = 0; i < Allquizes.length; i++) {
        Allquizes[i].style.backgroundImage = `${backgroundGradient}, url("${quiz.data[i].image}")`
    }
}

function showQuiz() {
    document.querySelector(".quizes").classList.add("none")
    // add the quizz information
}

const conteudoMutavel = document.querySelector(".container");
const backgroundGradient = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)"
mostrarTelaInicial();
