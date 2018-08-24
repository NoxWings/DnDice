import { lexer, tokens } from "./lexer";
import { Parser } from "chevrotain";

// ---Grammar---

// expression
//     : singleExpression { operator, singleExpression }
// subExpression
//     : LParen expression RParen
// singleExpression
//     : Dice | Integer | subExpression
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
    private singleExpression: any;
    private subExpression: any;
    private operator: any;

    private constructor () {
        super([], tokens);

        this.RULE("expression", () => {
            this.SUBRULE(this.singleExpression);
            this.MANY(() => {
                this.SUBRULE(this.operator);
                this.SUBRULE2(this.singleExpression);
            });
        });
        this.RULE("singleExpression", () => {
            this.OR([
                { ALT: () => { this.CONSUME(tokens.Dice); } },
                { ALT: () => { this.CONSUME(tokens.Integer); } },
                { ALT: () => { this.SUBRULE(this.subExpression); } }
            ]);
        });
        this.RULE("subExpression", () => {
            this.CONSUME(tokens.LParen);
            this.SUBRULE(this.expression);
            this.CONSUME(tokens.RParen);
        });
        this.RULE("operator", () => {
            this.OPTION(() => {
                this.OR([
                    { ALT: () => { this.CONSUME(tokens.Plus); } },
                    { ALT: () => { this.CONSUME(tokens.Minus); } },
                    { ALT: () => { this.CONSUME(tokens.Multiply); } }
                ]);
            });
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
