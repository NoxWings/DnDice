import { createToken, Lexer } from "chevrotain";

const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED });

const LParen = createToken({ name: "LParen", pattern: /\(/ });
const RParen = createToken({ name: "RParen", pattern: /\)/ });

const AdditionOperator = createToken({ name: "AdditionOperator", pattern: Lexer.NA });
const Plus = createToken({ name: "Plus", pattern: /\+/, categories: AdditionOperator });
const Minus = createToken({ name: "Minus", pattern: /\-/, categories: AdditionOperator });

const MultiplicationOperator = createToken({ name: "MultiplicationOperator", pattern: Lexer.NA });
const Multiply = createToken({ name: "Multiply", pattern: /\*/, categories: MultiplicationOperator });

const DiceModifier = createToken({ name: "DiceModifier", pattern: Lexer.NA })
const Advantage = createToken({ name: "Advantage", pattern: /H\d*/, categories: DiceModifier });
const Disadvantage = createToken({ name: "Disadvantage", pattern: /L\d*/, categories: DiceModifier });

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
    Integer,
    AdditionOperator,
    MultiplicationOperator,
    DiceModifier
};

export const lexer = new Lexer(Object.values(tokens));
