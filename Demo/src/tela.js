const util = Util

const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO =  "carregando"
const ID_CONTADOR = "contador"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"

const MENSAGENS = {
    sucesso: {
        texto: 'combinação correta',
        classe: 'alert-success'
    },
    erro:{ 
        texto: 'combinação incorreta',
        classe:'alert-danger'
    }
}

class Tela{

    static obterCodigoHtml(item){
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}' , '${item.nome}')">
                <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
            </div>
            
        </div>
        
        
        `
    }

    static configurarBotaoVerificarSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    }

    static alterarConteudoHtml(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml

    }

    static gerarStrigHTMLPelaImagem(itens){
        return itens.map(Tela.obterCodigoHtml).join('')
    }
    static atualizarImagens(itens){
        const codigoHtml = Tela.gerarStrigHTMLPelaImagem(itens)
        Tela.alterarConteudoHtml(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnclick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnclick
    }


    static exibirHerois(nomeDoHeroi, img){
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        elementosHtml.forEach(item => (item.src = img))
    }

     static async exibirMensagem(sucesso = true){
        const elemento = document.getElementById(ID_MENSAGEM)
        
        if(sucesso){
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto 
        }else{
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto 
        }
        
        elemento.classList.remove(CLASSE_INVISIVEL)
        
        await util.timeout(3000)
        
        this.tela.limparContador(idDoIntervalo)

        elemento.classList.add(CLASSE_INVISIVEL)
    }

    static exibirCarregando(mostrar = true){
        const carreganddo = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carreganddo.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carreganddo.classList.add(CLASSE_INVISIVEL)
    }
    
    static iniciarContador(){
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        const identificadorNoTexto ="$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto}segundos...`
        
        const atualizarTexto = ()=>
        (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))
        
        atualizarTexto()
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo

    }

    static limparContador(idDoIntervalo){
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

   static configurarBotaoMostrarTudo(funcaoOnClick){
        const btnMostratTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostratTudo.onclick = funcaoOnClick
    }

} 