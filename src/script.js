function usuarioTemQuiz() {
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
    <div class="criacao">
        <h2>Crie suas perguntas</h2>`;

    let meio = ``;

    const fim = `
        <input type="button" value="Prosseguir pra criar níveis" class="prosseguir" onclick="prosseguirParaNiveis()" />
    </div>`;

    for (let i = 0; i < basicInfos.numberOfQuestions; i++) {
        meio += `
        <div class="pergunta">
            <h3>Pergunta ${i + 1} <ion-icon name="create-outline" onclick="mostra(this)"></ion-icon></h3>
            <div class="wrapper none">
                <div>
                    <input type="text" onchange="checkForCharacters(this, 20)" placeholder="Texto da pergunta" />
                    <h6 class="incorreto question-text none">Pergunta deve ter mais de 20 caracteres.</h6>
                </div>
                <input type="text" onchange="checkForHex(this)" placeholder="Cor de fundo da pergunta" />
                <h6 class="incorreto question-color none">Cor de fundo deve ser uma cor em hexadecimal válida.</h6>
                <div class="sep"></div>
                <h3>Resposta correta</h3>
                <input type="text" onchange="checkForEmpty(this)" placeholder="Resposta correta" />
                <h6 class="incorreto answer none">Deve existir uma resposta correta.</h6>
                <input type="text" onchange="checkValidURL(this)" placeholder="URL da imagem" />
                <h6 class="incorreto answer-url none">Deve ser um url válido.</h6>
                <div class="sep"></div>
                <h3>Respostas incorretas</h3>
                <div>
                    <input type="text" onchange="checkWrongAnswers(this)" class="wrong" placeholder="Resposta incorreta 1" />
                    <h6 class="incorreto wrong-answer none">Deve existir ao menos uma resposta errada.</h6>
                </div>
                <div>
                    <input type="text" onchange="checkWrongURLs(this)" class="wrong-url" placeholder="URL da imagem 1" />
                    <h6 class="incorreto wrong-image none">Deve existir uma imagem para cada resposta.</h6>
                </div>
                <div class="sep"></div>
                <div>
                    <input type="text" onchange="checkWrongAnswers(this)" class="wrong" placeholder="Resposta incorreta 2" />
                    <h6 class="incorreto wrong-answer none">Deve existir ao menos uma resposta errada.</h6>
                </div>
                <div>
                    <input type="text" onchange="checkWrongURLs(this)" class="wrong-url" placeholder="URL da imagem 2" />
                    <h6 class="incorreto wrong-image none">Deve existir uma imagem para cada resposta.</h6>
                </div>
                <div class="sep"></div>
                <div>
                    <input type="text" onchange="checkWrongAnswers(this)" class="wrong" placeholder="Resposta incorreta 3" />
                    <h6 class="incorreto wrong-answer none">Deve existir ao menos uma resposta errada.</h6>
                </div>
                <div>
                    <input type="text" onchange="checkWrongURLs(this)" class="wrong-url" placeholder="URL da imagem 3" />
                    <h6 class="incorreto wrong-image none">Deve existir uma imagem para cada resposta.</h6>
                </div>
            </div>
        </div>`;
        questions.push({
            question: "", 
            color: "", 
            correctAnswer: "", 
            correctAnswerImage: "", 
            wrongAnswers: [], 
            wrongAnswersImages: [],
        })
    }

    conteudoMutavel.innerHTML = inicio + meio + fim;

    mostra(document.querySelector(".pergunta ion-icon"));
}

function showLevelScreen() {
    const inicio = `
    <div class="criacao">
        <h2>Crie suas perguntas</h2>`;

    let meio = ``;

    const fim = `
        <input type="button" value="Finalizar Quizz" class="prosseguir" onclick="prosseguirParaSucesso()" />
    </div>`;

    for (let i = 0; i < basicInfos.numberOfLevels; i++) {
        meio += `
        <div class="nivel">
            <h3>Nível ${i + 1} <ion-icon name="create-outline" onclick="mostra(this)"></ion-icon></h3>
            <div class="wrapper none">
                <div>
                    <input type="text" onchange="checkForCharacters(this, 10)" placeholder="Título do nível" />
                    <h6 class="incorreto none">Título deve ter mais de 10 caracteres.</h6>
                </div>
                <input type="text" onchange="checkPercentage(this)" placeholder="% de acerto mínima" class="percentage-input"/>
                <h6 class="incorreto percentage none">Porcentagem deve ser um valor inteiro de 0 a 100.</h6>
                <input type="text" onchange="checkValidURL(this)" placeholder="URL da imagem do nível" />
                <h6 class="incorreto answer-url none">Deve ser um url válido.</h6>
                <div>
                    <textarea onchange="checkForCharacters(this, 30)" placeholder="Descrição do nível"></textarea>
                    <h6 class="incorreto none">A descrição deve ter ao menos 30 caracteres.</h6>
                </div>
            </div>
        </div>`;
        levels.push({
            title: "", 
            percentage: "", 
            imageSrc: "", 
            description: "",
        })
    }

    conteudoMutavel.innerHTML = inicio + meio + fim;

    mostra(document.querySelector(".nivel ion-icon"));
}

function checkPercentage (input) {
    const number = parseInt(input.value);
    input.value = number;
    if (number < 0 || number > 100 || isNaN(number)) {
        input.parentNode.querySelector(".percentage").classList.remove("none");
        input.classList.add("background-error");
    } else {
        input.parentNode.querySelector(".percentage").classList.add("none");
        input.classList.remove("background-error");
    }
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

function checkForCharacters(input, size) {
    if (input.value.length < size) {
        input.parentNode.querySelector(".incorreto").classList.remove("none");
        input.classList.add("background-error");
    } else {
        input.parentNode.querySelector(".incorreto").classList.add("none");
        input.classList.remove("background-error");
    }
}

function checkForHex(input) {
    const hex = /^#[0-9A-Fa-f]{6}$/g;
    if (!hex.test(input.value)) {
        input.parentNode.querySelector(".question-color").classList.remove("none");
        input.classList.add("background-error");
    } else {
        input.parentNode.querySelector(".question-color").classList.add("none");
        input.classList.remove("background-error");
    }
}

function checkForEmpty(input) {
    if (input.value === "") {
        input.parentNode.querySelector(".answer").classList.remove("none");
        input.classList.add("background-error");
    } else {
        input.parentNode.querySelector(".answer").classList.add("none");
        input.classList.remove("background-error");
    }
}

function isValidURL(url) {
    const urlProtocol = /^(https|http):\/\/.*\.(png|jpeg|jpg|svg)/g;
    if (!urlProtocol.test(url)) {
        return false;
    }

    return true;
}

function checkValidURL(input) {
    if (!isValidURL(input.value)) {
        input.parentNode.querySelector(".answer-url").classList.remove("none");
        input.classList.add("background-error");
    } else {
        input.parentNode.querySelector(".answer-url").classList.add("none");
        input.classList.remove("background-error");
    }
}

function checkWrongAnswers(input) {
    const allWrongAnswers = input.parentNode.parentNode.querySelectorAll(".wrong");
    const allWrongURLs = input.parentNode.parentNode.querySelectorAll(".wrong-url");
    for (let i = 0; i < allWrongAnswers.length; i++) {
        if (allWrongAnswers[i].value !== "") {
            checkWrongURLs(allWrongURLs[i]);
            for (let j = 0; j < allWrongAnswers.length; j++) {
                allWrongAnswers[j].parentNode.querySelector(".wrong-answer").classList.add("none");
                allWrongAnswers[j].classList.remove("background-error");
            }
            return;
        }
    }
    input.parentNode.querySelector(".wrong-answer").classList.remove("none");
    input.classList.add("background-error");
}

function checkWrongURLs(input) {
    const allWrongAnswers = input.parentNode.parentNode.querySelectorAll(".wrong");
    const allWrongURLs = input.parentNode.parentNode.querySelectorAll(".wrong-url");
    for (let i = 0; i < allWrongURLs.length; i++) {
        if (allWrongAnswers[i].value !== "") {
            if (!isValidURL(allWrongURLs[i].value)) {
                allWrongURLs[i].parentNode.querySelector(".wrong-image").classList.remove("none");
                allWrongURLs[i].classList.add("background-error");
                return;
            } else {
                allWrongURLs[i].parentNode.querySelector(".wrong-image").classList.add("none");
                allWrongURLs[i].classList.remove("background-error");
            }
        } else {
            if (allWrongURLs[i].value !== "") {
                allWrongURLs[i].parentNode.querySelector(".wrong-image").classList.remove("none");
                allWrongURLs[i].classList.add("background-error");
                return;
            } else {
                allWrongURLs[i].parentNode.querySelector(".wrong-image").classList.add("none");
                allWrongURLs[i].classList.remove("background-error");
            }
        }
    }
}

function prosseguirParaNiveis() {
    const allQuestions = document.querySelectorAll(".pergunta");
    for (let i = 0; i < allQuestions.length; i++) {
        const inputs = allQuestions[i].querySelectorAll("input[type='text']");
        checkForCharacters(inputs[0], 20);
        questions[i].question = inputs[0].value;
        checkForHex(inputs[1]);
        questions[i].color = inputs[1].value;
        checkForEmpty(inputs[2]);
        questions[i].correctAnswer = inputs[2].value;
        checkValidURL(inputs[3]);
        questions[i].correctAnswerImage = inputs[3].value;
        for (let j = 0; j < 3; j++) {
            checkWrongAnswers(inputs[4 + 2 * j]);
            questions[i].wrongAnswers.push(inputs[4 + 2 * j].value);
            checkWrongURLs(inputs[5 + 2 * j]);
            questions[i].wrongAnswersImages.push(inputs[5 + 2 * j].value);
        }
        questions[i].wrongAnswers = questions[i].wrongAnswers.filter(answer => answer !== "");
        questions[i].wrongAnswersImages = questions[i].wrongAnswersImages.filter(answer => answer !== "");
    }
    const incorretos = document.querySelectorAll(".incorreto");
    const haCampoIncorreto = []
    for (let i = 0; i < incorretos.length; i++) {
        if (!incorretos[i].classList.contains("none")) {
            haCampoIncorreto.push("mais um");
        }
    }
    if (haCampoIncorreto.length !== 0) {
        alert("Preencha corretamente os campos");
    } else {
        showLevelScreen();
    }
}

function prosseguirParaSucesso() {
    const allLevels = document.querySelectorAll(".nivel");
    for (let i = 0; i < allLevels.length; i++) {
        const inputs = allLevels[i].querySelectorAll("input[type='text']");
        const description = allLevels[i].querySelector("textarea");
        checkForCharacters(inputs[0], 10);
        levels[i].title = inputs[0].value;
        checkPercentage(inputs[1]);
        levels[i].percentage = inputs[1].value;
        checkValidURL(inputs[2]);
        levels[i].imageSrc = inputs[2].value;
        checkForCharacters(description, 30);
        levels[i].description = description;
    }
    const incorretos = document.querySelectorAll(".incorreto");
    const haCampoIncorreto = []
    for (let i = 0; i < incorretos.length; i++) {
        if (!incorretos[i].classList.contains("none")) {
            haCampoIncorreto.push("mais um");
        }
    }
    const allPercentages = document.querySelectorAll(".percentage-input");
    let noZero = true;
    for (let i = 0; i < allPercentages.length; i++) {
        if (Number(allPercentages[i].value) == 0){
            noZero = false;
        }
    }
    if (haCampoIncorreto.length !== 0) {
        alert("Preencha corretamente os campos");
    } else if (noZero) {
        alert("Ao menos um dos níveis deve ter uma porcentagem mínima de 0.")
    } else {
        enviarquizServer();
    }
}

function checkContentInformacoesBasicas(element) {
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
        if (!isValidURL(element.value)) {
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

function qtdPerguntasInsuficientes() {
    const informacoes = document.querySelectorAll(".informacoes-basicas input")
    if (informacoes[2].value < 3) {
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
    let haCampoIncorreto = []
    for (let i = 0; i < incorretos.length; i++) {
        if (!incorretos[i].classList.contains("none") || inputs[i].value === "") {
            haCampoIncorreto.push("mais um");
        }
    }
    if (haCampoIncorreto.length !== 0) {
        alert("Preencha corretamente os campos")
    } else {
        basicInfos.quizTitle = inputs[0].value;
        basicInfos.quizImageSrc = inputs[1].value;
        basicInfos.numberOfQuestions = inputs[2].value;
        basicInfos.numberOfLevels = inputs[3].value;
        console.log(basicInfos)
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
        <div id="${quiz.data.length - quiz.data[i].id}" class="quiz-card" onclick="showQuiz(this.id)">
            <p>
            ${quiz.data[i].title}
            </p>
        </div>
        `;
        quizDosOutros.innerHTML += htmlQuizz
        

    }
    
    infoQuizzes = quiz.data
    
    // put the background image
    let allQuizes = document.querySelectorAll(".todos-quizes .quiz-card")
    for (let i = 0; i < allQuizes.length; i++) {
        allQuizes[i].style.backgroundImage = `${backgroundGradient}, url("${quiz.data[i].image}")`
    }
}

// function getQuiz() {
//     const requisicao = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
//     requisicao.then(showQuiz)
//     requisicao.catch(reload)
// }

function showQuiz(i) {
    conteudoMutavel.innerHTML = `
    <div class="quizz">
        <div class="header-quizz">
            <p>
                ${infoQuizzes[i].title}
            </p>
        </div>
    `

    const eachoptionquiz = document.querySelectorAll(".images-question")
    for (let j = 0; j < infoQuizzes[i].questions.length; j++) {
        conteudoMutavel.innerHTML += `
        <div class="question-quizz">
            <div class="header-question">
                <p>
                    ${infoQuizzes[i].questions[j].title}
                </p>
            </div>
            <div class="images-question">
                <div class="image-question">
                    <img src="${infoQuizzes[i].questions[j].answers[0].image}" alt="">
                    <p>${infoQuizzes[i].questions[j].answers[0].text}</p>
                </div>
                <div class="image-question">
                    <img src="https://4.bp.blogspot.com/-CRT7rOu49Rc/T9KUcNseefI/AAAAAAAAEes/zKJtV6sYPfo/s1600/acgwallpaper3.jpg" alt="">
                    <p>descrição</p>
                </div>
                <div class="image-question">
                    <img src="https://4.bp.blogspot.com/-CRT7rOu49Rc/T9KUcNseefI/AAAAAAAAEes/zKJtV6sYPfo/s1600/acgwallpaper3.jpg" alt="">
                    <p>descrição</p>
                </div>
                <div class="image-question">
                    <img src="https://4.bp.blogspot.com/-CRT7rOu49Rc/T9KUcNseefI/AAAAAAAAEes/zKJtV6sYPfo/s1600/acgwallpaper3.jpg" alt="">
                    <p>descrição</p>
                </div>
            </div>
        </div>
        `
        document.querySelectorAll(".header-question")[j].style.backgroundColor = `${infoQuizzes[i].questions[j].color}`
    }
    conteudoMutavel.innerHTML += "</div>"
    document.querySelector(".header-quizz").style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url("${infoQuizzes[i].image}")`
}

function enviarquizServer() {
    const obj = createQuizObject()
    console.log(obj)
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", obj)
    requisicao.then(sucessoQuiz)
    requisicao.catch(console.log("fudeu"))
}

function sucessoQuiz() {
    conteudoMutavel.innerHTML = `
    <div class="sucesso-quiz">
        <h3>
            Comece pelo começo
        </h3>
        <div class="quiz-card">
            <p>
                ${basicInfos.quizTitle}
            </p>
        </div>
        <div class="mostrar-voltar">
            <input type="button" value="Acessar Perguntas" class="prosseguir"
            onclick="mostrarQuizz()" />
            <h4 onclick="voltarprahome()">
                Voltar pra home
            </h4>
        </div>
    </div>
    `
    document.querySelector(".sucesso-quiz .quiz-card").style.backgroundImage = `${backgroundGradient}, url(${basicInfos.quizImageSrc})`
}


function reload() {
    window.location.reload()
}

function comparador() { 
	return Math.random() - 0.5; 
}

function createQuizObject() {
    const objectToSend = {
        title: basicInfos.quizTitle,
        image: basicInfos.quizImageSrc,
        questions: []
    }

    for (let i = 0; i < questions.length; i++) {
        objectToSend.questions.push({
            title: questions.question,
            color: questions.color,
            answers: []
        })
    }

    objectToSend.questions.answers.push({
        text: questions.correctAnswer,
        image: questions.correctAnswerImage,
        isCorrectAnswer: true
    })

    for (let i = 0; i < questions.wrongAnswers.length; i++) {
        objectToSend.questions.answers.push({
            text: questions.wrongAnswers[i],
            image: questions.wrongAnswersImages[i],
            isCorrectAnswer: false
        })
    }

    return objectToSend;
}

const conteudoMutavel = document.querySelector(".container");
let mostrando;
const basicInfos = {quizTitle: "", quizImageSrc: "", numberOfQuestions: 1, numberOfLevels: 2};
const questions = [];
const levels = [];
let infoQuizzes = [];
const backgroundGradient = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)";
mostrarTelaInicial();
