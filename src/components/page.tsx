import { h, Component } from "preact";
import { Roll } from "../models/Roll";

export class Page extends Component {
    public render() {
        const magicMissile = new Roll("3d4+3");
        const magicMissile2 = new Roll("3(1d4+1)");
        const learnSpell = new Roll("1d20+1d6+1d4");

        return <div>
            <p>{magicMissile.string}</p>
            <p>{magicMissile2.string}</p>
            <p>{learnSpell.string}</p>
        </div>;
    }
}
