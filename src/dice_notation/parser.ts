import { lexer, tokens } from "./lexer";
import { Parser } from "chevrotain";

// ---Grammar---

// expression
//     : singleExpression { binaryOperator, singleExpression }
// subExpression
//     : LParen expression RParen
// singleExpression
//     : Integer | diceExpression | subExpression
// diceExpression
//     : Dice (Advantage | Disadvantage)
// binaryOperator
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
    private singleExpression: any;
    private diceExpression: any;
    private binaryOperator: any;

    private constructor () {
        super([], tokens);

        this.RULE("expression", () => {
            this.SUBRULE(this.singleExpression);
            this.MANY(() => {
                this.SUBRULE(this.binaryOperator);
                this.SUBRULE2(this.singleExpression);
            });
        });
        this.RULE("subExpression", () => {
            this.CONSUME(tokens.LParen);
            this.SUBRULE(this.expression);
            this.CONSUME(tokens.RParen);
        });
        this.RULE("singleExpression", () => {
            this.OR([
                { ALT: () => { this.CONSUME(tokens.Integer); } },
                { ALT: () => { this.SUBRULE(this.diceExpression); } },
                { ALT: () => { this.SUBRULE(this.subExpression); } }
            ]);
        });
        this.RULE("diceExpression", () => {
            this.CONSUME(tokens.Dice);
            this.OPTION(() => {
                this.OR([
                    { ALT: () => { this.CONSUME(tokens.Advantage); } },
                    { ALT: () => { this.CONSUME(tokens.Disadvantage); } }
                ]);
            });
        });
        this.RULE("binaryOperator", () => {
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
