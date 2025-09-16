// test-biblioteca.js
const assert = require('assert');

// Importando as classes do sistema
const { Biblioteca } = require('../../src/biblioteca.js');
const { Livro } = require('../../src/livro.js');
const { Usuario } = require('../../src/usuario.js');

// Teste principal do fluxo da biblioteca
function testFluxoCompletoBiblioteca() {
    console.log('=== INICIANDO TESTE DO SISTEMA DA BIBLIOTECA ===');
    
    // Criando uma nova biblioteca para testar
    const biblioteca = new Biblioteca();
    console.log('Biblioteca criada...');
    
    // Testando cadastro de usuários
    console.log('\n--- Cadastrando usuários ---');
    const usuario1 = biblioteca.cadastrarUsuario('João Silva');
    const usuario2 = biblioteca.cadastrarUsuario('Maria Santos');
    
    console.log('Verificando se os usuários foram cadastrados corretamente...');
    assert.strictEqual(biblioteca.usuarios.length, 2, 'Deve ter 2 usuários cadastrados');
    assert.strictEqual(usuario1.nome, 'João Silva', 'Nome do primeiro usuário está errado');
    assert.strictEqual(usuario2.nome, 'Maria Santos', 'Nome do segundo usuário está errado');
    console.log('Usuários cadastrados com sucesso!');
    
    // Testando cadastro de livros
    console.log('\n--- Cadastrando livros ---');
    const livro1 = biblioteca.cadastrarLivro('Dom Casmurro');
    const livro2 = biblioteca.cadastrarLivro('1984');
    const livro3 = biblioteca.cadastrarLivro('O Senhor dos Anéis');
    const livro4 = biblioteca.cadastrarLivro('Harry Potter');
    
    console.log('Verificando se os livros foram cadastrados...');
    assert.strictEqual(biblioteca.livros.length, 4, 'Deve ter 4 livros cadastrados');
    assert.strictEqual(livro1.titulo, 'Dom Casmurro', 'Título do primeiro livro está errado');
    assert.strictEqual(livro2.titulo, '1984', 'Título do segundo livro está errado');
    console.log('Livros cadastrados com sucesso!');
    
    // Verificando disponibilidade inicial dos livros
    console.log('\n--- Verificando livros disponíveis ---');
    const livrosDisponiveis = biblioteca.listarLivros();
    assert.strictEqual(livrosDisponiveis.length, 4, 'Todos os 4 livros devem estar disponíveis');
    
    livrosDisponiveis.forEach(livro => {
        assert.strictEqual(livro.disponivel, true, 'Todo livro deve começar disponível');
    });
    console.log('Todos os livros estão disponíveis para empréstimo!');
    
    // Testando empréstimo de livros
    console.log('\n--- Testando empréstimos ---');
    biblioteca.emprestarLivro(usuario1, livro1);
    biblioteca.emprestarLivro(usuario1, livro2);
    
    console.log('Verificando se os empréstimos funcionaram...');
    assert.strictEqual(usuario1.livrosEmprestados.length, 2, 'João deve ter 2 livros emprestados');
    assert.strictEqual(livro1.disponivel, false, 'Dom Casmurro deve estar emprestado');
    assert.strictEqual(livro2.disponivel, false, '1984 deve estar emprestado');
    console.log('Empréstimos realizados com sucesso!');
    
    // Testando tentativa de pegar livro já emprestado
    console.log('\n--- Testando erro: livro já emprestado ---');
    try {
        biblioteca.emprestarLivro(usuario2, livro1);
        assert.fail('Deveria ter dado erro ao tentar pegar livro já emprestado');
    } catch (error) {
        assert.strictEqual(error.message, 'Livro já emprestado!', 'Mensagem de erro incorreta');
    }
    console.log('Sistema impediu empréstimo de livro já emprestado!');
    
    // Testando limite máximo de empréstimos
    console.log('\n--- Testando limite de 3 livros por usuário ---');
    biblioteca.emprestarLivro(usuario1, livro3);
    assert.strictEqual(usuario1.livrosEmprestados.length, 3, 'João deve ter 3 livros agora');
    
    console.log('Tentando pegar o quarto livro (deve falhar)...');
    try {
        biblioteca.emprestarLivro(usuario1, livro4);
        assert.fail('Deveria ter dado erro ao exceder limite de empréstimos');
    } catch (error) {
        assert.strictEqual(error.message, 'Usuário já possui o limite de 3 livros!', 'Mensagem de erro incorreta');
    }
    console.log('Sistema impediu empréstimo acima do limite!');
    
    // Testando devolução de livros
    console.log('\n--- Testando devoluções ---');
    biblioteca.devolverLivro(usuario1, livro1);
    
    console.log('Verificando se a devolução funcionou...');
    assert.strictEqual(usuario1.livrosEmprestados.length, 2, 'João deve ter 2 livros após devolver um');
    assert.strictEqual(livro1.disponivel, true, 'Dom Casmurro deve estar disponível novamente');
    console.log('✓ Devolução realizada com sucesso!');
    
    // Testando novo empréstimo após devolução
    console.log('\n--- Testando novo empréstimo com livro devolvido ---');
    biblioteca.emprestarLivro(usuario2, livro1);
    assert.strictEqual(usuario2.livrosEmprestados.length, 1, 'Maria deve ter 1 livro emprestado');
    assert.strictEqual(livro1.disponivel, false, 'Dom Casmurro deve estar emprestado novamente');
    console.log('Novo empréstimo funcionou corretamente!');
    
    // Verificando situação final dos livros
    console.log('\n--- Verificando situação final dos livros ---');
    const livrosFinais = biblioteca.listarLivros();
    
    const livro1Info = livrosFinais.find(l => l.titulo === 'Dom Casmurro');
    const livro2Info = livrosFinais.find(l => l.titulo === '1984');
    const livro3Info = livrosFinais.find(l => l.titulo === 'O Senhor dos Anéis');
    const livro4Info = livrosFinais.find(l => l.titulo === 'Harry Potter');
    
    assert.strictEqual(livro1Info.disponivel, false, 'Dom Casmurro deve estar com Maria');
    assert.strictEqual(livro2Info.disponivel, false, '1984 deve estar com João');
    assert.strictEqual(livro3Info.disponivel, false, 'O Senhor dos Anéis deve estar com João');
    assert.strictEqual(livro4Info.disponivel, true, 'Harry Potter deve estar disponível');
    
    console.log('Situação final dos livros está correta!');
    console.log('\n PARABÉNS! Todos os testes do fluxo principal passaram!');
}

// Testes básicos das classes individualmente
function testUnitarios() {
    console.log('\n=== INICIANDO TESTES UNITÁRIOS ===');
    
    // Testando a classe Livro
    console.log('\n--- Testando classe Livro ---');
    const livro = new Livro('Memórias Póstumas de Brás Cubas');
    assert.strictEqual(livro.titulo, 'Memórias Póstumas de Brás Cubas', 'Título do livro está errado');
    assert.strictEqual(livro.disponivel, true, 'Livro deve começar disponível');
    
    livro.emprestar();
    assert.strictEqual(livro.disponivel, false, 'Livro deve ficar indisponível após empréstimo');
    
    livro.devolver();
    assert.strictEqual(livro.disponivel, true, 'Livro deve voltar a ficar disponível após devolução');
    console.log('Classe Livro funciona corretamente!');
    
    // Testando a classe Usuario
    console.log('\n--- Testando classe Usuario ---');
    const usuario = new Usuario('Carlos Drummond');
    assert.strictEqual(usuario.nome, 'Carlos Drummond', 'Nome do usuário está errado');
    assert.strictEqual(usuario.livrosEmprestados.length, 0, 'Usuário não deve ter livros inicialmente');
    
    const livroTeste = new Livro('A Rosa do Povo');
    usuario.pegarLivro(livroTeste);
    assert.strictEqual(usuario.livrosEmprestados.length, 1, 'Usuário deve ter 1 livro após pegar emprestado');
    
    usuario.devolverLivro(livroTeste);
    assert.strictEqual(usuario.livrosEmprestados.length, 0, 'Usuário não deve ter livros após devolver');
    console.log('Classe Usuario funciona corretamente!');
}

// Executando todos os testes
console.log('INICIANDO TESTES DO SISTEMA DE BIBLIOTECA');
console.log('Desenvolvido por: Antonio Tavares e Marcele Rodrigues');
console.log('Disciplina: Teste e Qualidade de Software - 4º Período Matutino');
console.log('Professor: Ronilson Cavalcante da Silva\n');

try {
    testUnitarios();
    testFluxoCompletoBiblioteca();
    console.log('\n TODOS OS TESTES PASSARAM! O sistema está funcionando perfeitamente!');
} catch (error) {
    console.error('\n ALGO DEU ERRADO:', error.message);
    console.log('Detalhe do erro:', error);
    process.exit(1);
}