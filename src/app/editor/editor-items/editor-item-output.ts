import { EditorItem } from "./editor-item";

export class EditorItemOutput implements EditorItem
{
    html =  `
    <div></div>
    `;
    data = {type:"output", value: null};
    inputs = 1;
    outputs = 0;
    className = 'output-component';
}    