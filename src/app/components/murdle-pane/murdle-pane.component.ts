import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-murdle-pane',
  templateUrl: './murdle-pane.component.html',
  styleUrls: ['./murdle-pane.component.css']
})
export class MurdlePaneComponent implements OnInit {

  grid: number = 0;

  ngOnInit(): void {
    let canvas = new p5(this.sketch);
  }
  
  private sketch(p: p5) {
    let grid: mSquare[] = [];
    let legendGrid: mSquare[] = [];
    let textSizeVar = 30;
    let xOffset = 50;
    let yOffset = 50;
    let size = 30;

    let box1: mSquare[] = [];
    let box2: mSquare[] = [];
    let box3: mSquare[] = [];
    let box4: mSquare[] = [];
    let box5: mSquare[] = [];
    let box6: mSquare[] = [];

    p.setup = () => {
      var originalYOffset = yOffset;

      var topLetters = "ABCDEFGHIJKL";
      for(var x = 0; x < 12; x++){
        var xPOS = x * size + xOffset;
        var letterBox = new mSquare(xPOS, 10, size);
        letterBox.setText("" + topLetters.charAt(x));
        letterBox.setBGColor(p.color(0xFFFFFF));
        legendGrid.push(letterBox);
      }
      
      var leftHandSideLetters = "MNOPIJKLEFGH";
      for(var y = 0; y < 12; y++){
        var yPOS = y * size + yOffset;
        var letterBox = new mSquare(10, yPOS, size);
        letterBox.setText("" + leftHandSideLetters.charAt(y));
        letterBox.setBGColor(p.color(0xFFFFFF));
        legendGrid.push(letterBox);
      }

      createGrid(12, yOffset);
      createGrid(8, yOffset + size * 4);
      createGrid(4, yOffset + size * 8);
      
      for (let i = 0; i < 36; i++){
        grid[i].setBelow(grid[i + 12]);
        grid[i + 12].setAbove(grid[i]);
      }

      for (let i = 0; i < 8; i++){
        grid[i + 48].setAbove(grid[i + 36]);
      }

      for (let i = 0; i < 24; i++){
        grid[i + 48].setBelow(grid[i + 56]);
        grid[i + 56].setAbove(grid[i + 48]);
      }

      for (let i = 0; i < 4; i++){
        grid[i + 80].setAbove(grid[i + 72]);
      }

      for (let i = 0; i < 12; i++){
        grid[i + 80].setBelow(grid[i + 84]);
        grid[i + 84].setAbove(grid[i + 80]);
      }

      box1.push(grid[0])
      box1.push(grid[1])
      box1.push(grid[2])
      box1.push(grid[3])
      box1.push(grid[12])
      box1.push(grid[13])
      box1.push(grid[14])
      box1.push(grid[15])
      box1.push(grid[24])
      box1.push(grid[25])
      box1.push(grid[26])
      box1.push(grid[27])
      box1.push(grid[36])
      box1.push(grid[37])
      box1.push(grid[38])
      box1.push(grid[39])

      box1.map(item => item.setBox(box1));

      box2.push(grid[4])
      box2.push(grid[5])
      box2.push(grid[6])
      box2.push(grid[7])
      box2.push(grid[16])
      box2.push(grid[17])
      box2.push(grid[18])
      box2.push(grid[19])
      box2.push(grid[28])
      box2.push(grid[29])
      box2.push(grid[30])
      box2.push(grid[31])
      box2.push(grid[40])
      box2.push(grid[41])
      box2.push(grid[42])
      box2.push(grid[43])

      box2.map(item => item.setBox(box2));

      box3.push(grid[8])
      box3.push(grid[9])
      box3.push(grid[10])
      box3.push(grid[11])
      box3.push(grid[20])
      box3.push(grid[21])
      box3.push(grid[22])
      box3.push(grid[23])
      box3.push(grid[32])
      box3.push(grid[33])
      box3.push(grid[34])
      box3.push(grid[35])
      box3.push(grid[44])
      box3.push(grid[45])
      box3.push(grid[46])
      box3.push(grid[47])

      box3.map(item => item.setBox(box3));

      box4.push(grid[48])
      box4.push(grid[49])
      box4.push(grid[50])
      box4.push(grid[51])
      box4.push(grid[56])
      box4.push(grid[57])
      box4.push(grid[58])
      box4.push(grid[59])
      box4.push(grid[64])
      box4.push(grid[65])
      box4.push(grid[66])
      box4.push(grid[67])
      box4.push(grid[72])
      box4.push(grid[73])
      box4.push(grid[74])
      box4.push(grid[75])

      box4.map(item => item.setBox(box4));

      box5.push(grid[52])
      box5.push(grid[53])
      box5.push(grid[54])
      box5.push(grid[55])
      box5.push(grid[60])
      box5.push(grid[61])
      box5.push(grid[62])
      box5.push(grid[63])
      box5.push(grid[68])
      box5.push(grid[69])
      box5.push(grid[70])
      box5.push(grid[71])
      box5.push(grid[76])
      box5.push(grid[77])
      box5.push(grid[78])
      box5.push(grid[79])

      box5.map(item => item.setBox(box5));

      box6.push(grid[80])
      box6.push(grid[81])
      box6.push(grid[82])
      box6.push(grid[83])
      box6.push(grid[84])
      box6.push(grid[85])
      box6.push(grid[86])
      box6.push(grid[87])
      box6.push(grid[88])
      box6.push(grid[89])
      box6.push(grid[90])
      box6.push(grid[91])
      box6.push(grid[92])
      box6.push(grid[93])
      box6.push(grid[94])
      box6.push(grid[95])

      box6.map(item => item.setBox(box6));

      yOffset = originalYOffset;
      
      p.textAlign(p.CENTER);
      // p.textSize(textSizeVar);
      let canvas = p.createCanvas(420, 420);
      
      canvas.mouseClicked(clickInGrid);
      canvas.parent('murdle-sketch');
    };
  
    p.draw = () => {

      p.background(200);
  
      grid.forEach(x => x.drawMe())
      legendGrid.forEach(x => x.drawMe())
    };

    function clickInGrid() {
      if (p.mouseButton == p.LEFT){
          grid.forEach(clickedSquare => {
            if (clickedSquare.isClicked(p.mouseX, p.mouseY)){
              clickedSquare.clickMe();
              if (clickedSquare.getText() === "o"){
                grid.forEach(xSquare => {
                if (clickedSquare.getYPOS() == xSquare.getYPOS() || clickedSquare.getXPOS() == xSquare.getXPOS()){
                  // if clicked square = o and xsquare = x and is outside squares box but in squares row/col
                  if (xSquare.getText() === "x"){
                    grid.map(item => item.markXInMirroredBoxFromOSquare(clickedSquare, xSquare))
                  }
                }
              })
              clickedSquare.setText("o");
            }
          }
        })
        //check each box for 3 X in single row or colum
        let nextRightSquare = grid[0];
        nextRightSquare.checkBoxForThreeXinColumn(0, nextRightSquare.box != null ? nextRightSquare.box : box1);
        while (nextRightSquare.right != null){
          nextRightSquare.right.checkBoxForThreeXinColumn(0, nextRightSquare.right.box != null ? nextRightSquare.right.box : box1);
          nextRightSquare = nextRightSquare.right;
        }

        nextRightSquare = grid[48];
        nextRightSquare.checkBoxForThreeXinColumn(0, nextRightSquare.box != null ? nextRightSquare.box : box1);
        while (nextRightSquare.right != null){
          nextRightSquare.right.checkBoxForThreeXinColumn(0, nextRightSquare.right.box != null ? nextRightSquare.right.box : box1);
          nextRightSquare = nextRightSquare.right;
        }

        nextRightSquare = grid[80];
        nextRightSquare.checkBoxForThreeXinColumn(0, nextRightSquare.box != null ? nextRightSquare.box : box1);
        while (nextRightSquare.right != null){
          nextRightSquare.right.checkBoxForThreeXinColumn(0, nextRightSquare.right.box != null ? nextRightSquare.right.box : box1);
          nextRightSquare = nextRightSquare.right;
        }

        let nextBelowSquare = grid[0];
        nextBelowSquare.checkBoxForThreeXinRow(0, nextBelowSquare.box != null ? nextBelowSquare.box : box1)
        while (nextBelowSquare.below != null){
          nextBelowSquare.below.checkBoxForThreeXinRow(0, nextBelowSquare.below.box != null ? nextBelowSquare.below.box : box1);
          nextBelowSquare = nextBelowSquare.below;
        }

        nextBelowSquare = grid[4];
        nextBelowSquare.checkBoxForThreeXinRow(0, nextBelowSquare.box != null ? nextBelowSquare.box : box1)
        while (nextBelowSquare.below != null){
          nextBelowSquare.below.checkBoxForThreeXinRow(0, nextBelowSquare.below.box != null ? nextBelowSquare.below.box : box1);
          nextBelowSquare = nextBelowSquare.below;
        }

        nextBelowSquare = grid[8];
        nextBelowSquare.checkBoxForThreeXinRow(0, nextBelowSquare.box != null ? nextBelowSquare.box : box1)
        while (nextBelowSquare.below != null){
          nextBelowSquare.below.checkBoxForThreeXinRow(0, nextBelowSquare.below.box != null ? nextBelowSquare.below.box : box1);
          nextBelowSquare = nextBelowSquare.below;
        }

      }
      else if (p.mouseButton == p.RIGHT){
        grid.forEach(clickedSquare => {
          if (clickedSquare.isClicked(p.mouseX, p.mouseY)){
            clickedSquare.setText("");
          }
        })
      }

      grid.forEach(murdleSquare => {
        if (murdleSquare.getText() === "o"){
          grid.map(item => item.markXInSameBoxAsOSquare(murdleSquare));
          // grid.map(item => item.markXInMirroredBoxFromOSquare(murdleSquare));
        }
        else if (murdleSquare.getText() === "x"){
        }
      })
    }

    function createGrid(width:number, yOffset:number){
      for(var x = 0; x < width; x++){
        let previous: mSquare | null = null;
        var xPOS = x * size + xOffset;
        for (var y = 0; y < 4; y ++){
          var yPOS = y * size + yOffset;
          let next: mSquare = new mSquare(xPOS, yPOS, size);
          next.setLeft(previous);
          if (previous != null) previous.setRight(next);
          grid.push(next);
          previous = next;
        }
      }
    }
    
    class mSquare{
      xPOS: number;
      yPOS: number;
      size: number;
      boxtext: string;
      bgColor: any;
      above:mSquare | null;
      below:mSquare | null;
      right:mSquare | null;
      left:mSquare | null;
      box:mSquare[] | null;

      
      constructor(xPOS : number, yPOS : number, size : number){
        this.xPOS = xPOS;
        this.yPOS = yPOS;
        this.size = size;
        this.boxtext = ""
        this.bgColor = p.color(255, 255, 255);
        this.above = null;
        this.below = null;
        this.right = null;
        this.left = null;
        this.box = null;
      }
      
      isClicked(x : number, y : number){
        if (x > this.xPOS && x < this.xPOS + this.size){
          if (y > this.yPOS && y < this.yPOS + this.size){
            return true;
          }
        }
        return false;
      }
      
      drawMe(){
        var c = this.bgColor == null ? p.color(255) : this.bgColor
        p.fill(c);
        p.strokeWeight(3);
        p.rect(this.xPOS, this.yPOS, this.size, this.size);
        p.fill(0);
        p.strokeWeight(1);
        p.text(this.boxtext, this.xPOS, this.yPOS + 10, this.size - 10, this.size);
      }
      
      clickMe(){
        if (this.boxtext === ""){
          this.boxtext = "x";
        }
        else if (this.boxtext === "x"){
          this.boxtext = "o";
        }
        else if (this.boxtext === "o"){
          this.boxtext = "";
        }
      }
      
      setText(boxtext: string){
        this.boxtext = boxtext;
      }
      
      setBGColor(c : p5.Color){
        if (c != null){
          this.bgColor = c;
        }
      }
      
      getXPOS(){
        return this.xPOS;
      }
      
      getYPOS(){
        return this.yPOS;
      }
      
      getText(){
        return this.boxtext;
      }

      markXInSameBoxAsOSquare(oSquare: mSquare){
        if (oSquare.getXPOS() == this.getXPOS() || oSquare.getYPOS() == this.getYPOS()){
          if (!(oSquare.getXPOS() == this.getXPOS() && oSquare.getYPOS() == this.getYPOS())){
            var thisXthSquare = Math.floor((this.getXPOS() - xOffset) / size / 4)
            var thisYthSquare = Math.floor((this.getYPOS() - yOffset) / size / 4)
            var OXthSquare = Math.floor((oSquare.getXPOS() - xOffset) / size / 4)
            var OYthSquare = Math.floor((oSquare.getYPOS() - yOffset) / size / 4)
            if (thisXthSquare == OXthSquare && thisYthSquare == OYthSquare){
              this.setText("x");
            }
          }
        }
      }

      markXInMirroredBoxFromOSquare(oSquare: mSquare, xSquare: mSquare){
        var mirrordYPOS = (xSquare.getYPOS() - yOffset) / size;
        var mirrordXPOS = (xSquare.getXPOS() - xOffset) / size;
        
        if (mirrordYPOS >= 4 && mirrordYPOS < 8) mirrordYPOS += 4;
        else if (mirrordYPOS >= 8 && mirrordYPOS < 12) mirrordYPOS -= 4;
        else if (mirrordYPOS >= 0 && mirrordYPOS < 4) mirrordYPOS -= 4;
        
        if (mirrordXPOS >= 4 && mirrordXPOS < 8) mirrordXPOS += 4;
        else if (mirrordXPOS >= 8 && mirrordXPOS < 12) mirrordXPOS -= 4;
        else if (mirrordXPOS >= 0 && mirrordXPOS < 4) mirrordXPOS -= 4;

        if (((this.getXPOS() - xOffset) / size == mirrordYPOS && (this.getYPOS() - yOffset) / size == (oSquare.getYPOS() - yOffset) / size)
          || (this.getYPOS() - yOffset) / size == mirrordXPOS && (this.getXPOS() - xOffset) / size == (oSquare.getXPOS() - xOffset) / size){
          this.setText("x");
        }
      }

      setAbove(above:mSquare | null){
        this.above = above;
      }

      setBelow(below:mSquare | null){
        this.below = below;
      }

      setRight(right:mSquare | null){
        this.right = right;
      }

      setLeft(left:mSquare | null){
        this.left = left;
      }

      setBox(box:mSquare[]){
        this.box = box;
      }

      checkBoxForThreeXinColumn(xCount:number, box:mSquare[]) : number{
        if(box.indexOf(this) < 0){
          return -1;
        }
        if(this.getText() === "o"){
          return -2;
        }
        if(this.getText() === "x"){
          xCount ++;
          if (xCount == 3){
            return xCount;
          }
          return this.below != null ? this.below.checkBoxForThreeXinColumn(xCount, box) : -1;
        }
        if(this.getText() === ""){
          xCount = this.below != null ? this.below.checkBoxForThreeXinColumn(xCount, box) : xCount;
          if (xCount == 3){
            this.setText("o");
          }
        }
        return 0;
      }

      checkBoxForThreeXinRow(xCount:number, box:mSquare[]) : number{
        if(box.indexOf(this) < 0){
          return -1;
        }
        if(this.getText() === "o"){
          return -2;
        }
        if(this.getText() === "x"){
          xCount ++;
          if (xCount == 3){
            return xCount;
          }
          return this.right != null ? this.right.checkBoxForThreeXinRow(xCount, box) : -1;
        }
        if(this.getText() === ""){
          xCount = this.right != null ? this.right.checkBoxForThreeXinRow(xCount, box) : xCount;
          if (xCount == 3){
            this.setText("o");
          }
        }
        return 0;
      }
    }
  }
}
