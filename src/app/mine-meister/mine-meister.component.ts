import { ConstantPool } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { MineGridComponent } from '../mine-grid/mine-grid.component';

@Component({
  selector: 'app-mine-meister',
  templateUrl: './mine-meister.component.html',
  styleUrls: ['./mine-meister.component.css'],
})
export class MineMeisterComponent implements OnInit, AfterViewInit {
  Arr = Array;
  rows: number = 0;
  cols: number = 0;
  mines: number = 0;
  mineGridArr: ComponentRef<MineGridComponent>[][] = [];
  gridStyles = {};

  neighborGrids = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  message: string = '';
  play_btn!: HTMLButtonElement;

  @ViewChild('appMineComponent', { read: ViewContainerRef })
  appMineComponent!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  drawGrid(rows: any, cols: any, mines: any): void {
    this.mineGridArr.forEach((element) => {
      element.forEach((_element) => {
        _element.destroy();
      });
    });
    this.mineGridArr.splice(0, this.mineGridArr.length);
    this.rows = Number(rows);
    this.cols = Number(cols);
    this.mines = Number(mines) > this.rows * this.cols ? 0 : Number(mines);
    this.gridStyles = {
      gridTemplateColumns: 'repeat(' + this.cols + ',1fr)',
      width: this.cols * 50 + 'px',
    };

    for (let i = 0; i < this.rows; i++) {
      this.mineGridArr[i] = [];
      for (let j = 0; j < this.cols; j++) {
        const componentFactory =
          this.componentFactoryResolver.resolveComponentFactory(
            MineGridComponent
          );
        const componentRef =
          this.appMineComponent.createComponent(componentFactory);
        this.mineGridArr[i][j] = componentRef;
      }
    }
    this.setGrids();
    // this.play_btn = document.querySelector('.play_btn');
    this.play_btn.disabled = true;
  }
  setGrids(): void {
    let totalMines = 0;

    while (totalMines < this.mines) {
      let r = Math.floor(Math.random() * this.rows);
      let c = Math.floor(Math.random() * this.cols);

      if (this.mineGridArr[r][c].instance.getValue() != '*') {
        this.mineGridArr[r][c].instance.setValue('*');
        totalMines += 1;
      }
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.mineGridArr[i][j].instance.getValue() == '*') {
          this.neighborGrids.forEach((element) => {
            if (
              i + element[0] >= 0 &&
              i + element[0] < this.rows &&
              j + element[1] >= 0 &&
              j + element[1] < this.cols &&
              this.mineGridArr[i + element[0]][
                j + element[1]
              ].instance.getValue() != '*'
            ) {
              let val = Number(
                this.mineGridArr[i + element[0]][
                  j + element[1]
                ].instance.getValue()
              );
              val += 1;
              this.mineGridArr[i + element[0]][
                j + element[1]
              ].instance.setValue(String(val));
            }
          });
        }
      }
    }
  }

  getElement(evt: any): ComponentRef<MineGridComponent> {
    const clickedElement = evt.path[1];
    for (const element of this.mineGridArr) {
      for (const el of element) {
        if (clickedElement == el.location.nativeElement) {
          return el;
        }
      }
    }
    return null!;
  }

  hasMine(evt: any) {
    return this.getElement(evt).instance.getValue() === '*';
  }

  log(evt: any) {
    if (!this.hasMine(evt)) {
      if (this.getElement(evt).instance.getValue() == '0') {
        this.searchNeighbourGrids(this.getElement(evt));
      }
    } else {
      this.message = 'GameOver';
    }
  }
  searchNeighbourGrids(element: ComponentRef<MineGridComponent>) {
    let elIndex: number[] = Array(2);
    for (let i = 0; i < this.mineGridArr.length; i++) {
      const el = this.mineGridArr[i];
      if (el.includes(element)) {
        elIndex = [i, el.indexOf(element)];
      }
    }
    this.neighborGrids.forEach((_element) => {
      if (
        elIndex[0] + _element[0] >= 0 &&
        elIndex[0] + _element[0] < this.rows &&
        elIndex[1] + _element[1] >= 0 &&
        elIndex[1] + _element[1] < this.cols
      ) {
        if (
          this.mineGridArr[elIndex[0] + _element[0]][
            elIndex[1] + _element[1]
          ].instance.getValue() == '0'
        ) {
          if (
            this.mineGridArr[elIndex[0] + _element[0]][elIndex[1] + _element[1]]
              .instance.show.visibility != 'visible'
          ) {
            this.mineGridArr[elIndex[0] + _element[0]][
              elIndex[1] + _element[1]
            ].instance.show.visibility = 'visible';
            this.searchNeighbourGrids(
              this.mineGridArr[elIndex[0] + _element[0]][
                elIndex[1] + _element[1]
              ]
            );
          }
        } else {
          this.mineGridArr[elIndex[0] + _element[0]][
            elIndex[1] + _element[1]
          ].instance.show.visibility = 'visible';
        }
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
