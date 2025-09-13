import { Livro } from "./livro.js";
import { Usuario } from "./usuario.js";
export class Biblioteca {
constructor() {
this.usuarios = [];
this.livros = [];
}
cadastrarLivro(titulo) {
const livro = new Livro(titulo);
this.livros.push(livro);
return livro;
}
cadastrarUsuario(nome) {
const usuario = new Usuario(nome);
this.usuarios.push

(usuario);

return usuario
;

}
emprestarLivro

(usuario, livro) {
usuario.pegarLivro(livro);
}
devolverLivro

(usuario, livro) {
usuario.devolverLivro(livro);
}
}