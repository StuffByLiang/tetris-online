# Introduction to JavaScript Files

## Structure

Different game functions are separated in different folders

* `/scripts/app.js` - main js file that includes all other js files
* `/scripts/bag` - contains all functions related to bag (upcoming pieces)
* `/scripts/draw` - contains all functions related to drawing pieces onto the html canvas
* `/scripts/gameFunctions` - game functions
* `/scripts/functions` - random helper functions

Essentially, the entire game is accessible through a few variables in the javascript browser:

* game variable
  * contains all tetris functions
* draw variable
  * contains functions related to drawing pieces onto the html canvas
* player variable
  * stores data on the current tetris game being played
* tetrisBoard variable
* record variable
* key variable
* settings variable
