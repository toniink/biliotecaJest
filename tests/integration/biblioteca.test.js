const { Biblioteca } = require('../../src/biblioteca');
const { Usuario } = require('../../src/usuario');
const { Livro } = require('../../src/livro');

describe('Classe Biblioteca', () => {
  let biblioteca;

  beforeEach(() => {
    biblioteca = new Biblioteca();
  });

  describe('Construtor', () => {
    test('deve criar biblioteca com arrays vazios', () => {
      expect(biblioteca.usuarios).toEqual([]);
      expect(biblioteca.livros).toEqual([]);
      expect(biblioteca.usuarios.length).toBe(0);
      expect(biblioteca.livros.length).toBe(0);
    });
  });

  describe('cadastrarLivro()', () => {
    test('deve cadastrar livro com sucesso', () => {
      const livro = biblioteca.cadastrarLivro('Dom Casmurro');
      
      expect(biblioteca.livros).toContain(livro);
      expect(biblioteca.livros.length).toBe(1);
      expect(livro).toBeInstanceOf(Livro);
      expect(livro.titulo).toBe('Dom Casmurro');
      expect(livro.disponivel).toBe(true);
    });

    test('deve cadastrar múltiplos livros', () => {
      const livro1 = biblioteca.cadastrarLivro('Dom Casmurro');
      const livro2 = biblioteca.cadastrarLivro('1984');
      
      expect(biblioteca.livros.length).toBe(2);
      expect(biblioteca.livros).toContain(livro1);
      expect(biblioteca.livros).toContain(livro2);
    });

    test('deve retornar instância de Livro', () => {
      const livro = biblioteca.cadastrarLivro('Teste');
      expect(livro).toBeInstanceOf(Livro);
    });
  });

  describe('cadastrarUsuario()', () => {
    test('deve cadastrar usuário com sucesso', () => {
      const usuario = biblioteca.cadastrarUsuario('João Silva');
      
      expect(biblioteca.usuarios).toContain(usuario);
      expect(biblioteca.usuarios.length).toBe(1);
      expect(usuario).toBeInstanceOf(Usuario);
      expect(usuario.nome).toBe('João Silva');
      expect(usuario.livrosEmprestados).toEqual([]);
    });

    test('deve cadastrar múltiplos usuários', () => {
      const usuario1 = biblioteca.cadastrarUsuario('João');
      const usuario2 = biblioteca.cadastrarUsuario('Maria');
      
      expect(biblioteca.usuarios.length).toBe(2);
      expect(biblioteca.usuarios).toContain(usuario1);
      expect(biblioteca.usuarios).toContain(usuario2);
    });

    test('deve retornar instância de Usuario', () => {
      const usuario = biblioteca.cadastrarUsuario('Teste');
      expect(usuario).toBeInstanceOf(Usuario);
    });
  });

  describe('emprestarLivro()', () => {
    let usuario, livro;

    beforeEach(() => {
      usuario = biblioteca.cadastrarUsuario('João');
      livro = biblioteca.cadastrarLivro('Dom Casmurro');
    });

    test('deve emprestar livro com sucesso', () => {
      biblioteca.emprestarLivro(usuario, livro);
      
      expect(usuario.livrosEmprestados).toContain(livro);
      expect(usuario.livrosEmprestados.length).toBe(1);
      expect(livro.disponivel).toBe(false);
    });

    test('deve lançar erro ao emprestar livro já emprestado', () => {
      biblioteca.emprestarLivro(usuario, livro);
      
      const outroUsuario = biblioteca.cadastrarUsuario('Maria');
      expect(() => biblioteca.emprestarLivro(outroUsuario, livro))
        .toThrow('Livro já emprestado!');
    });

    test('deve lançar erro ao exceder limite de livros', () => {
      const livro2 = biblioteca.cadastrarLivro('1984');
      const livro3 = biblioteca.cadastrarLivro('O Senhor dos Anéis');
      const livro4 = biblioteca.cadastrarLivro('Harry Potter');
      
      biblioteca.emprestarLivro(usuario, livro);
      biblioteca.emprestarLivro(usuario, livro2);
      biblioteca.emprestarLivro(usuario, livro3);
      
      expect(() => biblioteca.emprestarLivro(usuario, livro4))
        .toThrow('Usuário já possui o limite de 3 livros!');
    });
  });

  describe('devolverLivro()', () => {
    let usuario, livro;

    beforeEach(() => {
      usuario = biblioteca.cadastrarUsuario('João');
      livro = biblioteca.cadastrarLivro('Dom Casmurro');
      biblioteca.emprestarLivro(usuario, livro);
    });

    test('deve devolver livro com sucesso', () => {
      biblioteca.devolverLivro(usuario, livro);
      
      expect(usuario.livrosEmprestados).not.toContain(livro);
      expect(usuario.livrosEmprestados.length).toBe(0);
      expect(livro.disponivel).toBe(true);
    });

    test('deve funcionar ao devolver livro não emprestado pelo usuário', () => {
      const outroLivro = biblioteca.cadastrarLivro('1984');
      
      // Não deve lançar erro ao devolver livro não emprestado
      expect(() => biblioteca.devolverLivro(usuario, outroLivro)).not.toThrow();
      expect(usuario.livrosEmprestados.length).toBe(1); // Mantém o primeiro livro
      expect(outroLivro.disponivel).toBe(true); // Livro continua disponível
    });

    test('deve permitir novo empréstimo após devolução', () => {
      biblioteca.devolverLivro(usuario, livro);
      
      // Pode emprestar novamente
      expect(() => biblioteca.emprestarLivro(usuario, livro)).not.toThrow();
      expect(usuario.livrosEmprestados).toContain(livro);
      expect(livro.disponivel).toBe(false);
    });
  });

  describe('Integração completa', () => {
    test('deve gerenciar fluxo completo de empréstimo', () => {
      // Cadastra usuário e livros
      const usuario = biblioteca.cadastrarUsuario('Maria');
      const livro1 = biblioteca.cadastrarLivro('Dom Casmurro');
      const livro2 = biblioteca.cadastrarLivro('1984');
      
      // Verifica estado inicial
      expect(biblioteca.usuarios.length).toBe(1);
      expect(biblioteca.livros.length).toBe(2);
      expect(usuario.livrosEmprestados.length).toBe(0);
      expect(livro1.disponivel).toBe(true);
      expect(livro2.disponivel).toBe(true);
      
      // Empresta livros
      biblioteca.emprestarLivro(usuario, livro1);
      biblioteca.emprestarLivro(usuario, livro2);
      
      // Verifica estado após empréstimo
      expect(usuario.livrosEmprestados.length).toBe(2);
      expect(usuario.livrosEmprestados).toContain(livro1);
      expect(usuario.livrosEmprestados).toContain(livro2);
      expect(livro1.disponivel).toBe(false);
      expect(livro2.disponivel).toBe(false);
      
      // Devolve um livro
      biblioteca.devolverLivro(usuario, livro1);
      
      // Verifica estado após devolução
      expect(usuario.livrosEmprestados.length).toBe(1);
      expect(usuario.livrosEmprestados).not.toContain(livro1);
      expect(usuario.livrosEmprestados).toContain(livro2);
      expect(livro1.disponivel).toBe(true);
      expect(livro2.disponivel).toBe(false);
    });
  });

  describe('Testes com objetos externos', () => {
    test('deve funcionar com usuário e livro não cadastrados', () => {
      const usuarioExterno = new Usuario('Usuário Externo');
      const livroExterno = new Livro('Livro Externo');
      
      // Deve funcionar mesmo com objetos não cadastrados na biblioteca
      expect(() => biblioteca.emprestarLivro(usuarioExterno, livroExterno)).not.toThrow();
      expect(usuarioExterno.livrosEmprestados).toContain(livroExterno);
      expect(livroExterno.disponivel).toBe(false);
      
      // Devolução também deve funcionar
      expect(() => biblioteca.devolverLivro(usuarioExterno, livroExterno)).not.toThrow();
      expect(usuarioExterno.livrosEmprestados).not.toContain(livroExterno);
      expect(livroExterno.disponivel).toBe(true);
    });
  });
});