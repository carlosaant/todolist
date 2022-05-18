let btn_adicionar;
let inpt_tarefa;
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

  btn_adicionar.addEventListener('click', adcionarTarefa);

  /*
        caso haja itens no localstorage, chama a funçao para carregar o Array com as tarefas armazenadas
        e em seguida exibe na tela em sequencia.
//  */
  if (localStorage.length > 0) {
    carregarTarefas();
    renderTasksOnScreen();
    console.log(_tarefas); //-----------------------------------------
  }
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
    alert('Insira uma Tarefa válida!');
  } else {
    criarTarefa(inpt_tarefa.value.trim());
    // limpaCampo();
  }
}

function criarTarefa(tarefa) {
  const tarefa_adc = new tarefa_un(tarefa); //retorna um obj tarefa
  _tarefas.unshift(tarefa_adc); //insere no começo do array
  setLocalSt(_tarefas);
  renderTasksOnScreen();
}

// renderiza todos os itens de uma vez
function renderTasksOnScreen() {
  const div_tasks = document.querySelector('.tasks');
  // percorre os filhos dentro da div_tasks e remove - limpa os elementos
  for (const child of div_tasks.children) {
    child.remove();
  }
  // insere filho recebendo ul criada com os itens
  div_tasks.appendChild(createListOfItensTaks());
}

function createListOfItensTaks() {
  const ul_tarefas = document.createElement('ul');
  ul_tarefas.id = 'todo-ul';
  _tarefas.forEach(function (item) {
    //passa o obj tarefa e recebe .appendchild o Li construido
    ul_tarefas.appendChild(createLiItemTask(item));
  });
  return ul_tarefas;
}

function createLiItemTask(tarefa) {
  const li_tarefa = document.createElement('li');
  const text_tarefa = document.createElement('p');
  const div_controls = document.createElement('div');
  const check_tarefa = document.createElement('input');
  const del_tarefa = document.createElement('input');

  check_tarefa.type = 'checkbox';
  del_tarefa.type = 'button';
  del_tarefa.value = 'Del';

  // caso fosse inserido ID na tarefa LI, poderia ter criado o setAtribute e chamado a funçao delete passando o ID
  del_tarefa.onclick = function () {
    // retorna o elemento pai do pai (no caso o li)
    deleteTarefa(this.parentNode.parentNode);
  };
  div_controls.classList = 'controls';

  text_tarefa.textContent = tarefa.task;

  div_controls.appendChild(check_tarefa);
  div_controls.appendChild(del_tarefa);

  li_tarefa.appendChild(text_tarefa);
  li_tarefa.appendChild(div_controls);

  return li_tarefa;
}

// ------------------------------- Funçoes de Apoio -----------------

function deleteTarefa(elem) {
  console.log(elem);
  const index = buscaIndexTarefaArray(elem.children[0].textContent);
  if (index === _tarefas.length) {
    alert('Nao Foi possivel Excluir!');
  } else {
    document.getElementById('todo-ul').removeChild(elem);
    _tarefas.splice(index, 1);
    setLocalSt(_tarefas);
  }
  displayTasksDiv();
}

function buscaIndexTarefaArray(tarefa_text) {
  for (let index = 0; index < _tarefas.length; index++) {
    if (_tarefas[index].task === tarefa_text) {
      return index;
    }
  }
}

function setLocalSt(arrTarefas) {
  localStorage.setItem('tarefas-todo', JSON.stringify(arrTarefas));
}

function carregarTarefas() {
  _tarefas = JSON.parse(localStorage.getItem(localStorage.key('tarefas-todo')));
}

// function verifica se a lista de tarefas tem itens, caso nao tenha dar um display none na div .tasks
function displayTasksDiv() {
  const div_tasks = document.querySelector('.tasks');
  if (_tarefas.length == 0) {
    div_tasks.style.display = 'none';
  } else {
    div_tasks.style.display = 'flex';
  }
}
