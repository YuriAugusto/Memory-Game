$(document).ready(function() {
    let nome = $("#nome");
    let btnIniciarJogo = $("#iniciar-jogo");
    let nomePreenchido

    btnIniciarJogo.on("click",function(){
        console.log("O nome preenchido foi: "+nomePreenchido);
        
    });

    nome.on("focusout",function(){
        nomePreenchido = verificaNome();
    });

    function verificaNome() {
        if(nome.val().length == 0){
            console.log("você precisa inserir um valor");
            return;
        }
        return nome.val();
    }

});