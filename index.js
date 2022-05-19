let btn_adicionar;
let inpt_tarefa;
let spn_caracteres;

const caracterLimite = 50;

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
  spn_caracteres = document.getElementById('caracRest');

  inpt_tarefa.addEventListener('input', function () {
    inputCaracter(this);
  });
  btn_adicionar.addEventListener('click', adcionarTarefa);

  /*
        caso haja itens no localstorage, chama a funçao para carregar o Array com as tarefas armazenadas
        e em seguida exibe na tela em sequencia.
//  */
  if (localStorage.length > 0) {
    carregarTarefas();
    renderTasksOnScreen();

    displayTasksDiv();
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
    limpaCampoTarefa();
  } else {
    criarTarefa(inpt_tarefa.value.trim());
    limpaCampoTarefa();
  }
}

function criarTarefa(tarefa) {
  const tarefa_adc = new tarefa_un(tarefa); //retorna um obj tarefa
  _tarefas.unshift(tarefa_adc); //insere no começo do array
  setLocalSt(_tarefas);
  // verifica para tirar o hidder inicial da div
  displayTasksDiv();
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

  // pode verificar se a ul ja existe, senao cria ela, ai no caso só adicionaria os elementos li
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
  check_tarefa.checked = tarefa.checked;
  check_tarefa.onchange = function () {
    checkTarefa(this.parentNode.parentNode, this.checked);
  };

  del_tarefa.type = 'button';
  // caso fosse inserido ID na tarefa LI, poderia ter criado o setAtribute e chamado a funçao delete passando o ID
  del_tarefa.onclick = function () {
    // retorna o elemento pai do pai (no caso o li)
    deleteTarefa(this.parentNode.parentNode);
  };
  div_controls.classList = 'controls';

  text_tarefa.textContent = tarefa.task;

  if (tarefa.checked) {
    text_tarefa.classList.add('markedText');
  }

  div_controls.appendChild(check_tarefa);
  div_controls.appendChild(del_tarefa);

  li_tarefa.appendChild(text_tarefa);
  li_tarefa.appendChild(div_controls);

  return li_tarefa;
}

function deleteTarefa(elem) {
  const index = buscaIndexTarefaArray(elem.children[0].textContent);
  if (index === _tarefas.length) {
    alert('Nao foi possivel excluir a tarefa!');
  } else {
    document.getElementById('todo-ul').removeChild(elem);
    _tarefas.splice(index, 1);
    setLocalSt(_tarefas);
  }
  displayTasksDiv();
}

function checkTarefa(elem, status) {
  const index = buscaIndexTarefaArray(elem.children[0].textContent);
  if (index === _tarefas.length) {
    alert('Nao foi possivel alterar a tarefa!');
  } else {
    status
      ? elem.children[0].classList.add('markedText')
      : elem.children[0].classList.remove('markedText');
    _tarefas[index].checked = status;
    setLocalSt(_tarefas);
  }
}

// ------------------------------- Funçoes de Apoio -----------------

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
    div_tasks.style.visibility = 'hidden';
  } else {
    div_tasks.style.visibility = 'visible';
  }
}

function inputCaracter(elem) {
  let caracterDigitado = elem.value.length;
  let caracterRestante = caracterLimite - caracterDigitado;

  spn_caracteres.textContent = caracterRestante;
}

function limpaCampoTarefa() {
  inpt_tarefa.value = '';
}
