function Compiler() {
    this.op = {
        '+': true,
        '-': true,
        '*': true,
        '/': true,
    }

    this.count = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }

    this.opAssembly = {
        '+': 'AD',
        '-': 'SU',
        '*': 'MU',
        '/': 'DI',
    }
};

Compiler.prototype.compile = function (program) {
    return this.pass3(this.pass2(this.pass1(program)));
};

Compiler.prototype.tokenize = function (program) {
    var regex = /\s*([-+*/\(\)\[\]]|[A-Za-z]+|[0-9]+)\s*/g;
    return program.replace(regex, ":$1").substring(1).split(':').map(function (tok) {
        return isNaN(tok) ? tok : tok | 0;
    });
};

Compiler.prototype.pass1 = function (program) {
    var tokens = this.tokenize(program);
    const {
        args,
        i
    } = this.parseArguments(tokens)
    return this.parseTokens(args, tokens.slice(i))
};

Compiler.prototype.pass2 = function (ast) {
    return this.constructAST(ast)
}

Compiler.prototype.pass3 = function (ast) {
    ;
    return this.traslateToAssebmly(ast)
};

Compiler.prototype.constructAST = function (ast) {
    if (this.op[ast.op]) {
        if (ast.a.op != 'imm') {
            ast.a = this.constructAST(ast.a)
        }
        if (ast.b.op != 'imm') {
            ast.b = this.constructAST(ast.b)
        }
        if (ast.a.op == 'imm' && ast.b.op == 'imm') {
            return {
                op: 'imm',
                n: this.count[ast.op](ast.a.n, ast.b.n)
            }
        }
    }
    return ast
}

Compiler.prototype.traslateToAssebmly = function (ast) {
    if (this.opAssembly[ast.op]) {
        return [...this.traslateToAssebmly(ast.a), 'PU', ...this.traslateToAssebmly(ast.b), 'SW', 'PO', this.opAssembly[ast.op]];
    }
    return ast.op == 'imm' ? [`IM ${ast.n}`] : [`AR ${ast.n}`]
}

Compiler.prototype.parseArguments = function (tokens) {
    const args = {};
    let count = 0;
    try {
        for (let i = 0; i < tokens.length; i++) {
            if (i === 0 && tokens[i] !== '[') {
                throw new Error('Invalid');
            } else if (i > 0) {
                if (tokens[i] === ']') {
                    i++;
                    return {
                        args,
                        i,
                    };
                }
                args[tokens[i]] = count;
                count++;
            }
        }
    } catch (error) {
        throw new Error(error);
    }
}

Compiler.prototype.checkOpImportance = function (a, b) {
    return (a === b ||
        (a === '*' && b === '/') ||
        (a === '/' && b === '*') ||
        (a === '+' && b === '-') ||
        (a === '-' && b === '+')) || 
        ((a === '*' || a === '/') && 
        (b === '+' || b === '-'))
}

Compiler.prototype.parseTokens = function (args, tokens) {
    const res = [];
    const opList = [];
    const addOp = () => {
        const op = opList.shift();
        const b = res.pop();
        const a = res.pop();
        res.push({
            op,
            a,
            b,
        });
    };
    for (let i = 0; i < tokens.length; i++) {
        if (!(tokens[i] in this.op) && tokens[i] !== '(' && tokens[i] !== ')') {
            if (!isNaN(tokens[i])) {
                res.push({
                    op: 'imm',
                    n: tokens[i],
                });
            } else {
                res.push({
                    op: 'arg',
                    n: args[tokens[i]],
                })
            }

        } else if (tokens[i] in this.op) {
            while (opList.length && this.checkOpImportance(opList[0], tokens[i])) {
                addOp();
            }
            opList.unshift(tokens[i]);
        } else if (tokens[i] === '(') {
            opList.unshift(tokens[i]);
        } else if (tokens[i] === ')') {
            while (opList.length && opList[0] !== '(') {
                addOp();
            }
            if (opList[0] === '(') {
                opList.shift();
            }
        }

    }
    while (opList.length) {
        addOp();
    }
    return res.pop();
}

// can i have u back?