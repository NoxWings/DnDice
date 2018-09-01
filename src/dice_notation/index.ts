import { DiceLexer } from "./lexer";
import { DiceParser } from './parser';
import { DiceInterpreter } from './interpreter';
import { LexingError, ParsingError } from "./errors";
const lexer = DiceLexer.instance;
const parser = DiceParser.instance;
const interpreter = DiceInterpreter.instance;

function checkErrors (instance, ErrorType, errorMessage) {
    if (instance.errors.length > 0) {
        const errors = instance.errors.map(e => e.message).join("\n");
        throw new ErrorType(`${errorMessage}:\n${errors}`);
    }
}

export default function (input: string) {
    const lexingResult = lexer.tokenize(input);
    checkErrors(lexingResult, LexingError, "Lexing errors detected");

    parser.input = lexingResult.tokens;
    const cst = parser.expression();
    checkErrors(parser, ParsingError, "Parsing errors detected");

    return interpreter.visit(cst);
}
