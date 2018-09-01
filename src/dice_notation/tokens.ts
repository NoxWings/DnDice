import { createToken, Lexer } from "chevrotain";

export const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED });

export const LParen = createToken({ name: "LParen", pattern: /\(/ });
export const RParen = createToken({ name: "RParen", pattern: /\)/ });

export const AdditionOperator = createToken({ name: "AdditionOperator", pattern: Lexer.NA });
export const Plus = createToken({ name: "Plus", pattern: /\+/, categories: AdditionOperator });
export const Minus = createToken({ name: "Minus", pattern: /\-/, categories: AdditionOperator });

export const MultiplicationOperator = createToken({ name: "MultiplicationOperator", pattern: Lexer.NA });
export const Multiply = createToken({ name: "Multiply", pattern: /\*/, categories: MultiplicationOperator });

export const DiceModifier = createToken({ name: "DiceModifier", pattern: Lexer.NA })
export const Advantage = createToken({ name: "Advantage", pattern: /H\d*/, categories: DiceModifier });
export const Disadvantage = createToken({ name: "Disadvantage", pattern: /L\d*/, categories: DiceModifier });

export const Dice = createToken({ name: "Dice", pattern: /d\d+/ });
export const Integer = createToken({ name: "Integer", pattern: /\d+/ });

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
