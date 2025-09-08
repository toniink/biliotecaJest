export class Livro {
    constructor(titulo) {
    this.titulo = titulo;
    this.disponivel = true;
    }
    
    emprestar() {
    if (!this.disponivel) {
    throw new Error("Livro já emprestado!");
    }
    
    this.disponivel = false;
    }
    
    devolver() {
    this.disponivel = true;
    }
    }

