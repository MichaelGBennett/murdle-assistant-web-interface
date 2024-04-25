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
    let textSizeVar = 25;
    let xOffset = 50;
    let yOffset = 50;
    let size = 30;

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
      
      for(var x = 0; x < 12; x++){
        var xPOS = x * size + xOffset;
        for (var y = 0; y < 4; y ++){
          var yPOS = y * size + yOffset;
          grid.push(new mSquare(xPOS, yPOS, size));
        }
      }
      
      yOffset += size * 4;
      for(var x = 0; x < 8; x++){
        var xPOS = x * size + xOffset;
        for (var y = 0; y < 4; y ++){
          var yPOS = y * size + yOffset; 
          grid.push(new mSquare(xPOS, yPOS, size));
        }
      }
      
      yOffset += size * 4;
      for(var x = 0; x < 4; x++){
        var xPOS = x * size + xOffset;
        for (var y = 0; y < 4; y ++){
          var yPOS = y * size + yOffset;
          grid.push(new mSquare(xPOS, yPOS, size));
        }
      }
      
      yOffset = originalYOffset;
      
      // p.textAlign(p.CENTER);
      p.textSize(textSizeVar);
      let canvas = p.createCanvas(500, 500);
      
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
          grid.map(item => item.markXInMirroredBoxFromOSquare(murdleSquare));
        }
        else if (murdleSquare.getText() === "x"){
        }
      })
    }
    
    class mSquare{
      xPOS: number;
      yPOS: number;
      size: number;
      boxtext: string;
      bgColor: any;
      
      constructor(xPOS : number, yPOS : number, size : number){
        this.xPOS = xPOS;
        this.yPOS = yPOS;
        this.size = size;
        this.boxtext = ""
        this.bgColor = p.color(255, 255, 255);
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
        p.rect(this.xPOS, this.yPOS, this.size, this.size);
        p.fill(0);
        p.text(this.boxtext, this.xPOS, this.yPOS, this.size, this.size);
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

      markXInMirroredBoxFromOSquare(oSquare: mSquare){
        var mirrordYPOS = (xSquare.getYPOS() - yOffset) / size;
        var mirrordXPOS = (xSquare.getXPOS() - xOffset) / size;
        
        if (mirrordYPOS >= 4 && mirrordYPOS < 8) mirrordYPOS += 4;
        else if (mirrordYPOS >= 8 && mirrordYPOS < 12) mirrordYPOS -= 4;
        else if (mirrordYPOS >= 0 && mirrordYPOS < 4) mirrordYPOS -= 4;
        
        if (mirrordXPOS >= 4 && mirrordXPOS < 8) mirrordXPOS += 4;
        else if (mirrordXPOS >= 8 && mirrordXPOS < 12) mirrordXPOS -= 4;
        else if (mirrordXPOS >= 0 && mirrordXPOS < 4) mirrordXPOS -= 4;
        
        if (((this.getXPOS() - xOffset) / size == mirrordYPOS && (this.getYPOS() - yOffset) / size == (xSquare.getYPOS() - yOffset) / size) 
          || (this.getYPOS() - yOffset) / size == mirrordXPOS && (this.getXPOS() - xOffset) / size == (xSquare.getXPOS() - xOffset) / size){
          this.setText("x");
        }
      }
    }
  }
}
