function usuarioTemQuiz () {
    // Essa função está incompleta, precisamos poder criar quizz para completá-la
    const temQuiz = true;
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
        <input type="button" value="Prosseguir pra criar níveis" class="prosseguir" onclick="checkContent()"/>
    </div>`;

    for (let i = 0; i < numeroPerguntas; i++) {
        meio += `
        <div class="pergunta">
            <h3>Pergunta ${i + 1} <ion-icon name="create-outline" onclick="mostra(this)"></ion-icon></h3>
            <div class="wrapper hidden">
                <input type="text" placeholder="Texto da pergunta" name="pergunta"/>
                <input type="text" placeholder="Cor de fundo da pergunta" name="cor-da-pergunta"/>
                <div class="sep"></div>
                <h3>Resposta correta</h3>
                <input type="text" placeholder="Resposta correta" name="resposta"/>
                <input type="text" placeholder="URL da imagem" name="url-resposta"/>
                <div class="sep"></div>
                <h3>Respostas incorretas</h3>
                <input type="text" placeholder="Resposta incorreta 1" name="resposta-errada1"/>
                <input type="text" placeholder="URL da imagem 1" name="url-resposta-errada1"/>
                <div class="sep"></div>
                <input type="text" placeholder="Resposta incorreta 2" name="resposta-errada2"/>
                <input type="text" placeholder="URL da imagem 2" name="url-resposta-errada2"/>
                <div class="sep"></div>
                <input type="text" placeholder="Resposta incorreta 3" name="resposta-errada3"/>
                <input type="text" placeholder="URL da imagem 3" name="url-resposta-errada3"/>
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
    icone.classList.add("hidden");
    const pergunta = icone.parentNode.parentNode
    pergunta.querySelector(".wrapper").classList.remove("hidden");
    mostrando = pergunta;
}

function esconde(pergunta) {
    pergunta.querySelector("h3 ion-icon").classList.remove("hidden");
    pergunta.querySelector(".wrapper").classList.add("hidden");
}

function checkContent() {
    const perguntas = document.querySelectorAll(".pergunta");
    
    perguntas.map(pergunta => {
        const inputs = pergunta.querySelectorAll("input");
        inputs.map(input => {
            switch (input.name) {
                case "pergunta":
                    if (input.value.length < 20) {
                        alert("Pergunta deve ter mais de 20 caracteres.")
                    }
                    break;
                case "cor-da-pergunta":
                    const hex = /#[0-9A-Fa-f]{6}/g;
                    if (!hex.test(input.value)) {
                        alert("Cor de fundo deve ser uma cor em hexadecimal válida");
                    }
                    break;
            }
        })
    })
}

const conteudoMutavel = document.querySelector(".container");
let mostrando;
// mock para numero de perguntas
let numeroPerguntas = 5;

mostrarTelaInicial();
