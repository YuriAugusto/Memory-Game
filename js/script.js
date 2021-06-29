//Obs: ao logar console.log({variavelDoElemento});// você irá logar a variável e o elemento que ela possui
const cards = document.querySelectorAll(".memory-card");//todos os elementos que representam os cartões (divs) são acessados armazenados nessa constante

let hasFlippedCard = false;//variável que diz quando a carta é virada, se inicia como false e quando clicada se torna true
let firstCard, secondCard;

function flipCard(){
    this.classList.toggle("flip");//(this) ao ser clicado o elemento recebe a class flip, caso clique novamente a classe é retirada através do toggle()
    //console.log(this);//aqui eu faço a impressão do elemento clicado
    // console.log("Eu cliquei aqui!");

    if(!hasFlippedCard){//se hasFlippedCard for diferente de false, significa que o usuário clicou no elemento
        //primeiro click
        hasFlippedCard = true;
        firstCard = this;//firstCard recebe o elemento que foi clicado
    }else{
        //segundo click
        hasFlippedCard = false;
        secondCard = this;//secondCard recebe o elemento que foi clicado

        //do cards match? as cartas combinam?
        if(firstCard.dataset.framework){

        }
    }
}

cards.forEach(card => card.addEventListener("click", flipCard))//aqui eu itero a lista de elementos recuperada "cards" e adiciono o evento de click em todos eles