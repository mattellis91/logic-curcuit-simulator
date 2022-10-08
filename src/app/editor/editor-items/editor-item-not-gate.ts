import { EditorItem } from "./editor-item";

export class EditorItemNotGate implements EditorItem {
    html = 
    `
          <div class="gate-content">!
          </div>
          
    `;
    data = { type : "not", value : null, hasTruthTable: true };
    inputs = 1;
    outputs = 1;
    className = 'not-gate';
}