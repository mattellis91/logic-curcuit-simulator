import { EditorItem } from "./editor-item";

export class EditorItemNotGate implements EditorItem {
    html = 
    `
          <div>
            <div class="title-box" style="text-align:center;">
            NOT GATE</div>
            <div class="box">
              <table style="margin-left: auto;
              margin-right: auto;" class="truth-table">
              <tr>
            <th>A</th>
            <th>X</th>
            </tr>
            <tr class="not-0">
              <td>0</td>
              <td>1</td>
            </tr>
            <tr class="not-1">
              <td>1</td>
              <td>0</td>
            </tr>
              </table>
            </div>
          </div>
          
    `;
    data = { type : "not", value : null, hasTruthTable: true };
    inputs = 1;
    outputs = 1;
    className = 'not-gate';
}