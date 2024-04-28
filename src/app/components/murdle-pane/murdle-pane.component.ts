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
    }
  }
}
