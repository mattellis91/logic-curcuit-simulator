import { EditorItem } from "./editor-item";

export class EditorItemAndGate implements EditorItem {
    html = `<div class="gate-content">&</div>`;
    data = { type : "and", value : null, hasTruthTable: true };
    inputs = 2;
    outputs = 1;
    className = 'and-gate';
}