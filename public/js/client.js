!function(e){var i={};function t(a){if(i[a])return i[a].exports;var r=i[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=i,t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,i){if(1&i&&(e=t(e)),8&i)return e;if(4&i&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&i&&"string"!=typeof e)for(var r in e)t.d(a,r,function(i){return e[i]}.bind(null,r));return a},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},t.p="",t(t.s=1)}([function(e,i){function t(e,i){for(var t=0;t<i.length;t++){var a=i[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var a=function(){function e(){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.currentBag=0,this.currentPiece=0,this.currentPieceName="",this.canHold=!0,this.currentHoldPiece="",this.firstHold=!1,this.b2b=!1,this.tspinRotate=!1,this.combo=0,this.linesSent=0,this.incoming=[],this.boardPosition=[[],[]],this.pressed={},this.begin=!1,this.startTime=0,this.linesSentRecord="",this.boardPositionRecord="",this.stats={b2bTSD:0};for(var i=-1;i<=10;i++){this.boardPosition[i]=[];for(var t=-1;t<=22;t++)this.boardPosition[i][t]=0,-1!=i&&10!=i&&-1!=t&&22!=t||(this.boardPosition[i][t]=1)}}var i,a,r;return i=e,(a=[{key:"isPressed",value:function(e){return void 0!==this.pressed[e]}},{key:"addToIncoming",value:function(e){this.incoming.push(e)}},{key:"getTotalIncoming",value:function(){if(void 0!==this.incoming.length){var e=0,i=!0,t=!1,a=void 0;try{for(var r,o=this.incoming[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){e+=r.value}}catch(e){t=!0,a=e}finally{try{i||null==o.return||o.return()}finally{if(t)throw a}}return e}}},{key:"reduceGarbage",value:function(e){for(var i=game.player,t=0;t<i.incoming.length;t++)e>i.incoming[t]?(e-=i.incoming[t],i.incoming.shift(),t--):e<i.incoming[t]&&(i.incoming[t]-=e,e=0);return e}}])&&t(i.prototype,a),r&&t(i,r),e}();e.exports=a},function(e,i,t){e.exports=t(15)},function(e,i){window.settings={arr:0,das:120,gravity:1e3,softDrop:10,handicap:!1,myNameIsMeidy:!1}},function(e,i,t){function a(e,i){for(var t=0;t<i.length;t++){var a=i[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var r=t(4),o=(t(6),t(0)),n=function(){function e(i){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.io=i,this.player=null,this.bag=[],this.id=null,this.randomModiferInterval=null,this.modifiers=null}var i,t,n;return i=e,(t=[{key:"start",value:function(){this.reset(),this.player=new o;var e=this.player;e.begin||(e.begin=!0,settings.myNameIsMeidy&&(game.meidy(),clearInterval(settings.meidy),settings.meidy=setInterval(function(){game.meidy()},2e4)),this.modifiers={increaseGravity:!1,randomColor:!1,disableGhost:!1,cheeseGarbage:!1,oneGarbage:!1,level:1},e.startTime=(new Date).getTime(),env.modifiers&&(settings.gravity=1e3,clearInterval(this.randomModifierInterval),this.randomModiferInterval=setInterval(this.applyRandomModifier.bind(this),7e3)),this.spawnPiece())}},{key:"reset",value:function(){if(null!=this.player){$("#otherPlayerCanvas").html("");var e=this.player;this.bag=[],clearInterval(e.piece.interval),e.piece=null}}},{key:"checkLoss",value:function(){for(var e=this.player,i=!1,t=0;t<=1;t++)for(var a=3;a<=6;a++)0!=e.boardPosition[a][t]&&(i=!0);return i}},{key:"loss",value:function(){console.log("YOU FUCKING LOST"),socket.emit("died"),game.losingGray(),this.player.begin=!1,$(".note").show()}},{key:"moveLeft",value:function(){var e=this.player;e.canMoveLeft=setTimeout(this.doMoveLeft.bind(this),settings.das),e.piece.checkCollision(2)||(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.tspinRotate=!1,e.piece.lockdown(),e.piece.x--,e.piece.update()),delete e.pressed.moveRight}},{key:"doMoveLeft",value:function(){var e=this.player;e.pressed.moveLeft>0&&(e.piece.checkCollision(2)||(e.tspinRotate=!1,e.piece.lockdown(),e.piece.x--,e.piece.update()),e.canMoveLeft=setTimeout(this.doMoveLeft.bind(this),settings.arr))}},{key:"rotateRight",value:function(){var e=this.player;e.piece.canRotate(1)&&(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.piece.angle++,e.piece.angle>3&&(e.piece.angle=0),e.tspinRotate=!0,e.piece.lockdown(),e.piece.update())}},{key:"moveRight",value:function(){var e=this.player;e.canMoveRight=setTimeout(this.doMoveRight.bind(this),settings.das),e.piece.checkCollision(0)||(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.tspinRotate=!1,e.piece.lockdown(),e.piece.x++,e.piece.update()),delete e.pressed.moveLeft}},{key:"doMoveRight",value:function(){var e=this.player;e.pressed.moveRight>0&&(e.piece.checkCollision(0)||(e.tspinRotate=!1,e.piece.lockdown(),e.piece.x++,e.piece.update()),e.canMoveRight=setTimeout(this.doMoveRight.bind(this),settings.arr))}},{key:"softDrop",value:function(){var e=this.player;e.piece.checkCollision(1)||(clearInterval(e.piece.interval),e.piece.interval=setInterval(e.piece.doGravity.bind(e.piece),settings.softDrop),e.piece.y++,e.piece.y>e.piece.lowestLine&&(e.piece.lowestLine=e.piece.y,e.piece.rotationLimit=0,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1),e.tspinRotate=!1,e.piece.lockdown(),e.piece.update())}},{key:"rotateLeft",value:function(){var e=this.player;e.piece.canRotate(-1)&&(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.piece.angle--,e.piece.angle<0&&(e.piece.angle=3),e.tspinRotate=!0,e.piece.lockdown(),e.piece.update())}},{key:"rotateHalf",value:function(){var e=this.player;e.piece.canRotate(2)&&(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.piece.angle+=2,e.piece.angle>3&&(e.piece.angle-=4),e.tspinRotate=!0,e.piece.lockdown(),e.piece.update())}},{key:"hardDrop",value:function(){if(!this.checkLoss()){for(var e=this.player;!e.piece.checkCollision(1);)e.tspinRotate=!1,e.piece.y++;e.piece.update(),e.piece.die()}}},{key:"spawnPiece",value:function(e){if(!this.checkLoss()){var i,t,a=this.player;if(void 0===e){null==this.bag[a.currentBag+1]&&this.newBag();var o=this.bag[a.currentBag].split(",");a.currentPieceName=o[a.currentPiece],a.currentPiece++,a.currentPiece>=7&&(a.currentPiece=0,a.currentBag++)}t=this.getPieceRotation(a.currentPieceName),i=this.getPieceNumber(a.currentPieceName),this.modifiers.randomColor&&(i=this.random(1,7)),a.piece=new r(a,3,-1,a.currentPieceName,i,t),a.pressed.softDrop>0&&(a.piece.checkCollision(1)||(clearInterval(a.piece.interval),a.piece.interval=setInterval(a.piece.doGravity.bind(a.piece),settings.softDrop))),a.piece.checkCollision(1)||(a.piece.y++,a.piece.y>a.piece.lowestLine&&(a.piece.lowestLine=a.piece.y,a.rotationLimit=0,clearTimeout(a.piece.lockDownTimer))),a.piece.update(),void 0===e&&(a.canHold||a.firstHold?a.canHold=!0:a.firstHold=!0)}}},{key:"hold",value:function(){var e=this.player;console.log(e),e.canHold&&(e.firstHold?(e.canHold=!1,e.currentHoldPiece=[e.currentPieceName,e.currentPieceName=e.currentHoldPiece][0],clearInterval(e.piece.interval),clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,this.spawnPiece("hold")):(e.canHold=!1,e.currentHoldPiece=e.currentPieceName,clearInterval(e.piece.interval),clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,this.spawnPiece()))}},{key:"clearLines",value:function(){for(var e=this.player,i=0,t=game.checkTspin(),a=21;a>=0;a--){for(var r=0,o=0;o<=9;o++)0!==e.boardPosition[o][a]&&r++;if(10==r){for(i++,o=0;o<=9;o++)0!==e.boardPosition[o][a]&&(e.boardPosition[o][a]=0);for(var n=a;n>=0;n--)for(var s=0;s<=9;s++)e.boardPosition[s][n]=0!=n?e.boardPosition[s][n-1]:0;a++}}i>0?e.combo++:(e.combo=0,game.applyGarbage()),game.linesSent(i,t),e.tspinRotate=!1}},{key:"checkTspin",value:function(){var e=this.player;if("T"==e.currentPieceName){var i,t=[!1,!1,!1,!1];if(!e.tspinRotate)return"not";if(e.boardPosition[e.piece.x+0][e.piece.y+1])(i=0-e.piece.angle)<0&&(i=4+i),t[i]=!0;if(e.boardPosition[e.piece.x+2][e.piece.y+1])(i=1-e.piece.angle)<0&&(i=4+i),t[i]=!0;if(e.boardPosition[e.piece.x+2][e.piece.y+3])(i=2-e.piece.angle)<0&&(i=4+i),t[i]=!0;if(e.boardPosition[e.piece.x+0][e.piece.y+3])t[i=3-e.piece.angle]=!0;return t[0]&&t[1]&&(t[2]||t[3])?"tspin":t[2]&&t[3]&&(t[1]||t[0])?"mini":"not"}return"not"}},{key:"linesSent",value:function(e,i){var t=this.player,a=!1,r="",o=0;switch(t.combo){case 0:case 1:break;case 2:case 3:case 4:o+=1;break;case 5:case 6:o+=2;break;case 7:case 8:o+=3;break;case 9:case 10:case 11:o+=4;break;case 12:default:o+=5}r="Combo: "+t.combo.toString()+"<BR>";for(var n=21;n>=18;n--){for(var s=0,c=0;c<=9;c++)""!=t.boardPosition[c][n]&&s++;if(0!=s&&10!=s)break;18==n&&(o+=10,r+="PERFECT CLEAR!!!!!!!!!!!!!<BR>",t.b2b=!1)}if(o<=5)if(1==t.b2b&&4==e)o+=5,r+="Back to back TETRIS!!!<BR>";else if(1==t.b2b&&"not"!=i){if("mini"==i&&e<2)o+=1,r+="Back to back T-spin mini!!!<BR>";else if("tspin"==i||"mini"==i)switch(e){case 1:o+=3,r+="Back to back T-spin single!!!<BR>";break;case 2:o+=5,r+="Back to back T-spin double!!!<BR>",env.b2bTSD&&(a=!0);break;case 3:o+=7,r+="Back to back T-spin triple!!!<BR>"}}else{switch(e){case 1:t.b2b=!1,r+="single<BR>";break;case 2:o+=1,t.b2b=!1,r+="double!<BR>";break;case 3:o+=2,t.b2b=!1,r+="Triple!!<BR>";break;case 4:o+=4,r+="Tetris!!!!!<BR>",t.b2b=!0}if("mini"==i&&e<2)e>0&&(o+=0,t.b2b=!0),r+="T-spin mini<BR>";else if("tspin"==i||"mini"==i){switch(e){case 1:o+=2,r+="T-spin single!<BR>";break;case 2:o+=3,r+="T-spin double!!!<BR>",env.b2bTSD&&(a=!0);break;case 3:o+=4,r+="T-spin triple!!!!!<BR>"}t.b2b=!0}}if(o>1&&settings.handicap&&(o=1),o>=1&&settings.myNameIsMeidy&&(o*=4,o>10&&(o=10)),t.linesSent+=o,env.b2bTSD){if(o=0,e>0&&!a)return void this.loss();a&&(t.stats.b2bTSD++,socket.emit("b2bTSD",t.stats.b2bTSD),o=3),r+="Total Back to Back Tspin Doubles: "+t.stats.b2bTSD+"<br>"}e>0&&game.recordLinesSent(o),r+="lines sent: "+o+"<br>";r+="total lines sent: "+t.linesSent;o=t.reduceGarbage(o),console.log(o),o>0&&socket.emit("linesSent",o),this.clearMessage(),this.writeMessage(r)}},{key:"losingGray",value:function(){for(var e=game.player,i=0;i<=21;i++)for(var t=0;t<=9;t++)0!=e.boardPosition[t][i]&&(e.boardPosition[t][i]=8);game.draw()}},{key:"clean",value:function(){var e=this.player;clearInterval(e.piece.interval)}},{key:"writeMessage",value:function(e){document.getElementById("line").innerHTML+=e;var i=this.modifiers;i.increaseGravity,i.randomColor,i.disableGhost,i.cheeseGarbage,i.oneGarbage,document.getElementById("line").innerHTML+="<br>"}},{key:"clearMessage",value:function(){document.getElementById("line").innerHTML=""}},{key:"newBag",value:function(){var e=this.bag.length;this.bag[e]=["S","Z","I","T","J","L","O"],this.shuffleBag(this.bag[e]),this.bag[e]=this.bag[e].join(",")}},{key:"shuffleBag",value:function(e){for(var i,t,a=e.length;0!==a;)t=Math.floor(Math.random()*a),i=e[a-=1],e[a]=e[t],e[t]=i;return e}},{key:"getPieceNumber",value:function(e){switch(e){case"S":return 1;case"Z":return 2;case"I":return 3;case"T":return 4;case"J":return 5;case"L":return 6;case"O":return 7;default:console.log("no such piece available")}}},{key:"getPieceRotation",value:function(e){switch(e){case"S":return["1,1|2,1|0,2|1,2","1,1|1,2|2,2|2,3","1,2|2,2|0,3|1,3","0,1|0,2|1,2|1,3"];case"Z":return["0,1|1,1|1,2|2,2","2,1|1,2|2,2|1,3","0,2|1,2|1,3|2,3","1,1|0,2|1,2|0,3"];case"I":return["0,1|1,1|2,1|3,1","2,0|2,1|2,2|2,3","0,2|1,2|2,2|3,2","1,0|1,1|1,2|1,3"];case"T":return["1,1|0,2|1,2|2,2","1,1|1,2|2,2|1,3","0,2|1,2|2,2|1,3","1,1|0,2|1,2|1,3"];case"J":return["0,1|0,2|1,2|2,2","1,1|2,1|1,2|1,3","0,2|1,2|2,2|2,3","1,1|1,2|0,3|1,3"];case"L":return["2,1|0,2|1,2|2,2","1,1|2,3|1,2|1,3","0,2|1,2|2,2|0,3","1,1|1,2|0,1|1,3"];case"O":return["1,1|1,2|2,1|2,2","1,1|1,2|2,1|2,2","1,1|1,2|2,1|2,2","1,1|1,2|2,1|2,2"];default:console.log("no such piece available")}}},{key:"shadeColor",value:function(e,i){var t=parseInt(e.slice(1),16),a=i<0?0:255,r=i<0?-1*i:i,o=t>>16,n=t>>8&255,s=255&t;return"#"+(16777216+65536*(Math.round((a-o)*r)+o)+256*(Math.round((a-n)*r)+n)+(Math.round((a-s)*r)+s)).toString(16).slice(1)}},{key:"getPieceColor",value:function(e){switch(e){case 1:return"#69BE28";case 2:return"#ED2939";case 3:return"#009FDA";case 4:return"#952D98";case 5:return"#0065BD";case 6:return"#FF7900";case 7:return"#FECB00";case 8:return"#696969"}}},{key:"draw",value:function(e){function i(){return e.apply(this,arguments)}return i.toString=function(){return e.toString()},i}(function(){for(var e=this.player,i=[],t=e.currentPiece,a=e.currentBag,r=0;r<4;r++){var o=this.bag[a].split(",");i.push(o[t]),++t>=7&&(t=0,a++)}var n={id:this.id,ghost:{y:e.piece.ghost.y,color:e.piece.ghost.color},piece:{rotation:e.piece.rotations[e.piece.angle],x:e.piece.x,y:e.piece.y,color:e.piece.color},boardPosition:e.boardPosition,hold:e.currentHoldPiece,queue:i,incoming:e.getTotalIncoming()};socket.emit("update",n),draw.clearCanvas(draw.boardCanvas),draw.drawGrid(draw.boardCanvas,24);var s=n.piece.rotation.split("|");if(draw.clearCanvas(draw.boardCanvas),!this.modifiers.disableGhost)for(r=0;r<=3;r++){d=s[r].split(","),c=Number(d[0]),l=Number(d[1]),draw.makeBlock(1+24*n.piece.x,1+24*n.ghost.y,c,l,n.ghost.color,draw.boardCanvas,24)}s=n.piece.rotation.split("|");for(r=0;r<=3;r++){var c,l,d;d=s[r].split(","),c=Number(d[0]),l=Number(d[1]),color=draw.getPieceColor(n.piece.color),draw.makeBlock(1+24*n.piece.x,1+24*n.piece.y,c,l,color,draw.boardCanvas,24)}draw.drawBoard(draw.boardCanvas,n.boardPosition,24),draw.drawHold(n.hold),draw.drawQueue(n.queue),draw.drawIncoming(n.incoming)})},{key:"recordBoardPosition",value:function(){for(var e=this.player,i="",t=0;t<=21;t++)for(var a=0;a<=9;a++)e.boardPosition[a][t]>0&&(i+=e.boardPosition[a][t]),i+=".";i+=","+((new Date).getTime()-e.startTime)+"|",e.boardPositionRecord+=i}},{key:"recordLinesSent",value:function(e){var i=this.player,t="";t+=e.toString()+",",t+=(new Date).getTime()-i.startTime+"|",i.linesSentRecord+=t}},{key:"addGarbage",value:function(e){for(var i=this.player,t=this.random(0,9),a=0;a<=20;a++)for(var r=0;r<=9;r++)i.boardPosition[r][a]=i.boardPosition[r][a+e];for(a=0;a<e;a++)if(this.modifiers.cheeseGarbage&&(t=this.random(0,9)),settings.myNameIsMeidy&&(t=settings.random),this.modifiers.oneGarbage){for(r=0;r<=9;r++)i.boardPosition[r][21-a]=0;i.boardPosition[t][21-a]=8}else{for(var r=0;r<=9;r++)i.boardPosition[r][21-a]=8;i.boardPosition[t][21-a]=0}i.piece.update()}},{key:"applyGarbage",value:function(){var e=this.player;if(void 0!==e.incoming.length){var i=!0,t=!1,a=void 0;try{for(var r,o=e.incoming[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var n=r.value;game.addGarbage(n)}}catch(e){t=!0,a=e}finally{try{i||null==o.return||o.return()}finally{if(t)throw a}}e.incoming=[]}}},{key:"applyRandomModifier",value:function(){if(console.log("Applied Random Modifer"),1==this.modifiers.level)switch(this.random(1,6)){case 1:settings.gravity=100,this.modifiers.increaseGravity=!0;break;case 2:this.modifiers.randomColor=!0;break;case 3:this.modifiers.disableGhost=!0;break;case 4:this.modifiers.cheeseGarbage=!0;break;case 6:this.modifiers.oneGarbage=!0}if(2==this.modifiers.level)switch(this.random(1,1)){case 1:this.modifiers.cheeseGarbage=!0}if(4==this.modifiers.level)switch(this.random(1,1)){case 1:this.modifiers.oneGarbage=!0}}},{key:"random",value:function(e,i){return e=Math.ceil(e),i=Math.floor(i),Math.floor(Math.random()*(i-e+1))+e}},{key:"meidy",value:function(){settings.random=game.random(0,9)}}])&&a(i.prototype,t),n&&a(i,n),e}();window.game=new n},function(e,i,t){function a(e,i){for(var t=0;t<i.length;t++){var a=i[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var r=t(5),o=function(){function e(i,t,a,o,n,s){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.player=i,this.x=t,this.y=a,this.pieceName=o,this.color=n,this.angle=0,this.oldX=[0,0,0,0],this.oldY=[0,0,0,0],this.rotations=s,this.lowestLine=0,this.rotationLimit=0,this.interval=setInterval(this.doGravity.bind(this),settings.gravity),this.lockDownTimer=!1;n=game.getPieceColor(n);this.ghost=new r(i,this,n)}var i,t,o;return i=e,(t=[{key:"update",value:function(){this.ghost.update(),game.draw()}},{key:"doGravity",value:function(){var e=this.player;if(!this.checkCollision(1)){for(this.y++;0==settings.softDrop&&!this.checkCollision(1)&&e.isPressed("softDrop");)this.y++;this.y>this.lowestLine&&(this.lowestLine=this.y,this.rotationLimit=0,clearTimeout(this.lockDownTimer),this.lockDownTimer=!1),this.player.tspinRotate=!1}this.lockdown(),this.update()}},{key:"draw",value:function(e){function i(){return e.apply(this,arguments)}return i.toString=function(){return e.toString()},i}(function(){for(var e=this.rotations[this.angle].split("|"),i=0;i<=3;i++){var t,a,r;r=e[i].split(","),t=Number(r[0]),a=Number(r[1]),color=game.getPieceColor(this.color),draw.makeBlock(1+24*this.x,1+24*this.y,t,a,color,tetrisBoard.canvas)}game.drawBoard()})},{key:"lockdown",value:function(e){this.checkCollision(1)?this.rotationLimit>15?this.die():this.lockDownTimer||(this.lockDownTimer=setTimeout(this.die.bind(this),500)):(clearTimeout(this.lockDownTimer),this.lockDownTimer=!1)}},{key:"die",value:function(){if(this.checkCollision(1)){clearInterval(this.interval),clearTimeout(this.lockDownTimer),this.lockDownTimer=!1;for(var e=this.rotations[this.angle].split("|"),i=0;i<=3;i++){var t,a,r;r=e[i].split(","),t=Number(r[0]),a=Number(r[1]),this.player.boardPosition[this.x+t][this.y+a]=this.color}game.clearLines(),game.recordBoardPosition(),game.checkLoss()?game.loss():game.spawnPiece()}}},{key:"checkCollision",value:function(e){for(var i=this.rotations[this.angle].split("|"),t=0;t<=3;t++){var a=0,r=0,o=i[t].split(","),n=Number(o[0]),s=Number(o[1]);switch(e){case 0:a=1;break;case 1:r=1;break;case 2:a=-1;break;case 3:r=-1;break;default:console.log("no such direction")}if(this.x+n+a<0||this.x+n+a>9||this.y+s+r<0||this.y+s+r>21)return!0;if(0!==this.player.boardPosition[this.x+n+a][this.y+s+r])return!0}return!1}},{key:"canRotate",value:function(e){var i;(i=this.angle+e)<0&&(i+=4),i>3&&(i-=4);for(var t=0;t<=4;t++){var a,r;if("I"===this.player.currentPieceName){if(0===this.angle&&1===e||3===this.angle&&-1===e||1===this.angle&&-1===e||2===this.angle&&1===e)switch(t){case 0:a=0,r=0;break;case 1:a=-2,r=0;break;case 2:a=1,r=0;break;case 3:a=-2,r=1;break;case 4:a=1,r=-2}if((1===this.angle&&-1===e||2===this.angle&&1===e)&&(a*=-1,r*=-1),1===this.angle&&1===e||0===this.angle&&-1===e||2===this.angle&&-1===e||3===this.angle&&1===e)switch(t){case 0:a=0,r=0;break;case 1:a=-1,r=0;break;case 2:a=2,r=0;break;case 3:a=-1,r=-2;break;case 4:a=2,r=1}(2===this.angle&&-1===e||3===this.angle&&1===e)&&(a*=-1,r*=-1)}else{if(0===this.angle&&1===e||2===this.angle&&-1===e||1===this.angle&&-1===e||1===this.angle&&1===e)switch(t){case 0:a=0,r=0;break;case 1:a=-1,r=0;break;case 2:a=-1,r=-1;break;case 3:a=-2,r=2;break;case 4:a=-1,r=2}if((1===this.angle&&-1===e||1===this.angle&&1===e)&&(a*=-1,r*=-1),2===this.angle&&1===e||0===this.angle&&-1===e||3===this.angle&&-1===e||3===this.angle&&1===e)switch(t){case 0:a=0,r=0;break;case 1:a=1,r=0;break;case 2:a=1,r=-1;break;case 3:a=0,r=2;break;case 4:a=1,r=2}(3===this.angle&&-1===e||3===this.angle&&1===e)&&(a*=-1,r*=-1)}for(var o=0,n=this.rotations[i].split("|"),s=0;s<=3;s++){var c=n[s].split(","),l=Number(c[0]),d=Number(c[1]);if(this.x+l+a<0||this.x+l+a>9||this.y+d+r<0||this.y+d+r>21)break;if(0===this.player.boardPosition[this.x+l+a][this.y+d+r]&&4==++o)return this.x+=a,this.y+=r,!0}}return!1}}])&&a(i.prototype,t),o&&a(i,o),e}();e.exports=o},function(e,i){function t(e,i){for(var t=0;t<i.length;t++){var a=i[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var a=function(){function e(i,t,a){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.player=i,this.piece=t,this.color=game.shadeColor(a,-.5),this.pieceName=i.currentPieceName,this.angle=t.angle,this.rotations=t.rotations[t.angle]}var i,a,r;return i=e,(a=[{key:"update",value:function(){for(this.x=this.piece.x,this.y=this.piece.y,this.angle=this.piece.angle,this.rotations=this.piece.rotations[this.piece.angle];!this.checkDown();)this.y++}},{key:"checkDown",value:function(){for(var e=this.rotations.split("|"),i=0;i<=3;i++){var t=e[i].split(","),a=Number(t[0]),r=Number(t[1]);if(this.x+a<0||this.x+a>9||this.y+r+1<0||this.y+r+1>21)return!0;if(0!==this.player.boardPosition[this.x+a][this.y+r+1])return!0}return!1}}])&&t(i.prototype,a),r&&t(i,r),e}();e.exports=a},function(e,i){},function(e,i){window.addEventListener("keyup",function(e){key.onKeyUp(e)},!1),window.addEventListener("keydown",function(e){key.onKeyDown(e)},!1),window.key={moveLeft:37,rotateRight:38,moveRight:39,softDrop:40,rotateLeft:17,rotateRightMac:91,hardDrop:32,hold:16,rotateHalf:90,rotateHalf2:65,onKeyDown:function(e){window.dokeydown(e.keyCode)},onKeyUp:function(e){window.dokeyup(e.keyCode)}},window.dokeydown=function(e){var i=window.game,t=window.game.player,a="";switch(e){case key.rotateLeft:a="rotateLeft";break;case key.rotateRightMac:a="rotateRight";break;case key.moveLeft:a="moveLeft";break;case key.hardDrop:a="hardDrop";break;case key.hold:a="hold";break;case key.rotateRight:a="rotateRight";break;case key.moveRight:a="moveRight";break;case key.softDrop:a="softDrop";break;case key.rotateHalf:case key.rotateHalf2:a="rotateHalf"}switch(a){case"moveLeft":t.isPressed("moveLeft")||i.moveLeft(t);break;case"rotateRight":t.isPressed("rotateRight")||i.rotateRight(t);break;case"moveRight":t.isPressed("moveRight")||i.moveRight(t);break;case"softDrop":t.isPressed("softDrop")||i.softDrop(t);break;case"rotateLeft":t.isPressed("rotateLeft")||i.rotateLeft(t);break;case"rotateHalf":t.isPressed("rotateHalf")||i.rotateHalf(t);break;case"hardDrop":t.isPressed("hardDrop")||i.hardDrop(t);break;case"hold":t.isPressed("hold")||(t.tspinRotate=!1,i.hold(t))}t.pressed[a]=(new Date).getTime()},window.dokeyup=function(e){window.game;var i=window.game.player,t="";switch(e){case key.rotateLeft:t="rotateLeft";break;case key.rotateRightMac:t="rotateRight";break;case key.moveLeft:t="moveLeft";break;case key.hardDrop:t="hardDrop";break;case key.hold:t="hold";break;case key.rotateRight:t="rotateRight";break;case key.moveRight:t="moveRight";break;case key.softDrop:t="softDrop";break;case key.rotateHalf:case key.rotateHalf2:t="rotateHalf"}switch(t){case"softDrop":clearInterval(i.piece.interval),i.piece.interval=setInterval(i.piece.doGravity.bind(i.piece),settings.gravity)}delete i.pressed[t]}},function(e,i){window.draw={queueCanvas:document.getElementById("queueCanvas"),holdCanvas:document.getElementById("holdCanvas"),boardCanvas:document.getElementById("boardCanvas"),playerIncomingCanvas:document.getElementById("playerIncomingCanvas"),makeBlock:function(e,i,t,a,r,o,n){o!=draw.holdCanvas&&o!=draw.queueCanvas&&(a-=2);var s=o.getContext("2d");s.fillStyle=r,s.fillRect(e+t*n,i+a*n,n,n),s.beginPath(),s.rect(e+t*n,i+a*n,n,n),s.stroke(),s.globalAlpha=1},drawS:function(e,i,t,a){var r="#69BE28";game.modifiers.randomColor&&(r="#ED2939"),this.makeBlock(e,i,2,1,r,t,a),this.makeBlock(e,i,1,1,r,t,a),this.makeBlock(e,i,1,2,r,t,a),this.makeBlock(e,i,0,2,r,t,a)},drawZ:function(e,i,t,a){var r="#ED2939";game.modifiers.randomColor&&(r="#69BE28"),this.makeBlock(e,i,0,1,r,t,a),this.makeBlock(e,i,1,1,r,t,a),this.makeBlock(e,i,1,2,r,t,a),this.makeBlock(e,i,2,2,r,t,a)},drawI:function(e,i,t,a){var r="#009FDA";game.modifiers.randomColor&&(r="#FECB00"),this.makeBlock(e,i,0,1,r,t,a),this.makeBlock(e,i,1,1,r,t,a),this.makeBlock(e,i,2,1,r,t,a),this.makeBlock(e,i,3,1,r,t,a)},drawT:function(e,i,t,a){var r="#952D98";game.modifiers.randomColor&&(r="#009FDA"),this.makeBlock(e,i,1,1,r,t,a),this.makeBlock(e,i,0,2,r,t,a),this.makeBlock(e,i,1,2,r,t,a),this.makeBlock(e,i,2,2,r,t,a)},drawJ:function(e,i,t,a){var r="#0065BD";game.modifiers.randomColor&&(r="#FF7900"),this.makeBlock(e,i,0,1,r,t,a),this.makeBlock(e,i,0,2,r,t,a),this.makeBlock(e,i,1,2,r,t,a),this.makeBlock(e,i,2,2,r,t,a)},drawL:function(e,i,t,a){var r="#FF7900";game.modifiers.randomColor&&(r="#0065BD"),this.makeBlock(e,i,2,1,r,t,a),this.makeBlock(e,i,0,2,r,t,a),this.makeBlock(e,i,1,2,r,t,a),this.makeBlock(e,i,2,2,r,t,a)},drawO:function(e,i,t,a){var r="#FECB00";game.modifiers.randomColor&&(r="#952D98"),this.makeBlock(e,i,1,1,r,t,a),this.makeBlock(e,i,1,2,r,t,a),this.makeBlock(e,i,2,1,r,t,a),this.makeBlock(e,i,2,2,r,t,a)},clearCanvas:function(e){e.getContext("2d").clearRect(0,0,e.width,e.height)},drawPlayerIncoming:function(){draw.clearCanvas(draw.playerIncomingCanvas);var e=draw.playerIncomingCanvas.getContext("2d");e.fillStyle="red";var i=player.getTotalIncoming();i>22?e.fillRect(0,1,4,draw.playerIncomingCanvas.height):e.fillRect(0,1+draw.playerIncomingCanvas.height-i*width,4,1+draw.playerIncomingCanvas.height-i*width)},drawGrid:function(e,i){this.blockWidth=i,e.width=10*this.blockWidth+2,e.height=20*this.blockWidth+2,this.context=e.getContext("2d");for(var t=1;t<=e.width;t+=this.blockWidth)this.context.moveTo(t,0),this.context.lineTo(t,e.height);for(var a=1;a<=e.height;a+=this.blockWidth)this.context.moveTo(0,a),this.context.lineTo(e.width,a);this.context.strokeStyle="black",this.context.stroke();var r=e.toDataURL();e.style.backgroundImage="url("+r+")"},otherPlayerCanvas:[]}},function(e,i){window.draw.getPieceColor=function(e){switch(e){case 1:return"#69BE28";case 2:return"#ED2939";case 3:return"#009FDA";case 4:return"#952D98";case 5:return"#0065BD";case 6:return"#FF7900";case 7:return"#FECB00";case 8:return"#696969"}}},function(e,i){window.shadeColor=function(e,i){var t=parseInt(e.slice(1),16),a=i<0?0:255,r=i<0?-1*i:i,o=t>>16,n=t>>8&255,s=255&t;return"#"+(16777216+65536*(Math.round((a-o)*r)+o)+256*(Math.round((a-n)*r)+n)+(Math.round((a-s)*r)+s)).toString(16).slice(1)}},function(e,i){window.draw.drawBoard=function(e,i,t){for(var a=2;a<=21;a++)for(var r=0;r<=9;r++)if(0!==i[r][a]){var o=draw.getPieceColor(i[r][a]);o=shadeColor(o,-.15),draw.makeBlock(1+r*t,1+a*t,0,0,o,e,t)}}},function(e,i){window.draw.drawHold=function(e){switch(draw.clearCanvas(draw.holdCanvas,24),e){case"S":draw.drawS(1,1,draw.holdCanvas,24);break;case"Z":draw.drawZ(1,1,draw.holdCanvas,24);break;case"I":draw.drawI(1,1,draw.holdCanvas,24);break;case"T":draw.drawT(1,1,draw.holdCanvas,24);break;case"J":draw.drawJ(1,1,draw.holdCanvas,24);break;case"L":draw.drawL(1,1,draw.holdCanvas,24);break;case"O":draw.drawO(1,1,draw.holdCanvas,24);break;case"":break;default:console.log("no such piece available")}}},function(e,i){window.draw.drawQueue=function(e){draw.clearCanvas(draw.queueCanvas,24);for(var i=0;i<=3;i++)switch(e[i]){case"S":draw.drawS(1,96*i+1,draw.queueCanvas,24);break;case"Z":draw.drawZ(1,96*i+1,draw.queueCanvas,24);break;case"I":draw.drawI(1,96*i+1,draw.queueCanvas,24);break;case"T":draw.drawT(1,96*i+1,draw.queueCanvas,24);break;case"J":draw.drawJ(1,96*i+1,draw.queueCanvas,24);break;case"L":draw.drawL(1,96*i+1,draw.queueCanvas,24);break;case"O":draw.drawO(1,96*i+1,draw.queueCanvas,24);break;default:console.log("no such piece available")}}},function(e,i){window.draw.drawIncoming=function(e){draw.clearCanvas(draw.playerIncomingCanvas);var i=draw.playerIncomingCanvas.getContext("2d");i.fillStyle="red",e>19?i.fillRect(0,1,4,draw.playerIncomingCanvas.height):i.fillRect(0,1+draw.playerIncomingCanvas.height-24*e,4,1+draw.playerIncomingCanvas.height-24*(20-e))}},function(e,i,t){"use strict";t.r(i);t(2),t(3),t(0),t(7),t(8),t(9),t(10),t(11),t(12),t(13),t(14)}]);