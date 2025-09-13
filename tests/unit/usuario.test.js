// usuario.test.js
import assert from "assert";
import { Usuario } from "../../src/usuario.js";
import { Livro } from "../../src/livro.js";

function runTests() {
  let usuario;
  let livro1, livro2, livro3, livro4;

  // beforeEach manual
  function reset() {
    usuario = new Usuario("Fiat Argo");
    livro1 = new Livro("Um porquinho");
    livro2 = new Livro("Os dois porquinhos");
    livro3 = new Livro("Os tres porquinhos");
    livro4 = new Livro("Os quatro porquinhos");
  }

  // --- Teste 1: criação do usuário ---
  {
    reset();
    assert.strictEqual(usuario.nome, "Fiat Argo");
    assert.deepStrictEqual(usuario.livrosEmprestados, []);
    assert.strictEqual(usuario.livrosEmprestados.length, 0);
    console.log("✔ Usuario criado corretamente com array vazio");
  }

  // --- Teste 2: emprestar com sucesso ---
  {
    reset();
    usuario.pegarLivro(livro1);

    assert.ok(usuario.livrosEmprestados.includes(livro1));
    assert.strictEqual(usuario.livrosEmprestados.length, 1);
    assert.strictEqual(livro1.disponivel, false);
    console.log("✔ Usuario pega um livro com sucesso");
  }

  // --- Teste 3: pegar mais de um livro ---
  {
    reset();
    usuario.pegarLivro(livro1);
    usuario.pegarLivro(livro2);

    assert.ok(usuario.livrosEmprestados.includes(livro1));
    assert.ok(usuario.livrosEmprestados.includes(livro2));
    assert.strictEqual(usuario.livrosEmprestados.length, 2);
    assert.strictEqual(livro1.disponivel, false);
    assert.strictEqual(livro2.disponivel, false);
    console.log("✔ Usuario pega múltiplos livros");
  }

  // --- Teste 4: limite de 3 livros ---
  {
    reset();
    usuario.pegarLivro(livro1);
    usuario.pegarLivro(livro2);
    usuario.pegarLivro(livro3);

    let erro = null;
    try {
      usuario.pegarLivro(livro4);
    } catch (e) {
      erro = e;
    }

    assert.ok(erro instanceof Error, "Deveria lançar erro ao ultrapassar limite de 3 livros");
    assert.strictEqual(erro.message, "Usuário já possui o limite de 3 livros!");
    assert.strictEqual(usuario.livrosEmprestados.length, 3);
    console.log("✔ Usuario não pode pegar mais de 3 livros");
  }

  // --- Teste 5: pegar livro indisponível ---
  {
    reset();
    const usuario2 = new Usuario("Fiat Mobi");
    usuario2.pegarLivro(livro1);

    let erro = null;
    try {
      usuario.pegarLivro(livro1);
    } catch (e) {
      erro = e;
    }

    assert.ok(erro instanceof Error, "Deveria lançar erro ao pegar livro indisponível");
    assert.strictEqual(erro.message, "Livro já emprestado!");
    console.log("✔ Usuario não consegue pegar livro indisponível");
  }

  // --- Teste 6: devolver livro específico e manter outros ---
  {
    reset();
    usuario.pegarLivro(livro1);
    usuario.pegarLivro(livro2);
    usuario.devolverLivro(livro1);

    assert.ok(!usuario.livrosEmprestados.includes(livro1));
    assert.ok(usuario.livrosEmprestados.includes(livro2));
    assert.strictEqual(usuario.livrosEmprestados.length, 1);
    assert.strictEqual(livro1.disponivel, true);
    assert.strictEqual(livro2.disponivel, false);
    console.log("✔ Usuario devolve um livro e mantém os outros");
  }
}

runTests();
console.log("\n✅ Todos os testes de Usuario passaram!");