import { EditorItem } from "./editor-item";

export class EditorItemInputVariable implements EditorItem {
    data = {type:"input", value: 1}
    html = `
        <div class="input-variable-container">
            <span>${this.data.value}</span>
        </div>
    `
    inputs = 0;
    outputs = 1;
    className = 'input-component-variable';

}