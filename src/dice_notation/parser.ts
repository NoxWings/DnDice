import { lexer, tokens } from "./lexer";
import { Parser } from "chevrotain";

// ---Grammar---

// expression
//     : (atomicExpression | binaryExpression) [operation]
// subExpression
//     : LParen expression RParen
// operation
//     : operator expression
// atomicExpression
//     : Dice | Integer
// operator
//     : Plus | Minus | Multiply

export class DiceParser extends Parser {
    private static _instance: DiceParser;

    public static get instance () {
        if (!DiceParser._instance) {
            DiceParser._instance = new DiceParser();
        }
        return DiceParser._instance;
    }

    private expression: any;
    private subExpression: any;
    private operation: any;
    private operator: any;
    private atomicExpression: any;

    private constructor () {
        super([], tokens);

        this.RULE("expression", () => {
            this.OR([
                { ALT: () => { this.SUBRULE(this.atomicExpression); } },
                { ALT: () => { this.SUBRULE(this.subExpression); } }
            ]);
            this.OPTION(() => {
                this.SUBRULE(this.operation);
            });
        });
        this.RULE("subExpression", () => {
            this.CONSUME(tokens.LParen);
            this.SUBRULE(this.expression);
            this.CONSUME(tokens.RParen);
        });
        this.RULE("operation", () => {
            this.SUBRULE(this.operator);
            this.SUBRULE(this.expression);
        });
        this.RULE("atomicExpression", () => {
            this.OR([
                { ALT: () => { this.CONSUME(tokens.Dice); } },
                { ALT: () => { this.CONSUME(tokens.Integer); } }
            ]);
        });
        this.RULE("operator", () => {
            this.OR([
                { ALT: () => { this.CONSUME(tokens.Plus); } },
                { ALT: () => { this.CONSUME(tokens.Minus); } },
                { ALT: () => { this.CONSUME(tokens.Multiply); } }
            ]);
        });

        this.performSelfAnalysis();
    }

    public parse (input: string) {
        const lexingResult = lexer.tokenize(input);

        if (lexingResult.errors.length > 0) {
            throw new Error("Lexing errors detected");
        }

        this.input = lexingResult.tokens;

        this["expression"]();

        if (this.errors.length > 0) {
            const errorMessages = [
                "Parsing errors detected",
                ...this.errors.map(error => error.message)
            ].join("\n");

            throw new Error(errorMessages);
        }
    }
}
