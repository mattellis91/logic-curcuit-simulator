import { EditorItem } from "./editor-item";

export class EditorItemXorGate implements EditorItem {
    html = `
          <div class="gate-content">^</div>
    `;
    data = { type : "xor", value : null, hasTruthTable: true };
    inputs = 2;
    outputs = 1;
    className = 'xor-gate';
}