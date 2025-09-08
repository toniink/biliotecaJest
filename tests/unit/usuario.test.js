import { Usuario } from "../../src/usuario";
import { Livro } from "../../src/livro";

describe ('testes classe Usuario', () => {


    //objetos teste
    let usuario;
    let livro1, livro2, livro3, livro4;
    
    beforeEach(()=>{
        usuario = new Usuario ('Fiat Argo');
        livro1 = new Livro ('Um porquinho');
        livro2 = new Livro ('Os dois porquinhos');
        livro3 = new Livro ('Os tres porquinhos');
        livro4 = new Livro ('Os quatro porquinhos');

    });

    //teste 1 - criacao da classe
    describe('Criando o usuario', () =>{
        it('criar com nome correto', ()=> {
            expect(usuario.nome).toBe('Fiat Argo');
        });

        it('iniciar array de livros emprestados vazio', () => {
            expect(usuario.livrosEmprestados).toEqual([]);
            expect(usuario.livrosEmprestados.length).toBe(0);
        });

    });


    //teste 2 - pegar livros

    describe('funcoes relacionadas a pegar livros', () => {
        it('emprestar com sucesso', () => {
            usuario.pegarLivro(livro1);

            expect(usuario.livrosEmprestados).toContain(livro1);
            expect(usuario.livrosEmprestados.length).toBe(1);
            expect(livro1.disponivel).toBe(false);
        });

        it('pegar mais de um livro', ()=> {
            usuario.pegarLivro(livro1);
            usuario.pegarLivro(livro2);

            expect(usuario.livrosEmprestados).toContain(livro1);
            expect(usuario.livrosEmprestados).toContain(livro2);
            expect(usuario.livrosEmprestados.length).toBe(2);
            expect(livro1.disponivel).toBe(false);
            expect(livro2.disponivel).toBe(false);
        });

        it('erro ao atingir o limite de 3 livros', ()=> {
            usuario.pegarLivro(livro1);
            usuario.pegarLivro(livro2);
            usuario.pegarLivro(livro3);

            expect(()=> usuario.pegarlivro(livro4).toThrow('Usuário já possui o limite de 3 livros!'));

            expect(usuario.livrosEmprestados.length).toBe(3);
        });

        it('erro ao pegar livro indisponivel', () => {
            const usuario2 = new Usuario('Fiat Mobi');
            usuario2.pegarLivro(livro1);

            expect(()=>usuario.pegarLivro(livro1)).toThrow('Livro já emprestado!');
        });

        

    });




});