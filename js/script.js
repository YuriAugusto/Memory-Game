//Obs: ao logar console.log({variavelDoElemento});// você irá logar a variável e o elemento que ela possui
const cartas = document.querySelectorAll(".memory-card");//todos os elementos que representam os cartões (divs) são acessados armazenados nessa constante

let cartaEstaVirada = false;//variável que diz quando a carta é virada, se inicia como false e quando clicada se torna true
let travarQuadro = false;
let primeiraCarta, segundaCarta;
let qtdDeErros = 0;//sempre que errar acresce +1

let campoNome = document.querySelector(".campo-nome");//recuperei o elemento pela classe
let nomeUsuario = "";
let btnSalvar = document.getElementById("salvar");//recuperei o elemento pelo id
let btnReiniciar = document.getElementById("reiniciar");//recuperei o elemento pelo id

btnSalvar.addEventListener("click", recebeNomeUsuario);
btnReiniciar.addEventListener("click", reiniciaJogo);

function recebeNomeUsuario() {
    // console.log(nome.value);//como recuperar o valor inputado no campo
    nomeUsuario = campoNome.value;
    if (nomeUsuario.length == 0) {
        console.log(`O campo de nome está vazio: [${nomeUsuario}] empty`);
    }
    console.log(nomeUsuario);
}

cartas.forEach(carta => carta.addEventListener("click", virarCartas));//aqui eu itero "cartas" e adiciono o evento de click e a function em todos eles

function virarCartas() {
    if (travarQuadro == true) return;//se travarQuadro for true, o "return" para a execução da function e impede o usuário de clicar e virar uma 3º carta
    if (this === primeiraCarta) return;//se o usuário clicar duas vezes na mesma carta esse return impede a execução da function

    this.classList.add("flip");//(this) ao ser clicado o elemento recebe a class flip

    //primeiro click
    if (cartaEstaVirada == false) {//cartaEstaVirada inicia como false, quer dizer que nenhuma carta foi virada
        cartaEstaVirada = true;
        primeiraCarta = this;//primeiraCarta recebe o elemento que foi clicado
        return;
    }
    //segundo click e a variável cartaEstaVirada já está true
    segundaCarta = this;//segundaCarta recebe o elemento que foi clicado
    verificaSeCombinou();
}

function verificaSeCombinou() {//verifica se as cartas viradas combinam
    let combinou = primeiraCarta.dataset.framework === segundaCarta.dataset.framework;//essa variável local recebe a condição a ser validada
    //operador ternário/ if ternário, se a condição da variável for atendida (sendo true) então a primeira function será executada, caso contrário (sendo false) a segunda function será executada
    combinou ? cartasCombinadas() : desviraCartas();
}

function cartasCombinadas() {//remove o evento de click que usa função que flipa a carta
    primeiraCarta.removeEventListener("click", virarCartas);//se o valor do atributo data- for identico nas duas cartas clicadas o evento de click que aciona a function que "flipa" será removido, impedindo o usuário de virar estas cartas novamente
    segundaCarta.removeEventListener("click", virarCartas);
    resetaValores();
    exibirResultadoFinal();
}

function desviraCartas() {//desvira as cartas viradas sempre que elas não forem iguais
    travarQuadro = true;//impede que o usuário selecione uma 3º carta
    contaErros();

    setTimeout(() => {//as duas cartas clicadas passam um tempo viradas para cima
        primeiraCarta.classList.remove("flip");//ao remover a classe flip a carta volta ao estado anterior a ser virada
        segundaCarta.classList.remove("flip");

        resetaValores(); //travarQuadro = false;//depois que as cartas forem viradas para baixo essa variável recebe false

    }, 1500);//2º arg representa o tempo que a carta permanecera virada para cima  
}

function resetaValores() {//reseta 
    [cartaEstaVirada, travarQuadro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

function embaralhar() {//função que embaralha
    //pego a const que recuperou todos os cards e itero a lista de elementos
    cartas.forEach(carta => {
        let posicaoAleatoria = Math.floor(Math.random() * 12);//Math.random() gera um número aleatório, como  tenho 12 elementos, multiplico o valor por 12 e o Math.floor() serve para retornar sempre o menor resultado como inteiro
        carta.style.order = posicaoAleatoria;//após gerar os números aleatórios eu atribuo eles as cartas e ordeno de forma aleatória
        carta.classList.add("flip");
    });
    setTimeout(function () {//aqui eu exibo todas as cartas durante 1,5 s logo após elas terem sido embaralhadas
        // alert("Parabéns por acessar o site");
        cartas.forEach(carta => carta.classList.remove("flip"));
    }, 1500);
};

function reiniciaJogo() {
    console.log("Botão reiniciar funcionando");
    embaralhar();
    nomeUsuario = "";
}

function contaErros() {
    qtdDeErros++;
    console.log("Quantidade de Erros: " + qtdDeErros);
}

function exibirResultadoFinal() {
    let quantidadeCartasViradas = document.querySelectorAll(".memory-card.flip");
    if (quantidadeCartasViradas.length == 12) {
        console.log("Cartas encontradas: " + quantidadeCartasViradas.length);
        console.log("Parabéns você ganhou: " + nomeUsuario);
    }
}

//executada assim que a página carrega
(function () {//IIFE (Immediately Invoked Function Expression) é uma função em JavaScript que é executada assim que definida e executa apenas uma vez a cada vez que a página carrega.
    reiniciaJogo();
})();