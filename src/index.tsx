import { h, render } from "preact";
import { RollPage } from "./components/roll_page";
import "../resources/css/index.css";

window.onload = () => render(<RollPage />, document.body);
