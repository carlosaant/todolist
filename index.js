let btn_adicionar;
let inpt_tarefa;
let div_tasks;
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
onload = function () {
  //ao carregar a pagina, faz a captura dos elementos HTML
  inpt_tarefa = document.getElementById('inpt_tarefa');
  btn_adicionar = document.getElementById('btn_adicionar');
  div_tasks = document.querySelector('.tasks');

  btn_adicionar.addEventListener('click', adcionarTarefa);

  /*
        caso haja itens no localstorage, chama a funçao para carregar o Array com as tarefas armazenadas
        e em seguida exibe na tela em sequencia.
//  */
  //   if(localStorage.length>0){
  //          carregarTarefas();
  //          exibeTarefas();
  //         console.log(_tarefas);//-----------------------------------------
  //   }
};

/*
    Funçao verifica se o campo digitado pelo Usuario inpt_tarefa esta vazio ou com espaços apenas,
    funcionando como um filtro basico, caso há um valor valido, chama a funçao criarTarefa passando o
    dado digitado pelo usuario, retirando qualquer espaço antes ou depois das palavras.
*/
function adcionarTarefa() {
  if (inpt_tarefa.value.trim() === '') {
    //trim() retira os espaços para comparaçao
    // errorInsere();
  } else {
    criarTarefa(inpt_tarefa.value.trim());
    // limpaCampo();
  }
}

function criarTarefa(tarefa) {
  let tarefa_adc = new tarefa_un(tarefa);
  _tarefas.unshift(tarefa_adc); //insere no começo do array
  setLocalSt(_tarefas);
  // exibeTarefas();
}

// function carregarTarefas(){
//     _tarefas = JSON.parse(localStorage.getItem(localStorage.key("tarefas-todo")));
// }

// ------------------------------- Funçoes de Apoio -----------------

function setLocalSt(arrTarefas) {
  localStorage.setItem('tarefas-todo', JSON.stringify(arrTarefas));
}
