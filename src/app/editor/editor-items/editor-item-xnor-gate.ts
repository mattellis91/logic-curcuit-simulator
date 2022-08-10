import { EditorItem } from "./editor-item";

export class EditorItemXnorGate implements EditorItem {
    html = `
          <div>
            <div class="title-box" style="text-align:center;">
            XNOR GATE</div>
            <div class="box">
              <table style="margin-left: auto;
              margin-right: auto;" class="truth-table">
              <tr>
            <th>A</th>
              <th>B</th>
              <th>X</th>
            </tr>
            <tr class="xnor-0-0">
              <td>0</td>
              <td>0</td>
              <td>1</td>
            </tr>
            <tr class="xnor-1-0">
              <td>1</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr class="xnor-0-1">
              <td>0</td>
              <td>1</td>
              <td>0</td>
            </tr>
            <tr class="xnor-1-1">
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
              </table>
            </div>
          </div>
          
    `;
    data = { type : "xnor", value : null, hasTruthTable: true };
    inputs = 2;
    outputs = 1;
    className = 'xnor-gate';
}