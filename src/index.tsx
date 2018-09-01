import { h, render } from "preact";
import { Page } from "./components/page";
import "../resources/css/index.css";

window.onload = () => render(<Page />, document.body);
