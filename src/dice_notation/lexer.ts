import { Lexer } from "chevrotain";
import { tokens } from "./tokens";

export class DiceLexer extends Lexer {
    private static _instance = new Lexer(Object.values(tokens));
    public static get instance() {
        return DiceLexer._instance;
    }
}
