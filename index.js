const botao = document.getElementById('botao-cadastrar');
const listaCadastros = document.getElementById('conteudo');

const enderecos = localStorage.length ? getEnderecosLocalStorage() : [];
mostraLista();

botao.addEventListener('click', () => {
  cadastra();
  mostraLista();
});

function cadastra() {
  let rua = document.querySelector('#rua').value;
  let cidade = document.querySelector('#cidade').value;
  let cep = document.querySelector('#cep').value;
  let numero = document.querySelector('#numero-residencial').value;
  if(rua && cidade && cep && numero) {
    const objeto = {
      rua,
      cidade,
      cep,
      numero
    };
    if(!repeteEndereco(objeto)) {
      enderecos.push(objeto);
      addEnderecosLocalStorage();
    } else {
      window.alert('Este endereço já existe!');
    }
  }
}

function exclui(id) {
  enderecos.splice(id, 1);
  addEnderecosLocalStorage();
  mostraLista();
}

function mostraLista() {
  if(enderecos) {
    listaCadastros.innerHTML = '';
    enderecos.forEach((endereco, i) => {
      let row = document.createElement('div');
      row.classList.add('row', 'mb-3');
      row.innerHTML = `
      <div class="card">
        <div class="card-body">
          <div class="mb-2">
            Rua: ${endereco.rua}
          </div>
          <div class="mb-2">
            Cidade: ${endereco.cidade}
          </div>
          <div class="mb-2">
            CEP: ${endereco.cep}
          </div>
          <div class="mb-2">
            Numero Residencial: ${endereco.numero}
          </div>
          <button class="btn btn-danger" onclick="exclui('${i}')">Excluir</button>
        </div>
      </div>
      `;
      listaCadastros.appendChild(row);
    });
  }
}

function repeteEndereco(objeto) {
  for(let i = 0; i < enderecos.length; i++) {
    if(enderecos[i].rua === objeto.rua
      && enderecos[i].cidade === objeto.cidade
      && enderecos[i].cep === objeto.cep
      && enderecos[i].numero === objeto.numero) {
        return true;
      }
  }
  return false;
}

function getEnderecosLocalStorage() {
  return JSON.parse(localStorage.getItem('enderecos'));
}

function addEnderecosLocalStorage() {
  localStorage.setItem('enderecos', JSON.stringify(enderecos));
}