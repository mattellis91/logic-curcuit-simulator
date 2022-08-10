import { AfterViewInit, Component } from '@angular/core';
import Drawflow from 'drawflow'
import * as cuid from 'cuid';
import { EditorItemAndGate } from './editor-items/editor-item-and-gate';
import { EditorItemInputOn } from './editor-items/editor-item-input-on';
import { EditorItemInputOff } from './editor-items/editor-item-input-off';
import { EditorItemOutput } from './editor-items/editor-item-output';
import { EditorItemOrGate } from './editor-items/editor-item-or-gate';
import { EditorItemNotGate } from './editor-items/editor-item-not-gate';
import { EditorItemXorGate } from './editor-items/editor-item-xor-gate';
import { EditorItemXnorGate } from './editor-items/editor-item-xnor-gate';
import { EditorItemNandGate } from './editor-items/editor-item-nand-gate';
import { EditorItemNorGate } from './editor-items/editor-item-nor-gate';
import { Editor8BitDisplay } from './editor-items/editor-item-8bit-display';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit{
  title = 'logic-curcuit-client';
  editor:any;
  mobile_item_selec = '';
  mobile_last_move = null;
  currentConnection:any;

  ngAfterViewInit() {
    var id = document.getElementById("drawflow") as any;
    
 
    this.editor = new Drawflow(id);
    this.editor.useuuid = true;
    this.editor.force_first_input = true;

    this.editor.on('nodeCreated', function(id:string) {
      console.log("Node created " + id);
    })

    this.editor.on('nodeRemoved', (id:string) => {
      console.log("Node removed " + id);
    })

    this.editor.on('nodeSelected', (id:string) => {
      console.log("Node selected " + id);
      console.log(this.editor.getNodeFromId(id));
    })

    this.editor.on('connectionCreated', (connection:Record<string, unknown>) => {
      this.currentConnection = connection;
      let outputNode = this.editor.getNodeFromId(connection.output_id); 
      const inputNode = this.editor.getNodeFromId(connection.input_id);
      let pathClass, connectionSVG;
      switch(inputNode.data.type) {
        case "and":
        case "or":
        case "not":
        case "xor":
        case "xnor":
        case "nand":
        case "nor":
          this.validateGateInputs(inputNode);
          pathClass = outputNode.data.value ? 'on-path' : 'off-path';
          connectionSVG = document.getElementsByClassName("node_in_node-"+connection.input_id + " node_out_node-" + connection.output_id)[0];
          connectionSVG.classList.remove('on-path');
          connectionSVG.classList.remove('off-path');
          connectionSVG.classList.add(pathClass);
          break;
        case "output":
          this.validateOutputNode(outputNode.data.value, inputNode);
          pathClass = outputNode.data.value ? 'on-path' : 'off-path';
          connectionSVG = document.getElementsByClassName("node_in_node-"+connection.input_id + " node_out_node-" + connection.output_id)[0];
          connectionSVG.classList.remove('on-path');
          connectionSVG.classList.remove('off-path');
          connectionSVG.classList.add(pathClass);
          break;
        case "8-bit-display":
          this.validate8BitDisplay(inputNode);
          pathClass = outputNode.data.value ? 'on-path' : 'off-path';
          connectionSVG = document.getElementsByClassName("node_in_node-"+connection.input_id + " node_out_node-" + connection.output_id)[0];
          connectionSVG.classList.remove('on-path');
          connectionSVG.classList.remove('off-path');
          connectionSVG.classList.add(pathClass);
          break;
        default:
          break;
      }
    });

    this.editor.on('connectionRemoved', (connection:Record<string, unknown>) => {
      //reset truth table on connection loss
      const inputNode = this.editor.getNodeFromId(connection.input_id);
      if(inputNode.data.hasTruthTable) {
        this.resetGateTruthTable(inputNode);
      }
    });

    this.editor.start();
    
    const andGate = new EditorItemAndGate();
    this.editor.addNode('and-'+cuid(), andGate.inputs, andGate.outputs, 150, 300, andGate.className, andGate.data, andGate.html, false);
    }

    validate8BitDisplay(gate:any) {
      const values = [];
      for(const inputKey of Object.keys(gate.inputs)) {
        const connection = gate.inputs[inputKey].connections[0];
        if(connection) {
          const connectionNode = this.editor.getNodeFromId(connection.node);
          values.push(connectionNode.data.value ? connectionNode.data.value : 0);
        } else {
          values.push(0);
        }
      }
      const numberValue = Number.parseInt(values.join(""),2);
      this.editor.updateNodeDataFromId(gate.id, {...gate.data, value : numberValue});
      const displayContent = document.getElementById("node-"+gate.id)?.getElementsByClassName("drawflow_content_node")[0].getElementsByTagName("div")[0];
      if(displayContent){
        displayContent.innerHTML = " <div class=\"title-box\" style=\"text-align:center;\">8 BIT DISPLAY</div></div>" + "<div>"+values.join("")+"</div><div>"+numberValue+"</div>";
      }
    }

    validateGateInputs(gate:any) {
      switch(gate.data.type) {
        case "and":
        case "or":
        case "nand":
        case "nor":
        case "xor":
        case "xnor":
          const inputOneConnections = gate.inputs.input_1.connections;
          const inputTwoConnections = gate.inputs.input_2.connections;
          if(inputOneConnections.length && inputTwoConnections.length) {
            const inputOneValue = this.editor.getNodeFromId(inputOneConnections[0].node).data.value;
            const inputTwoValue = this.editor.getNodeFromId(inputTwoConnections[0].node).data.value;
            const logicGateValue =  this.getLogicGateValue(gate.data.type,inputOneValue, inputTwoValue);

            this.resetGateTruthTable(gate);
            const textClass = logicGateValue ? "green-text" : "red-text";
            document.getElementById("node-"+gate.id)?.getElementsByClassName(gate.data.type+"-"+inputOneValue+"-"+inputTwoValue)[0].classList.add("bold-text",textClass);  

            this.editor.updateNodeDataFromId(gate.id, {...gate.data, value : this.getLogicGateValue(gate.data.type,inputOneValue, inputTwoValue)});
            if(gate.outputs.output_1.connections.length) {
              this.updateConnectedNodes(this.editor.getNodeFromId(gate.id));
            }
            
        }
        break;
        case 'not':
          const notInputConnections = gate.inputs.input_1.connections;
          if(notInputConnections.length) {
            const notInputValue = this.editor.getNodeFromId(notInputConnections[0].node).data.value;
            const logicGateValue = this.getLogicGateValue(gate.data.type,notInputValue,null);
            this.resetGateTruthTable(gate);
            const textClass = logicGateValue ? "green-text" : "red-text";
            console.log(gate.id);
            console.log( document.getElementById("node-"+gate.id))
            document.getElementById("node-"+gate.id)?.getElementsByClassName(gate.data.type+"-"+notInputValue)[0].classList.add("bold-text",textClass);
            if(gate.data.value !== logicGateValue) {
              this.editor.updateNodeDataFromId(gate.id, {...gate.data, value : this.getLogicGateValue(gate.data.type,notInputValue, null)});
              if(gate.outputs.output_1.connections.length) {
                this.updateConnectedNodes(this.editor.getNodeFromId(gate.id));
              }
            }
          }
          break;
      }
    }

    validateOutputNode(outputValue:number, node:any) {
      const nodeElem = document.getElementById("node-"+node.id);
      nodeElem?.classList.remove("output-on");
      nodeElem?.classList.remove("output-off");
      console.log(this.currentConnection);
      if(!isNaN(outputValue)) {
        const outputNodeClass = outputValue ? "output-on" : "output-off";
        if(nodeElem) {
          nodeElem.classList.add(outputNodeClass);
          const outputNodeContent = nodeElem.getElementsByClassName("drawflow_content_node")[0].getElementsByTagName("div")[0];
          outputNodeContent.innerHTML = "<span>"+outputValue+"</span>";
        }
      } 
    }

    resetGateTruthTable(gate:any) {
      const truthTableRows = document.getElementById("node-"+gate.id)?.getElementsByClassName("truth-table")[0].getElementsByTagName("tr") || [];
      for(let i = 0; i < truthTableRows.length; i++) {
        truthTableRows[i].classList.remove("bold-text");
        truthTableRows[i].classList.remove("red-text");
        truthTableRows[i].classList.remove("green-text");
      }
    }

    updateConnectedNodes(sourceGate:any) {
      console.log(sourceGate);
      const connections = sourceGate.outputs.output_1.connections;
      for(const connectedNodeMap of connections) {
        const connectedNode = this.editor.getNodeFromId(connectedNodeMap.node);
        let pathClass, connectionSVG;
        switch(connectedNode.data.type) {
          case "output":
            this.validateOutputNode(sourceGate.data.value,connectedNode);
            pathClass = sourceGate.data.value ? 'on-path' : 'off-path';
            connectionSVG = document.getElementsByClassName("node_in_node-"+connectedNode.id + " node_out_node-" +sourceGate.id+ " output_1 input_1")[0];
            connectionSVG.classList.remove('on-path');
            connectionSVG.classList.remove('off-path');
            connectionSVG.classList.add(pathClass);
            break;
          default:
            this.validateGateInputs(connectedNode);
            pathClass = sourceGate.data.value ? 'on-path' : 'off-path';
            connectionSVG = document.getElementsByClassName("node_in_node-"+connectedNode.id + " node_out_node-" +sourceGate.id+ " output_1 input_1")[0];
            connectionSVG.classList.remove('on-path');
            connectionSVG.classList.remove('off-path');
            connectionSVG.classList.add(pathClass);
            break;
        } 
      }

    }

    timePeriods = [
      'Bronze age',
      'Iron age',
      'Middle ages',
      'Early modern period',
      'Long nineteenth century'
    ];
  
    listDrop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    }

    getLogicGateValue(type:string,input1:number,input2:number | null) {
      switch(type) {
        case 'and':
          return input1 && input2 ? 1 : 0;
        case 'or':
          return input1 || input2 ? 1 : 0;
        case 'not':
          return !input1 ? 1 : 0;
        case 'nor':
          return !(input1 || input2) ? 1 : 0;
        case 'nand':
          return !(input1 && input2) ? 1 : 0;
        case 'xor':
          return input1 !== input2 ? 1 : 0;
        case 'xnor':
          return input1 === input2 ? 1 : 0;
        default:
          return null;
      }
    }

    addNodeToDrawFlow(name:string, pos_x:number, pos_y:number) : boolean {
      if (this.editor.editor_mode === 'fixed') {
          return false;
      }
      pos_x = pos_x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)));
      pos_y = pos_y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)));

      switch (name) {
          case 'input-component-on' :
            const inputOn = new EditorItemInputOn();
            this.editor.addNode('input-on-'+cuid(), inputOn.inputs, inputOn.outputs, pos_x, pos_y, inputOn.className , inputOn.data , inputOn.html);
            break;
          case 'input-component-off' :
            const inputOff = new EditorItemInputOff();        
            this.editor.addNode('input-off-'+cuid(), inputOff.inputs, inputOff.outputs, pos_x, pos_y, inputOff.className, inputOff.data, inputOff.html);
            break; 
          case 'output-component' :
            const output = new EditorItemOutput();
            this.editor.addNode('output-'+cuid(), output.inputs, output.outputs, pos_x, pos_y, output.className, output.data, output.html);
            break; 
          case 'and-gate':
            const andGate = new EditorItemAndGate();
            this.editor.addNode('and-'+cuid(), andGate.inputs, andGate.outputs, pos_x, pos_y, andGate.className, andGate.data, andGate.html);
            break;
          case 'or-gate':
            const orGate = new EditorItemOrGate();
            this.editor.addNode('or-'+cuid(), orGate.inputs, orGate.outputs, pos_x, pos_y, orGate.className, orGate.data, orGate.html);
            break;
          case 'not-gate':
            const notGate = new EditorItemNotGate();
            this.editor.addNode('not-'+cuid(), notGate.inputs, notGate.outputs, pos_x, pos_y, notGate.className, notGate.data, notGate.html);
            break;
          case 'xor-gate':
            const xorGate = new EditorItemXorGate();
            this.editor.addNode('xor-'+cuid(), xorGate.inputs, xorGate.outputs, pos_x, pos_y, xorGate.className, xorGate.data, xorGate.html);
            break;
          case 'xnor-gate':
            const xnorGate = new EditorItemXnorGate();
            this.editor.addNode('xnor-'+cuid(), xnorGate.inputs, xnorGate.outputs, pos_x, pos_y, xnorGate.className, xnorGate.data, xnorGate.html);
            break;
          case 'nand-gate':
            const nandGate = new EditorItemNandGate();
            this.editor.addNode('nand-'+cuid(), nandGate.inputs, nandGate.outputs, pos_x, pos_y, nandGate.className, nandGate.data, nandGate.html);
            break;
          case 'nor-gate':
            const norGate = new EditorItemNorGate();
            this.editor.addNode('nor-'+cuid(), norGate.inputs, norGate.outputs, pos_x, pos_y, norGate.className, norGate.data, norGate.html);
            break;
          case '8-bit-display':
            const display = new Editor8BitDisplay();
            this.editor.addNode('8-bit-display-'+cuid(), display.inputs, display.outputs, pos_x, pos_y, display.className, display.data, display.html);
            break;
          default:
            break;
      }
      return true;
  }

   positionMobile(ev:any) {
     this.mobile_last_move = ev;
   }

   allowDrop(ev:any) {
    ev.preventDefault();
  }

  exportCurcuit() {
    
  }
  
  drag(ev:any) {
    if (ev.type === "touchstart") {
      this.mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    } else {
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    }
  }

  drop(ev:any) {
      if (ev.type === "touchend") {
          // const elemFromPoint = document.elementFromPoint(this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY);
          // const parentdrawflow =  .closest("#drawflow");
          // if (parentdrawflow != null) {
          //     this.addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
          // }
          // this.mobile_item_selec = '';
      } else {
          ev.preventDefault();
          var data = ev.dataTransfer.getData("node");
          this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }
  
  }

  

}
