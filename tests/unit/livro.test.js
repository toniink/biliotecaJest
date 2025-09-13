// livro.test.js
import assert from "assert";
import { Livro } from "../../src/livro.js";

function runTests() {
  // --- Teste 1: construtor ---
  {
    const livro = new Livro("Os cinco porquinhos");
    assert.strictEqual(livro.titulo, "Os cinco porquinhos");
    assert.strictEqual(livro.disponivel, true);
    console.log("✔ construtor cria livro disponível com título correto");
  }

  // --- Teste 2: emprestar ---
  {
    const livro = new Livro("Os cinco porquinhos");
    livro.emprestar();
    assert.strictEqual(livro.disponivel, false, "Livro deveria ficar indisponível após emprestar");
    console.log("✔ emprestar() deixa livro indisponível");
  }

  // --- Teste 3: devolver ---
  {
    const livro = new Livro("Os cinco porquinhos");
    livro.devolver();
    assert.strictEqual(livro.disponivel, true, "Livro deveria ficar disponível após devolver");
    console.log("✔ devolver() deixa livro disponível");
  }

  // --- Teste 4: emprestar livro já emprestado ---
  {
    const livro = new Livro("Os cinco porquinhos");
    livro.emprestar();
    let erro = null;
    try {
      livro.emprestar();
    } catch (e) {
      erro = e;
    }
    assert.ok(erro instanceof Error, "Deveria lançar erro ao emprestar livro indisponível");
    assert.strictEqual(erro.message, "Livro já emprestado!");
    console.log("✔ emprestar() lança erro quando livro já está emprestado");
  }
}

runTests();
console.log("\n✅ Todos os testes de Livro passaram!");