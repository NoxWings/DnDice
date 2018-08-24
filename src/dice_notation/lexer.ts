import { createToken, Lexer } from "chevrotain";

const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED });
const LParen = createToken({ name: "LParen", pattern: /\(/ });
const RParen = createToken({ name: "RParen", pattern: /\)/ });
const Plus = createToken({ name: "Plus", pattern: /\+/ });
const Minus = createToken({ name: "Minus", pattern: /\-/ });
const Multiply = createToken({ name: "Multiply", pattern: /\*/ });
const Advantage = createToken({ name: "Advantage", pattern: /H\d*/ });
const Disadvantage = createToken({ name: "Disadvantage", pattern: /L\d*/ });
const Dice = createToken({ name: "Dice", pattern: /d\d+/ });
const Integer = createToken({ name: "Integer", pattern: /\d+/ });

export const tokens = {
    WhiteSpace,
    LParen,
    RParen,
    Plus,
    Minus,
    Multiply,
    Advantage,
    Disadvantage,
    Dice,
    Integer
};

export const lexer = new Lexer(Object.values(tokens));
