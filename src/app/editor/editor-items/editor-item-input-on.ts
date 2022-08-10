import { EditorItem } from "./editor-item";

export class EditorItemInputOn implements EditorItem {
    html = `
        <div><span>1</span></div>
    `
    data = {type:"input", value: 1}
    inputs = 0;
    outputs = 1;
    className = 'input-component-on';
}