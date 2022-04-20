function usuarioTemQuiz () {
    // Essa função está incompleta, precisamos poder criar quizz para completá-la
    const temQuiz = false;
    if (temQuiz) {
        return true;
    }

    return false;
}

function listarQuizes(div) {
    // função incompleta
    div.querySelector(".quiz-cards");
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

const conteudoMutavel = document.querySelector(".container");
mostrarTelaInicial();
