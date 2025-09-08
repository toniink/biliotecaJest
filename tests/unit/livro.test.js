import {Livro} from '../../src/livro';

//agrupa testes
describe ('Testes da classe livro', () =>{


    //teste 1 - construtor funciona?
    it('deve criar um livro com titulo e como disponivel true', () => {
        const livro = new Livro('Os cinco porquinhos');

        expect(livro.titulo).toBe('Os cinco porquinhos');
        expect(livro.disponivel).toBe(true);

    });

    //teste 2 - funcao emprestar
    it('retorna indisponivel após emprestar', () => {
        const livro = new Livro('Os cinco porquinhos');

        livro.emprestar();

        expect(livro.disponivel).toBe(false);
    });

    //teste 3 - funcao devolver

    it('retorna disponível apos devolver', () => {
        const livro = new Livro('Os cinco porquinhos');

        livro.devolver();

        expect(livro.disponivel).toBe(true);
    });

    //teste 4 - emprestar um livro indisponivel
    
    it('deve retornar mensagem de erro ao emprestar livro indisponivel', () => {
        const livro = new Livro('Os cinco porquinhos');
        livro.emprestar();

        expect(() => livro.emprestar()).toThrow('Livro já emprestado!');
    })
});