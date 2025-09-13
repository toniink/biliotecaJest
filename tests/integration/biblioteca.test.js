// biblioteca.test.js
import assert from "assert";
import { Biblioteca } from "../../src/biblioteca.js";
import { Livro } from "../../src/livro.js";

// Helper para resetar biblioteca em cada "bloco"
function runTests() {
  let biblioteca = new Biblioteca();

  // --- Construtor ---
  {
    assert.deepStrictEqual(biblioteca.usuarios, [], "usuarios deve iniciar vazio");
    assert.deepStrictEqual(biblioteca.livros, [], "livros deve iniciar vazio");
    assert.strictEqual(biblioteca.usuarios.length, 0);
    assert.strictEqual(biblioteca.livros.length, 0);
    console.log("✔ Construtor cria arrays vazios");
  }

  // --- cadastrarLivro() com sucesso ---
  {
    const livro = biblioteca.cadastrarLivro("Dom Casmurro");

    assert.ok(biblioteca.livros.includes(livro), "livro deve estar na lista");
    assert.strictEqual(biblioteca.livros.length, 1);
    assert.ok(livro instanceof Livro, "livro deve ser instância de Livro");
    assert.strictEqual(livro.titulo, "Dom Casmurro");
    assert.strictEqual(livro.disponivel, true);
    console.log("✔ cadastrarLivro() funciona com um livro");
  }

  // --- cadastrar múltiplos livros ---
  {
    biblioteca = new Biblioteca();
    const livro1 = biblioteca.cadastrarLivro("Dom Casmurro");
    const livro2 = biblioteca.cadastrarLivro("1984");

    assert.strictEqual(biblioteca.livros.length, 2);
    assert.ok(biblioteca.livros.includes(livro1));
    assert.ok(biblioteca.livros.includes(livro2));
    console.log("✔ cadastrarLivro() cadastra múltiplos livros");
  }

  // --- retornar instância de Livro ---
  {
    biblioteca = new Biblioteca();
    const livro = biblioteca.cadastrarLivro("Teste");
    assert.ok(livro instanceof Livro, "deve retornar instância de Livro");
    console.log("✔ cadastrarLivro() retorna instância de Livro");
  }

  // --- listar livros ---
  {
    biblioteca = new Biblioteca();
    biblioteca.cadastrarLivro("Dom Casmurro");
    biblioteca.cadastrarLivro("1984");

    const lista = biblioteca.listarLivros();

    assert.strictEqual(lista.length, 2);
    assert.deepStrictEqual(lista[0], { titulo: "Dom Casmurro", disponivel: true });
    assert.deepStrictEqual(lista[1], { titulo: "1984", disponivel: true });
    console.log("✔ listarLivros() retorna array com objetos corretos");
  }
}

runTests();
console.log("\n✅ Todos os testes passaram!");