import { Component, Input } from "@angular/core";

interface DockElement{
    content: string,
    type: string,
    tooltip:string,
    draggable:boolean;
}

@Component({
    selector: 'app-editor-dock',
    templateUrl: './dock.component.html',
    styleUrls: ['./dock.component.scss']
  })

export class DockComponent {


    //class="drag-drawflow" draggable="true" \data-node="and-gate"

    @Input() dragCallBack:Function;

    dockElements: DockElement[] = [
        {
            content: 'fas fa-cubes',
            type: 'components',
            tooltip: 'All components',
            draggable: false
        },
        {
            content: 'i',
            type: 'input-component-on',
            tooltip: 'Variable input',
            draggable: true
        },
        {
            content: 'o',
            type: 'output-component',
            tooltip: 'Output',
            draggable: true
        },
        {
            content: '!',
            type: 'not-gate',
            tooltip: 'Not gate',
            draggable: true
        },
        {
            content: '&',
            type: 'and-gate',
            tooltip: 'And gate',
            draggable: true
        },
        {
            content: '|',
            type: 'or-gate',
            tooltip: 'Or gate',
            draggable: true
        },
        {
            content: '^',
            type: 'xor-gate',
            tooltip: 'Xor gate',
            draggable: true
        },
        {
            content: 'fas fa-microchip',
            type: 'custom',
            tooltip: 'Custom compontent',
            draggable: true
        },
        {
            content: 'fas fa-search-minus',
            type: 'zoom-out',
            tooltip: 'Zoom out',
            draggable: false
        },
        {
            content: 'fas fa-search',
            type: 'zoom-clear',
            tooltip: 'Reset zoom',
            draggable: false
        },
        {
            content: 'fas fa-search-plus',
            type: 'zoom-in',
            tooltip: 'Zoom in',
            draggable: false
        },
        {
            content: 'fas fa-save',
            type: 'save',
            tooltip: 'Save board',
            draggable: false
        }
    ];
  }