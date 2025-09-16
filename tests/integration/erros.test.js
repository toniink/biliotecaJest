// erros.test.js
const assert = require('assert');
const { Biblioteca } = require('../../src/biblioteca.js');
const { Livro } = require('../../src/livro.js');
const { Usuario } = require('../../src/usuario.js');
console.log('Vamos testar se os erros estão funcionando direito...');
console.log('');

// Teste 1: Não pode pegar livro que já tá emprestado
function testeEmprestimoDuplicado() {
    console.log('1. Testando se livro já emprestado dá erro');
    
    const biblioteca = new Biblioteca();
    const livro = biblioteca.cadastrarLivro('Dom Casmurro');
    const maria = biblioteca.cadastrarUsuario('Maria');
    const joao = biblioteca.cadastrarUsuario('João');
    
    // Maria pega o livro primeiro
    biblioteca.emprestarLivro(maria, livro);
    
    // João tenta pegar o mesmo livro
    let pegouErro = false;
    try {
        biblioteca.emprestarLivro(joao, livro);
    } catch (erro) {
        pegouErro = true;
        assert.strictEqual(erro.message, 'Livro já emprestado!');
    }
    
    if (!pegouErro) {
        throw new Error('João conseguiu pegar livro que já tava emprestado!');
    }
    
    console.log('João não conseguiu pegar livro da Maria');
    console.log('');
}

// Teste 2: Limite de 3 livros por pessoa
function testeLimiteDeLivros() {
    console.log('2. Testando se ninguém passa de 3 livros');
    
    const biblioteca = new Biblioteca();
    const ana = biblioteca.cadastrarUsuario('Ana');
    
    // Cria 4 livros pra testar
    const livro1 = biblioteca.cadastrarLivro('Livro 1');
    const livro2 = biblioteca.cadastrarLivro('Livro 2');
    const livro3 = biblioteca.cadastrarLivro('Livro 3');
    const livro4 = biblioteca.cadastrarLivro('Livro 4');
    
    // Ana pega 3 livros - deve funcionar
    biblioteca.emprestarLivro(ana, livro1);
    biblioteca.emprestarLivro(ana, livro2);
    biblioteca.emprestarLivro(ana, livro3);
    
    // Verifica se tem 3 livros mesmo
    if (ana.livrosEmprestados.length !== 3) {
        throw new Error('Ana devia ter 3 livros, mas tem ' + ana.livrosEmprestados.length);
    }
    
    // Tenta pegar o 4º livro - deve dar pau
    let deuPau = false;
    try {
        biblioteca.emprestarLivro(ana, livro4);
    } catch (erro) {
        deuPau = true;
        assert.strictEqual(erro.message, 'Usuário já possui o limite de 3 livros!');
    }
    
    if (!deuPau) {
        throw new Error('Ana conseguiu pegar 4 livros! Isso não devia acontecer!');
    }
    
    console.log('Ana não passou do limite de 3 livros');
    console.log('');
}

// Teste 3: Livro não deixa emprestar duas vezes
function testeLivroEmprestado() {
    console.log('3. Testando se livro barrra empréstimo duplo');
    
    const livro = new Livro('O Cortiço');
    
    // Primeira vez funciona
    livro.emprestar();
    
    // Segunda vez tem que dar erro
    let travou = false;
    try {
        livro.emprestar();
    } catch (erro) {
        travou = true;
        assert.strictEqual(erro.message, 'Livro já emprestado!');
    }
    
    if (!travou) {
        throw new Error('Livro deixou emprestar duas vezes seguidas!');
    }
    
    console.log('Livro não deixou emprestar de novo');
    console.log('');
}

// Teste 4: Devolução funciona direito
function testeDevolucao() {
    console.log('4. Testando se devolver livro funciona');
    
    const biblioteca = new Biblioteca();
    const livro = biblioteca.cadastrarLivro('Memórias Póstumas');
    const carlos = biblioteca.cadastrarUsuario('Carlos');
    
    // Carlos pega o livro
    biblioteca.emprestarLivro(carlos, livro);
    
    // Verifica se tá emprestado
    if (livro.disponivel) {
        throw new Error('Livro devia estar emprestado!');
    }
    
    if (carlos.livrosEmprestados.length !== 1) {
        throw new Error('Carlos devia ter 1 livro!');
    }
    
    // Carlos devolve
    biblioteca.devolverLivro(carlos, livro);
    
    // Verifica se ficou disponível
    if (!livro.disponivel) {
        throw new Error('Livro devia estar disponível depois de devolver!');
    }
    
    if (carlos.livrosEmprestados.length !== 0) {
        throw new Error('Carlos não devia ter mais livros!');
    }
    
    console.log('Carlos devolveu o livro certo');
    console.log('');
}

// Teste 5: Livro fica disponível depois de devolver
function testeDisponibilidade() {
    console.log('5. Testando se outro pode pegar livro devolvido');
    
    const biblioteca = new Biblioteca();
    const livro = biblioteca.cadastrarLivro('Iracema');
    const maria = biblioteca.cadastrarUsuario('Maria');
    const pedro = biblioteca.cadastrarUsuario('Pedro');
    
    // Maria pega e devolve
    biblioteca.emprestarLivro(maria, livro);
    biblioteca.devolverLivro(maria, livro);
    
    // Pedro pega o mesmo livro
    biblioteca.emprestarLivro(pedro, livro);
    
    // Verifica se Pedro pegou
    if (livro.disponivel) {
        throw new Error('Livro devia estar com Pedro!');
    }
    
    if (pedro.livrosEmprestados.length !== 1) {
        throw new Error('Pedro devia ter 1 livro!');
    }
    
    console.log('Pedro pegou o livro que Maria devolveu');
    console.log('');
}

// Teste extra: Ver se lista de livros funciona
function testeListaLivros() {
    console.log('6. Testando se a lista mostra direito');
    
    const biblioteca = new Biblioteca();
    const livro1 = biblioteca.cadastrarLivro('Livro A');
    const livro2 = biblioteca.cadastrarLivro('Livro B');
    const usuario = biblioteca.cadastrarUsuario('Teste');
    
    // Pega um livro
    biblioteca.emprestarLivro(usuario, livro1);
    
    const lista = biblioteca.listarLivros();
    
    // Verifica a lista
    if (lista.length !== 2) {
        throw new Error('Lista devia ter 2 livros!');
    }
    
    const livroA = lista.find(l => l.titulo === 'Livro A');
    const livroB = lista.find(l => l.titulo === 'Livro B');
    
    if (!livroA || !livroB) {
        throw new Error('Não encontrou os livros na lista!');
    }
    
    if (livroA.disponivel) {
        throw new Error('Livro A devia estar emprestado!');
    }
    
    if (!livroB.disponivel) {
        throw new Error('Livro B devia estar disponível!');
    }
    
    console.log('Lista mostra certinho quais livros tão emprestados');
    console.log('');
}

// Rodando tudo
try {
    console.log('Começando os testes...');
    console.log('======================');
    
    testeEmprestimoDuplicado();
    testeLimiteDeLivros();
    testeLivroEmprestado();
    testeDevolucao();
    testeDisponibilidade();
    testeListaLivros();
    
    console.log('======================');
    console.log('Tudo certo! Os erros tão funcionando perfeito!');
    console.log('O sistema tá seguro contra empréstimos errados!');
    
} catch (erro) {
    console.log('');
    console.log('Opa, deu problema:', erro.message);
    console.log('Algo não tá funcionando como devia...');
    process.exit(1);
}