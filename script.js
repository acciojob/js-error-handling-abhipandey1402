class OutOfRangeError extends Error {
  constructor(arg) {
    const message = `Expression should only consist of integers and +-/* characters and not ${arg}`;
    super(message);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    const message = 'Expression should not have an invalid combination of expression';
    super(message);
    this.name = this.constructor.name;
  }
}

function evalString(input) {
  if (/\+\+|\-\-|\*\*|\/\/|\/\+|\+\//.test(input)) {
    throw new InvalidExprError();
  }

  if (/^[\/*+]/.test(input)) {
    throw new SyntaxError('Expression should not start with invalid operator');
  }

  if (/[\/*+-]$/.test(input)) {
    throw new SyntaxError('Expression should not end with invalid operator');
  }

  const re = /([-+]?[0-9]+)([*+/-]([-+]?[0-9]+))+/g;
  const matches = input.match(re);

  if (!matches || matches[0] !== input) {
    throw new OutOfRangeError(input);
  }

  return eval(input);
}

try {
  const result = evalString('1+2*3-4');
  console.log(result); // expected output: 3
} catch (error) {
  console.error(error);
}
//your code here
