const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// Adionar o item li à lista de tarefa
function criarTarefa (itemTarefa){
    const item = criarItemTarefa(itemTarefa);
    tarefas.appendChild(item);
    salvarTarefas();
    limparInput();
}

//Cria o item li
function criarItemTarefa(itemTarefa){
    const item = document.createElement('li');
    item.innerText = itemTarefa;
    item.classList.add('item-tarefa');
    criarBotaoApagar(item);
    return item;
}

//Limpar a entrada do objeto
function limparInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

// Cria um botão apagar
function criarBotaoApagar(item){
    const botao = document.createElement('button');
    botao.innerText = 'Apagar';
    botao.setAttribute('class', 'apagar');
    botao.setAttribute('title', 'Apagar esta tarefa');
    item.appendChild(botao);
}

// Evento que capura o click no botão de remover e remove o item
document.addEventListener('click', function(e){
    const elemento = e.target;
    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove(); //remove o elemento pai
    }
    salvarTarefas();
})

// cria uma tarefa quando o usuário pressiona ENTER
inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criarTarefa(inputTarefa.value);
    }
})

// Cria uma tarefa quando o usuário pressiona o botão de adicionar
btnTarefa.addEventListener('click', function(){
    if(!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);
})

function salvarTarefas(){
    const listaDeItens = tarefas.querySelectorAll('li');
    const listDeTarefas = [];

    for(let tarefa of listaDeItens){
        let textoTarefa = tarefa.innerText;
        textoTarefa = textoTarefa.replace('APAGAR', '');
        textoTarefa = textoTarefa.replace('\n', '');
        listDeTarefas.push(textoTarefa);
    }
    const listeEmJSON = JSON.stringify(listDeTarefas); // converte um elemento javascript em uma string JSON.
    localStorage.setItem('tarefas', listeEmJSON); // salva o json no local storage do navegador.
}

function carregarTarefasSalvas(){
    const arquivoDeTarefas = localStorage.getItem('tarefas'); // recupera lista de tarefas em json
    const listaDeTarefas = JSON.parse(arquivoDeTarefas); // converte a lista de tarefas do formato em json para o objeto javascript original
    for(let tarefa of listaDeTarefas){
        criarTarefa(tarefa);
    }
}

carregarTarefasSalvas();