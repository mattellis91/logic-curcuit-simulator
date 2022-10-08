import { EditorItem } from "./editor-item";

export class EditorItemOrGate implements EditorItem {
    html = `
          <div class="gate-content">|</div>
          
    `;
    data = { type : "or", value : null, hasTruthTable: true };
    inputs = 2;
    outputs = 1;
    className = 'or-gate';
}