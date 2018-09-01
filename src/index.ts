import { Roll } from "./Roll";

const magicMissile = new Roll("3d4+3");
const magicMissile2 = new Roll("3(1d4+1)");
const learnSpell = new Roll("1d20+1d6+1d4");

console.log(magicMissile);
console.log(magicMissile2);
console.log(learnSpell);
