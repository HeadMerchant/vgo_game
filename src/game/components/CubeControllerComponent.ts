import {Component} from "ecsy";
import {Geometries} from "./GeometryComponent";
import {KeyboardInputManager} from "../input/KeyboardInputManager";

export interface Keybindings {
    down: string,
    left: string,
    up: string,
    right: string
}

export class CubeControllerComponent extends Component{

    keybindings: Keybindings = {
        down: 's',
        left: 'a',
        up: 'w',
        right: 'd',
    }
}