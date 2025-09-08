export class Usuario {
    constructor(nome) {
    this.nome = nome;
    this.livrosEmprestados = [];
    }
    
    pegarLivro(livro) {
    if (this.livrosEmprestados.length >= 3) {
    throw new Error("Usuário já possui o limite de 3 livros!");
    }
    livro.emprestar();
    this.livrosEmprestados.push(livro);
    }
    
    devolverLivro(livro) {
    this.livrosEmprestados = this.livrosEmprestados.filter(l => l !== livro);
    livro.devolver();
    }
    }


