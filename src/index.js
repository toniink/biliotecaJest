import { Biblioteca } from "./biblioteca.js";

const biblioteca = new Biblioteca();
const livro1 = biblioteca.cadastrarLivro("Dom Casmurro");
const usuario1 = biblioteca.cadastrarUsuario("João");
biblioteca.emprestarLivro(usuario1, livro1);
console.log(usuario1.livrosEmprestados);