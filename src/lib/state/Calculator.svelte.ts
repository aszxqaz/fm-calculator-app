import Decimal from 'decimal.js-light';

export interface Operator {
  add(a: string, b: string): string;
  sub(a: string, b: string): string;
  div(a: string, b: string): string;
  mul(a: string, b: string): string;
  parse(a: string): string;
}

export interface Formatter {
  format(n: string): string;
}

class DefaultFormatter implements Formatter {
  format(input: string): string {
    const parts = input.split('.');
    let split = [];
    for (let i = parts[0].length; i > 0; i -= 3) {
      split.unshift(parts[0].substring(i - 3, i));
    }
    return (
      split.join(',') + (typeof parts[1] != 'undefined' ? `.${parts[1]}` : '')
    );
  }
}

class DecimalOperator implements Operator {
  private exec<T>(cb: () => T): T {
    try {
      return cb();
    } catch (e: any) {
      throw new Error(e.message.replace(/\[.*\]/g, '').trim());
    }
  }

  add(a: string, b: string): string {
    return this.exec(() => new Decimal(a).add(new Decimal(b)).toString());
  }

  sub(a: string, b: string): string {
    return this.exec(() => new Decimal(a).sub(new Decimal(b)).toString());
  }

  div(a: string, b: string): string {
    return this.exec(() => new Decimal(a).div(new Decimal(b)).toString());
  }

  mul(a: string, b: string): string {
    return this.exec(() => new Decimal(a).mul(new Decimal(b)).toString());
  }

  parse(a: string): string {
    return new Decimal(a).toString();
  }
}

type CalculatorOpts = {
  maxLen?: number;
};

export class Calculator {
  constructor(
    private readonly operator: Operator,
    private readonly formatter: Formatter,
    private readonly opts: CalculatorOpts = { maxLen: 12 }
  ) {
    this.addDigit = this.addDigit.bind(this);
    this.addComma = this.addComma.bind(this);
    this.del = this.del.bind(this);
    this.setOp = this.setOp.bind(this);
    this.reset = this.reset.bind(this);
    this.equal = this.equal.bind(this);
  }

  static initial = {
    input: '0',
    op: '',
    first: undefined as string | undefined,
    error: '',
  };

  state = $state(Calculator.initial);

  display = $derived.by(() => {
    if (this.state.error) {
      return this.state.error;
    }

    if (!this.state.input) {
      return `${this.formatter.format(this.state.first!)} ${this.state.op} `;
    }

    return this.formatter.format(this.state.input);
  });

  addDigit(digit: string) {
    this.state.error = '';

    if (this.state.first && !this.state.op && !this.state.input) {
      this.state.first = undefined;
    }

    if (!this.state.op) {
      if (this.state.input == '0') {
        this.state.input = digit;
        return;
      }
    }

    if (this.state.input.length < this.opts.maxLen!) {
      this.state.input += digit;
    }
  }

  addComma() {
    if (this.state.error) return;

    if (!this.state.input.includes('.')) {
      this.state.input += '.';
    }
  }

  del() {
    if (this.state.input.length == 1) {
      this.state.input = '0';
    } else {
      this.state.input = this.state.input.substring(
        0,
        this.state.input.length - 1
      );
    }
  }

  setOp(op: string) {
    if (this.state.error) return;

    if (!this.state.first) {
      this.state.op = op;
      this.state.first = this.operator.parse(this.state.input);
      this.state.input = '';
    } else if (!this.state.input) {
      this.state.op = op;
    } else {
      this.calc();
      this.state.op = op;
    }
  }

  equal() {
    if (this.state.first && this.state.input) {
      this.calc();
      this.state.op = '';
    }
  }

  private calc() {
    try {
      this.state.first = this.getResult();
      this.state.input = '';
    } catch (e: any) {
      this.reset();
      this.state.error = e.message;
    }
  }

  private getResult() {
    const ops = {
      '-': (a: string, b: string) => this.operator.sub(a, b),
      '+': (a: string, b: string) => this.operator.add(a, b),
      '*': (a: string, b: string) => this.operator.mul(a, b),
      '/': (a: string, b: string) => this.operator.div(a, b),
    };
    return ops[this.state.op as keyof typeof ops](
      this.state.first!,
      this.state.input
    );
  }

  reset() {
    this.state = Calculator.initial;
  }
}

export const calculator = new Calculator(
  new DecimalOperator(),
  new DefaultFormatter()
);
