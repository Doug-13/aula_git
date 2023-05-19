class Aluno {
  constructor() {
    this.id = 1;
    this.arrayAluno = [];
    this.editId = null;
  }
  calcular(media, clas) {
    var Vnota1 = document.getElementById('nt1').value;
    Vnota1 = parseInt(Vnota1);
    var Vnota2 = document.getElementById('nt2').value;
    Vnota2 = parseInt(Vnota2);
    var Vnota3 = document.getElementById('nt3').value;
    Vnota3 = parseInt(Vnota3);
    var Vnota4 = document.getElementById('nt4').value;
    Vnota4 = parseInt(Vnota4);
    var media = (Vnota1 + Vnota2 + Vnota3 + Vnota4) / 4;

    if (media < 40.0) {
      var clas = 'Reprovado';
    } else if (media < 60.0) {
      var clas = 'Recuperação';
    } else {
      var clas = 'Aprovado';
    }
    this.media = media;
    this.clas = clas;
  }

  salvar() {
    let clas = this.calcular();

    let aluno = this.lerDados();

    if (this.validacao(aluno)) {
      if (this.editId === null) {
        this.adicionar(aluno);
      } else {
        this.atualizar(this.editId, aluno);
      }
    }

    this.listaTabela();
    this.limpar();
  }

  listaTabela() {
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';

    for (let i = 0; i < this.arrayAluno.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_Nome = tr.insertCell();
      let td_Turma = tr.insertCell();
      let td_Media = tr.insertCell();
      let td_Status = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayAluno[i].id;
      td_Nome.innerText = this.arrayAluno[i].nomeAluno;
      td_Turma.innerText = this.arrayAluno[i].turma;
      td_Media.innerText = this.arrayAluno[i].media;
      td_Status.innerText = this.arrayAluno[i].clas;

      td_id.classList.add('center');

      let imgEdit = document.createElement('img');
      imgEdit.src = 'assets/pencil-square.svg';
      imgEdit.setAttribute(
        'onclick',
        'aluno.preparaEdicao(' + JSON.stringify(this.arrayAluno[i]) + ')'
      );

      let imgDel = document.createElement('img');
      imgDel.src = 'assets/trash3 (1).svg';
      imgDel.setAttribute(
        'onclick',
        'aluno.deletar(' + this.arrayAluno[i].id + ')'
      );

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDel);

      td_acoes.classList.add('center');
    }
  }
  adicionar(aluno) {
    this.arrayAluno.push(aluno);
    this.id++;
  }
  atualizar(id, aluno) {
    for (let i = 0; i < this.arrayAluno.length; i++) {
      if (this.arrayAluno[i].id == id) {
        this.arrayAluno[i].nomeAluno = aluno.nomeAluno;
        this.arrayAluno[i].turma = aluno.turma;
        this.arrayAluno[i].Vnota1 = aluno.Vnota1;
        this.arrayAluno[i].Vnota2 = aluno.Vnota2;
        this.arrayAluno[i].Vnota3 = aluno.Vnota3;
        this.arrayAluno[i].Vnota4 = aluno.Vnota4;
        this.arrayAluno[i].media = aluno.media;
        this.arrayAluno[i].clas = aluno.clas;
      }
    }
  }
  preparaEdicao(dados) {
    this.editId = dados.id;
    document.getElementById('nome').value = dados.nomeAluno;
    document.getElementById('turma').value = dados.turma;
    document.getElementById('nt1').value = dados.Vnota1;
    document.getElementById('nt2').value = dados.Vnota2;
    document.getElementById('nt3').value = dados.Vnota3;
    document.getElementById('nt4').value = dados.Vnota4;

    document.getElementById('bt1').innerText = 'Atualizar';
  }

  lerDados() {
    let aluno = {}; //Criação de um objeto

    aluno.id = this.id;
    aluno.nomeAluno = document.getElementById('nome').value;
    aluno.turma = document.getElementById('turma').value;
    aluno.Vnota1 = document.getElementById('nt1').value;
    aluno.Vnota2 = document.getElementById('nt2').value;
    aluno.Vnota3 = document.getElementById('nt3').value;
    aluno.Vnota4 = document.getElementById('nt4').value;
    aluno.media = this.media;
    aluno.clas = this.clas;

    return aluno;
  }

  validacao(aluno) {
    let msg = '';

    if (aluno.nomeAluno == '') {
      msg += '- Informe o nome do Aluno \n';
    }

    if (
      aluno.Vnota1 == '' ||
      aluno.Vnota2 == '' ||
      aluno.Vnota3 == '' ||
      aluno.Vnota4 == ''
    ) {
      msg += '- Campo de notas incompleto! \n';
    }
    if (msg != '') {
      alert(msg);
      return false;
    }
    return true;
  }

  limpar() {
    document.getElementById('nome').value = '';
    document.getElementById('nt1').value = '';
    document.getElementById('nt2').value = '';
    document.getElementById('nt3').value = '';
    document.getElementById('nt4').value = '';

    document.getElementById('bt1').innerText = 'Salvar';
    this.editId = null;
  }

  deletar(id) {
    if (confirm('Deseja realmente excluir a linha ' + id + '?')) {
      let tbody = document.getElementById('tbody');

      for (let i = 0; i < this.arrayAluno.length; i++) {
        if (this.arrayAluno[i].id == id) {
          this.arrayAluno.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }
}
var aluno = new Aluno();
