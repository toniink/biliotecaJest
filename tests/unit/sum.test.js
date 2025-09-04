const sum = require('../../src/sum');

test('a soma de 2 + 2 deve ser 4', () => {
    expect(sum(2,2)).toBe(4);
});