import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-murdle-pane',
  templateUrl: './murdle-pane.component.html',
  styleUrls: ['./murdle-pane.component.css']
})
export class MurdlePaneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let canvas = new p5(this.sketch2);
  }

  private sketch2(p: p5) {
    let bgColor:p5.Color = p.color(200);
    let msquare:mSquare;

    p.setup = () => {
      msquare = new mSquare(200, 200, 200);
      let canvas = p.createCanvas(500, 500);
      canvas.mouseClicked(clickInGrid);
    };

    p.draw = () => {
      p.background(bgColor);
      p.rect(100, 100, 100, 100);
      msquare.drawMe();
    };

    function clickInGrid(){
      bgColor = p.color(255, 100, 10);
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
    }

  }
  
  private sketch(p: p5) {
    let grid: mSquare[];
    let legendGrid: mSquare[];
    let textSizeVar = 20;
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
      
      p.textAlign(p.CENTER);
      p.textSize(textSizeVar);
      let canvas = p.createCanvas(500, 500);
      
      canvas.mouseClicked(clickInGrid);
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
                  var csx = Math.floor((clickedSquare.getXPOS() - xOffset) / size / 4)
                  var csy = Math.floor((clickedSquare.getYPOS() - yOffset) / size / 4)
                  var xsx = Math.floor((xSquare.getXPOS() - xOffset) / size / 4)
                  var xsy = Math.floor((xSquare.getYPOS() - yOffset) / size / 4)
                  if (csx == xsx && csy == xsy){
                    xSquare.setText("x");
                  }
                  // if clicked square = o and xsquare = x and is outside squares box but in squares row/col
                  else if (xSquare.getText() === "x"){
                    grid.forEach(mirrorSquare => {
                      var mirrordYPOS = (xSquare.getYPOS() - yOffset) / size;
                      var mirrordXPOS = (xSquare.getXPOS() - xOffset) / size;
                      
                      if (mirrordYPOS >= 4 && mirrordYPOS < 8) mirrordYPOS += 4;
                      else if (mirrordYPOS >= 8 && mirrordYPOS < 12) mirrordYPOS -= 4;
                      else if (mirrordYPOS >= 0 && mirrordYPOS < 4) mirrordYPOS -= 4;
                      
                      if (mirrordXPOS >= 4 && mirrordXPOS < 8) mirrordXPOS += 4;
                      else if (mirrordXPOS >= 8 && mirrordXPOS < 12) mirrordXPOS -= 4;
                      else if (mirrordXPOS >= 0 && mirrordXPOS < 4) mirrordXPOS -= 4;
                      
                      if (((mirrorSquare.getXPOS() - xOffset) / size == mirrordYPOS && (mirrorSquare.getYPOS() - yOffset) / size == (clickedSquare.getYPOS() - yOffset) / size) || (mirrorSquare.getYPOS() - yOffset) / size == mirrordXPOS && (mirrorSquare.getXPOS() - xOffset) / size == (clickedSquare.getXPOS() - xOffset) / size){
                        mirrorSquare.setText("x");
                      }
                    })
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
    }
  }
}
