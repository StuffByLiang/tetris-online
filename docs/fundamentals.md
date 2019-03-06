# Fundamentals

Read this first to get a sense of how this project was built.

## Board Position

The tetris board is stored in a 10x20 2d array in `game.boardPosition`

(**top left corner** has coordinates `(0, 0)`)

?> To access the block in a specific coordinates, use game.boardPosition[x][y]

It will contain a variety of values:

Value | Block | Color
--- | --- | ---
0 | empty | none
1 | S | #69BE28 <img style="position: relative; top: 4px" src="https://www.colorcombos.com/images/colors/69BE28.png" width="20">
2 | Z | #ED2939 <img style="position: relative; top: 4px" src="https://www.colorcombos.com/images/colors/ED2939.png" width="20">
3 | I | #009FDA <img style="position: relative; top: 4px" src="https://www.colorcombos.com/images/colors/009FDA.png" width="20">
4 | T | #952D98 <img style="position: relative; top: 4px" src="https://www.colorcombos.com/images/colors/952D98.png" width="20">
5 | J | #0065BD <img style="position: relative; top: 4px" src="https://www.colorcombos.com/images/colors/0065BD.png" width="20">
6 | L | #FF7900 <img style="position: relative; top: 4px" src="https://www.colorcombos.com/images/colors/FF7900.png" width="20">
7 | O | #FECB00 <img style="position: relative; top: 4px" src="https://www.colorcombos.com/images/colors/FECB00.png" width="20">

```javscript_console
// Out of bounds coordinates will be set to 1

game.boardPosition[-1][y] // returns 1
game.boardPosition[x][-1] // returns 1
game.boardPosition[10][y] // returns 1
game.boardPosition[x][22] // returns 1
```

You can set the color of any block
```javscript_console
game.boardPosition[x][y] = 1 // sets the board position of (x, y) to green
```
