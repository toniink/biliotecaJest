# Visão Geral do Repositório

Este repositório é um exemplo prático e educativo de como implementar testes automatizados em JavaScript usando Jest. O projeto demonstra uma aplicação simples de biblioteca com empréstimo de livros, servindo como base para aprender conceitos de testes unitários, de integração e end-to-end.

O sistema simula uma biblioteca onde usuários podem pegar e devolver livros, com regras de negócio como limite de empréstimos e controle de disponibilidade. O foco principal não é a complexidade da aplicação, mas sim as boas práticas de testagem.

---

## Funcionalidades Principais

- Cadastro de livros e usuários
- Empréstimo de livros com controle de limite (máximo 3 por usuário)
- Devolução de livros
- Validações de disponibilidade e regras de negócio

---

## Tecnologias Utilizadas

- Node.js - Ambiente de execução JavaScript
- Jest - Framework de testes para JavaScript
- Babel - Transpilador para compatibilidade de ES6+
- JavaScript ES6+ - Versão moderna do JavaScript

  ---
  

## Estrutura de Testes

O projeto inclui dois tipos de testes:

- Testes Unitários: Verificam cada classe isoladamente (Livro, Usuario, Biblioteca)
- Testes End-to-End: Simulam fluxos completos do sistema

---

## Como Executar

Pré-requisitos: Node.js instalado

- Clone o repositório
- Instale as dependências: npm install
- Execute os testes: npm test
- Para testes específicos: npm test -- caminho/do/arquivo.test.js

---

## Estrutura do Projeto

src/ - Código fonte da aplicação  
tests/unit/ - Testes unitários  
tests/integration/ - Testes de integração  
tests/e2e/ - Testes end-to-end  
package.json - Configurações e scripts  
