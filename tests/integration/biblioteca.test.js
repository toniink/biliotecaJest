// test-biblioteca.js
const assert = require('assert');

// Importando as classes
const { Biblioteca } = require('../../src/biblioteca.js');
const { Livro } = require('../../src/livro.js');
const { Usuario } = require('../../src/usuario.js');

// Teste da biblioteca
function testBiblioteca() {
    console.log('Iniciando testes da biblioteca...');
    
    // Teste 1: Cadastro de livros e usuários
    console.log('Teste 1 - Cadastro básico');
    const biblioteca = new Biblioteca();
    
    const livro1 = biblioteca.cadastrarLivro('Dom Casmurro');
    const livro2 = biblioteca.cadastrarLivro('O Cortiço');
    
    const usuario1 = biblioteca.cadastrarUsuario('Maria');
    const usuario2 = biblioteca.cadastrarUsuario('João');
    
    assert.strictEqual(biblioteca.livros.length, 2);
    assert.strictEqual(biblioteca.usuarios.length, 2);
    assert.strictEqual(livro1.titulo, 'Dom Casmurro');
    assert.strictEqual(usuario1.nome, 'Maria');
    console.log('✓ Cadastro funcionando');
    
    // Teste 2: Listagem de livros
    console.log('Teste 2 - Listagem de livros');
    const listaLivros = biblioteca.listarLivros();
    
    assert.strictEqual(listaLivros.length, 2);
    assert.strictEqual(listaLivros[0].titulo, 'Dom Casmurro');
    assert.strictEqual(listaLivros[0].disponivel, true);
    assert.strictEqual(listaLivros[1].titulo, 'O Cortiço');
    console.log('Listagem funcionando');
    
    // Teste 3: Empréstimo de livro
    console.log('Teste 3 - Empréstimo de livro');
    biblioteca.emprestarLivro(usuario1, livro1);
    
    assert.strictEqual(usuario1.livrosEmprestados.length, 1);
    assert.strictEqual(usuario1.livrosEmprestados[0].titulo, 'Dom Casmurro');
    assert.strictEqual(livro1.disponivel, false);
    console.log('✓ Empréstimo funcionando');
    
    // Teste 4: Tentativa de emprestar livro já emprestado
    console.log('Teste 4 - Tentativa de empréstimo duplicado');
    try {
        biblioteca.emprestarLivro(usuario2, livro1);
        assert.fail('Deveria ter falhado');
    } catch (error) {
        assert.strictEqual(error.message, 'Livro já emprestado!');
    }
    console.log('Bloqueio de empréstimo duplicado funcionando');
    
    // Teste 5: Devolução de livro
    console.log('Teste 5 - Devolução de livro');
    biblioteca.devolverLivro(usuario1, livro1);
    
    assert.strictEqual(usuario1.livrosEmprestados.length, 0);
    assert.strictEqual(livro1.disponivel, true);
    console.log('Devolução funcionando');
    
    // Teste 6: Novo empréstimo após devolução
    console.log('Teste 6 - Novo empréstimo');
    biblioteca.emprestarLivro(usuario2, livro1);
    
    assert.strictEqual(usuario2.livrosEmprestados.length, 1);
    assert.strictEqual(livro1.disponivel, false);
    console.log('Novo empréstimo funcionando');
    
    // Teste 7: Limite de 3 livros por usuário
    console.log('Teste 7 - Limite de empréstimos');
    const livro3 = biblioteca.cadastrarLivro('Memórias Póstumas');
    const livro4 = biblioteca.cadastrarLivro('Iracema');
    const livro5 = biblioteca.cadastrarLivro('O Alienista');
    
    biblioteca.emprestarLivro(usuario1, livro2);
    biblioteca.emprestarLivro(usuario1, livro3);
    biblioteca.emprestarLivro(usuario1, livro4);
    
    assert.strictEqual(usuario1.livrosEmprestados.length, 3);
    
    try {
        biblioteca.emprestarLivro(usuario1, livro5);
        assert.fail('Deveria ter falhado - limite excedido');
    } catch (error) {
        assert.strictEqual(error.message, 'Usuário já possui o limite de 3 livros!');
    }
    console.log('Limite de 3 livros funcionando');
    
    console.log('Todos os testes passaram! A biblioteca está funcionando perfeitamente!');
}

// Executando os testes
try {
    testBiblioteca();
} catch (error) {
    console.error(' Teste falhou:', error.message);
    process.exit(1);
}