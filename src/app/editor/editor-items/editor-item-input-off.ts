import { EditorItem } from "./editor-item"

export class EditorItemInputOff implements EditorItem {
    html = `
        <div><span>0</span></div>
    `
    data = {type:"input", value: 0};
    inputs = 0;
    outputs = 1;
    className = 'input-component-off';
}