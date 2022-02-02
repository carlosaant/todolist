let btn_adicionar;
let inpt_tarefa;
let body_tarefas;
let alerta_error;

let _tarefas = [];

//----------------------------------------------------------------------
class tarefa_un {
    constructor(tarefa) {
        this.checked = false;
        this.task = tarefa;
    }
}
//----------------------------------------------------------------------
//get elementos HTML
 onload = function () {  //ao carregar a pagina, faz a captura dos elementos HTML
  inpt_tarefa = document.getElementById("inpt_tarefa");
  btn_adicionar = document.getElementById("btn_adicionar");
  body_tarefas = document.querySelector(".div-body");
  alerta_error = document.querySelector(".alerta");
  alerta_error.style.display = "none";

  btn_adicionar.addEventListener("click", adcionarTarefa);

/*
        caso haja itens no localstorage, chama a funçao para carregar o Array com as tarefas armazenadas
        e em seguida exibe na tela em sequencia.
 */
  if(localStorage.length>0){
         carregarTarefas();
         exibeTarefas();
        console.log(_tarefas);//-----------------------------------------
  }
};

/*
    Funçao verifica se o campo digitado pelo Usuario inpt_tarefa esta vazio ou com espaços apenas,
    funcionando como um filtro basico, caso há um valor valido, chama a funçao criarTarefa passando o
    dado digitado pelo usuario, retirando qualquer espaço antes ou depois das palavras.
*/
function adcionarTarefa() {
  if (inpt_tarefa.value.trim() === ""){ //trim() retira os espaços para comparaçao
    errorInsere();
  }
  else{
    criarTarefa(inpt_tarefa.value.trim());
    limpaCampo();
  }
}


function criarTarefa(tarefa) {
    let tarefa_adc = new tarefa_un(tarefa);
    _tarefas.unshift(tarefa_adc); //insere no começo do array
    setLocalSt(_tarefas);
    exibeTarefas();

    console.log(_tarefas);
}


function carregarTarefas(){
    _tarefas = JSON.parse(localStorage.getItem(localStorage.key("tarefas-todo")));
}

function exibeTarefas(){
    body_tarefas.innerHTML="";
     const ul_list_tarefas = document.createElement("ul");
     ul_list_tarefas.classList = "list-tasks";
    _tarefas.forEach(function (item){
        const li_tarefa = document.createElement("li");
        const node = document.createTextNode(item.task);
        li_tarefa.appendChild(node);
        li_tarefa.innerHTML += "<button onclick='delTarefa(this)'></button>";
        if(item.checked){
            li_tarefa.innerHTML += "<input type='checkbox' onchange='checkTarefa(this)' checked/>";
            li_tarefa.style.textDecoration = "line-through";
        }
        else
            li_tarefa.innerHTML += "<input type='checkbox' onchange='checkTarefa(this)'/>";
        ul_list_tarefas.appendChild(li_tarefa);
    })
    body_tarefas.appendChild(ul_list_tarefas);
}

function checkTarefa(elem){
    if(elem.parentElement.childNodes[2].checked){
        checkAlterar(elem, true);
        elem.parentElement.style.textDecoration = "line-through";
    }
    else{
        checkAlterar(elem, false);
        elem.parentElement.style.textDecoration = "none";
    }
}


function delTarefa(elem){
    let thisText = elem.parentElement.childNodes[0].data;
    //Buscar Indice do Objeto dentro do Array
    let index;
    for (index = 0; index < _tarefas.length; index++) {
        if(_tarefas[index].task === thisText){
            break;
        } 
    }
    //remove o objeto do Array ,1 quantidade de item a remover
    if(index === _tarefas.length){
        console.log("não foi possivel excluir!");
    }else{
        _tarefas.splice(index, 1);
        setLocalSt(_tarefas);
        elem.parentElement.remove();
    }

    // console.log(_tarefas);
}

// ------------------------------- Funçoes de Apoio -----------------

function setLocalSt(arrTarefas){
    localStorage.setItem("tarefas-todo", JSON.stringify(arrTarefas));
}

function errorInsere(){
    alerta_error.style.display = "block";
    inpt_tarefa.style = "border: 2px solid red;";
    limpaCampo();
    let timeout = setTimeout(function() {
        alerta_error.style.display = "none";
        inpt_tarefa.style = "border: 2px solid rgb(170, 169, 169);";
      }, 5000)
}

function limpaCampo(){
    inpt_tarefa.value = "";
    inpt_tarefa.focus();
}

function checkAlterar(elem, status){
    let thisText = elem.parentElement.childNodes[0].data;
        // Buscar Indice do Objeto dentro do Array
        let index;
        for (index = 0; index < _tarefas.length; index++) {
            if(_tarefas[index].task === thisText){
            break;
            } 
        }
        if(index === _tarefas.length){
            console.log("não foi possivel alterar!");
        }else{
            _tarefas[index].checked=status;
            setLocalSt(_tarefas);
        }
}