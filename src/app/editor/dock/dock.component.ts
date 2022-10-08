import { Component, Input } from "@angular/core";

interface DockElement{
    content: string,
    type: string,
    tooltip:string
}

@Component({
    selector: 'app-editor-dock',
    templateUrl: './dock.component.html',
    styleUrls: ['./dock.component.scss']
  })

export class DockComponent {


    //class="drag-drawflow" draggable="true" (dragstart)="drag($event)" data-node="and-gate"

    @Input() dragCallBack:Function;

    dockElements: DockElement[] = [
        {
            content: 'fas fa-cubes',
            type: 'components',
            tooltip: 'All components'
        },
        {
            content: 'i',
            type: 'input',
            tooltip: 'Variable input'
        },
        {
            content: 'o',
            type: 'output',
            tooltip: 'Output'
        },
        {
            content: '&',
            type: 'and-gate',
            tooltip: 'And gate'
        },
        {
            content: '|',
            type: 'or',
            tooltip: 'Or gate'
        },
        {
            content: '^',
            type: 'xor',
            tooltip: 'Xor gate'
        },
        {
            content: 'fas fa-microchip',
            type: 'custom',
            tooltip: 'Custom compontent'
        },
        {
            content: 'fas fa-search-minus',
            type: 'zoom-out',
            tooltip: 'Zoom out'
        },
        {
            content: 'fas fa-search',
            type: 'zoom-clear',
            tooltip: 'Reset zoom'
        },
        {
            content: 'fas fa-search-plus',
            type: 'zoom-in',
            tooltip: 'Zoom in'
        },
        {
            content: 'fas fa-save',
            type: 'save',
            tooltip: 'Save board'
        }
    ];
  }