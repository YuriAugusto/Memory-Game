//Obs: ao logar console.log({variavelDoElemento});// você irá logar a variável e o elemento que ela possui
const cards = document.querySelectorAll(".memory-card");//todos os elementos que representam os cartões (divs) são acessados armazenados nessa constante

let hasFlippedCard = false;//variável que diz quando a carta é virada, se inicia como false e quando clicada se torna true
let firstCard, secondCard;

function flipCard() {
    this.classList.toggle("flip");//(this) ao ser clicado o elemento recebe a class flip, caso clique novamente a classe é retirada através do toggle()
    //console.log(this);//aqui eu faço a impressão do elemento clicado
    // console.log("Eu cliquei aqui!");

    if (!hasFlippedCard) {//se hasFlippedCard for diferente de false, significa que o usuário clicou no elemento
        //primeiro click
        hasFlippedCard = true;
        firstCard = this;//firstCard recebe o elemento que foi clicado
    } else {
        //segundo click
        hasFlippedCard = false;
        secondCard = this;//secondCard recebe o elemento que foi clicado
        checkForMatch();
    }

}

/* 
function checkForMatch() {//verifica se as cartas viradas combinam
    //do cards match? as cartas combinam?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {//se o valor do atributo data- for identico nas duas cartas clicadas o evento de click que aciona a function que "flipa" será removido, impedindo o usuário de virar estas cartas novamente
        //it's a match!
        disabledCards();
    } else {//se o valor do data-framework for diferente nesse bloco eu faço a remoção da classe flip, responsável por mostrar a carta virada
        //not a match
        unflipCards();
    }
} */
//Ou, ambos fazem o mesmo
function checkForMatch() {//verifica se as cartas viradas combinam
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;//essa variável local recebe a condição a ser validada

    //operador ternário/ if ternário, se a condição da variável for atendida (sendo true) então a primeira function será executada, caso contrário (sendo false) a segunda function será executada
    isMatch ? disabledCards() : unflipCards();
}

function disabledCards(){//remove o evento de click que usa função que flipa a carta
    firstCard.removeEventListener("click", flipCard);//se o valor do atributo data- for identico nas duas cartas clicadas o evento de click que aciona a function que "flipa" será removido, impedindo o usuário de virar estas cartas novamente
    secondCard.removeEventListener("click", flipCard);
}

function unflipCards(){//desvira as cartas viradas sempre que elas não forem iguais
    setTimeout(() => {
        firstCard.classList.remove("flip");//aqui
        secondCard.classList.remove("flip");
    }, 1500);//2º arg representa o tempo que a carta permanecera virada para cima
}

cards.forEach(card => card.addEventListener("click", flipCard))//aqui eu itero a lista de elementos recuperada "cards" e adiciono o evento de click em todos eles