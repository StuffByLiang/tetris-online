!function(e){var t={};function i(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){e.exports=i(7)},function(e,t){window.settings={arr:void 0===Cookies.get("arr")?0:Cookies.get("arr"),das:void 0===Cookies.get("das")?120:Cookies.get("das"),gravity:void 0===Cookies.get("gravity")?1e3:Cookies.get("gravity"),softDrop:void 0===Cookies.get("softDrop")?10:Cookies.get("softDrop"),handicap:!1,myNameIsMeidy:!1}},function(e,t){window.saveSettings=function(){settings.das=parseInt($("#das").val(),10),settings.arr=parseInt($("#arr").val(),10),settings.gravity=parseInt($("#gravity").val(),10),settings.softDrop=parseInt($("#softDrop").val(),10),Cookies.set("das",settings.das,{expires:999999999}),Cookies.set("arr",settings.arr,{expires:999999999}),Cookies.set("gravity",settings.gravity,{expires:999999999}),Cookies.set("softDrop",settings.softDrop,{expires:999999999}),toggleSettings()}},function(e,t){window.toggleSettings=function(){$("#settings-container").is(":visible")?$("#settings-container").hide():($("#settings-container").show(),$("#das").val(settings.das),$("#arr").val(settings.arr),$("#gravity").val(settings.gravity),$("#softDrop").val(settings.softDrop))}},function(e,t){window.addEventListener("keyup",function(e){key.onKeyUp(e)},!1),window.addEventListener("keydown",function(e){key.onKeyDown(e)},!1),window.key={moveLeft:37,rotateRight:38,moveRight:39,softDrop:40,rotateLeft:17,rotateRightMac:91,hardDrop:32,hold:16,rotateHalf:90,rotateHalf2:65,onKeyDown:function(e){window.dokeydown(e.keyCode)},onKeyUp:function(e){window.dokeyup(e.keyCode)}},window.dokeydown=function(e){var t=window.game,i=window.game.player,a="";switch(e){case key.rotateLeft:a="rotateLeft";break;case key.rotateRightMac:a="rotateRight";break;case key.moveLeft:a="moveLeft";break;case key.hardDrop:a="hardDrop";break;case key.hold:a="hold";break;case key.rotateRight:a="rotateRight";break;case key.moveRight:a="moveRight";break;case key.softDrop:a="softDrop";break;case key.rotateHalf:case key.rotateHalf2:a="rotateHalf"}switch(a){case"moveLeft":i.isPressed("moveLeft")||t.moveLeft(i);break;case"rotateRight":i.isPressed("rotateRight")||t.rotateRight(i);break;case"moveRight":i.isPressed("moveRight")||t.moveRight(i);break;case"softDrop":i.isPressed("softDrop")||t.softDrop(i);break;case"rotateLeft":i.isPressed("rotateLeft")||t.rotateLeft(i);break;case"rotateHalf":i.isPressed("rotateHalf")||t.rotateHalf(i);break;case"hardDrop":i.isPressed("hardDrop")||t.hardDrop(i);break;case"hold":i.isPressed("hold")||(i.tspinRotate=!1,t.hold(i))}i.pressed[a]=(new Date).getTime()},window.dokeyup=function(e){window.game;var t=window.game.player,i="";switch(e){case key.rotateLeft:i="rotateLeft";break;case key.rotateRightMac:i="rotateRight";break;case key.moveLeft:i="moveLeft";break;case key.hardDrop:i="hardDrop";break;case key.hold:i="hold";break;case key.rotateRight:i="rotateRight";break;case key.moveRight:i="moveRight";break;case key.softDrop:i="softDrop";break;case key.rotateHalf:case key.rotateHalf2:i="rotateHalf"}switch(i){case"softDrop":clearInterval(t.piece.interval),t.piece.interval=setInterval(t.piece.doGravity.bind(t.piece),settings.gravity)}delete t.pressed[i]}},function(e,t){window.shadeColor=function(e,t){var i=parseInt(e.slice(1),16),a=t<0?0:255,r=t<0?-1*t:t,o=i>>16,n=i>>8&255,s=255&i;return"#"+(16777216+65536*(Math.round((a-o)*r)+o)+256*(Math.round((a-n)*r)+n)+(Math.round((a-s)*r)+s)).toString(16).slice(1)}},function(e,t){e.exports=function(e){switch(e){case 1:return"#69BE28";case 2:return"#ED2939";case 3:return"#009FDA";case 4:return"#952D98";case 5:return"#0065BD";case 6:return"#FF7900";case 7:return"#FECB00";case 8:return"#696969"}}},function(e,t,i){"use strict";i.r(t);i(1),i(2),i(3);function a(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var r=function(){function e(t,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.player=t,this.piece=i,this.color=game.shadeColor(a,-.5),this.pieceName=t.currentPieceName,this.angle=i.angle,this.rotations=i.rotations[i.angle]}var t,i,r;return t=e,(i=[{key:"update",value:function(){for(this.x=this.piece.x,this.y=this.piece.y,this.angle=this.piece.angle,this.rotations=this.piece.rotations[this.piece.angle];!this.checkDown();)this.y++}},{key:"checkDown",value:function(){for(var e=this.rotations.split("|"),t=0;t<=3;t++){var i=e[t].split(","),a=Number(i[0]),r=Number(i[1]);if(this.x+a<0||this.x+a>9||this.y+r+1<0||this.y+r+1>21)return!0;if(0!==this.player.boardPosition[this.x+a][this.y+r+1])return!0}return!1}}])&&a(t.prototype,i),r&&a(t,r),e}();function o(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var n=function(){function e(t,i,a,o,n,s){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.player=t,this.x=i,this.y=a,this.pieceName=o,this.color=n,this.angle=0,this.oldX=[0,0,0,0],this.oldY=[0,0,0,0],this.rotations=s,this.lowestLine=0,this.rotationLimit=0,this.interval=setInterval(this.doGravity.bind(this),settings.gravity),this.lockDownTimer=!1;n=game.getPieceColor(n);this.ghost=new r(t,this,n)}var t,i,a;return t=e,(i=[{key:"update",value:function(){this.ghost.update(),game.draw()}},{key:"doGravity",value:function(){console.log("lol");var e=this.player;if(!this.checkCollision(1)){for(this.y++;0==settings.softDrop&&!this.checkCollision(1)&&e.isPressed("softDrop");)this.y++;this.y>this.lowestLine&&(this.lowestLine=this.y,this.rotationLimit=0,clearTimeout(this.lockDownTimer),this.lockDownTimer=!1),this.player.tspinRotate=!1}this.lockdown(),this.update()}},{key:"draw",value:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){for(var e=this.rotations[this.angle].split("|"),t=0;t<=3;t++){var i,a,r;r=e[t].split(","),i=Number(r[0]),a=Number(r[1]),color=game.getPieceColor(this.color),draw.makeBlock(1+24*this.x,1+24*this.y,i,a,color,tetrisBoard.canvas)}game.drawBoard()})},{key:"lockdown",value:function(e){this.checkCollision(1)?this.rotationLimit>15?this.die():this.lockDownTimer||(this.lockDownTimer=setTimeout(this.die.bind(this),500)):(clearTimeout(this.lockDownTimer),this.lockDownTimer=!1)}},{key:"die",value:function(){if(this.checkCollision(1)){clearInterval(this.interval),clearTimeout(this.lockDownTimer),this.lockDownTimer=!1;for(var e=this.rotations[this.angle].split("|"),t=0;t<=3;t++){var i,a,r;r=e[t].split(","),i=Number(r[0]),a=Number(r[1]),this.player.boardPosition[this.x+i][this.y+a]=this.color}game.clearLines(),game.recordBoardPosition(),game.checkLoss()?game.loss():game.spawnPiece()}}},{key:"checkCollision",value:function(e){for(var t=this.rotations[this.angle].split("|"),i=0;i<=3;i++){var a=0,r=0,o=t[i].split(","),n=Number(o[0]),s=Number(o[1]);switch(e){case 0:a=1;break;case 1:r=1;break;case 2:a=-1;break;case 3:r=-1;break;default:console.log("no such direction")}if(this.x+n+a<0||this.x+n+a>9||this.y+s+r<0||this.y+s+r>21)return!0;if(0!==this.player.boardPosition[this.x+n+a][this.y+s+r])return!0}return!1}},{key:"canRotate",value:function(e){var t;(t=this.angle+e)<0&&(t+=4),t>3&&(t-=4);for(var i=0;i<=4;i++){var a,r;if("I"===this.player.currentPieceName){if(0===this.angle&&1===e||3===this.angle&&-1===e||1===this.angle&&-1===e||2===this.angle&&1===e)switch(i){case 0:a=0,r=0;break;case 1:a=-2,r=0;break;case 2:a=1,r=0;break;case 3:a=-2,r=1;break;case 4:a=1,r=-2}if((1===this.angle&&-1===e||2===this.angle&&1===e)&&(a*=-1,r*=-1),1===this.angle&&1===e||0===this.angle&&-1===e||2===this.angle&&-1===e||3===this.angle&&1===e)switch(i){case 0:a=0,r=0;break;case 1:a=-1,r=0;break;case 2:a=2,r=0;break;case 3:a=-1,r=-2;break;case 4:a=2,r=1}(2===this.angle&&-1===e||3===this.angle&&1===e)&&(a*=-1,r*=-1)}else{if(0===this.angle&&1===e||2===this.angle&&-1===e||1===this.angle&&-1===e||1===this.angle&&1===e)switch(i){case 0:a=0,r=0;break;case 1:a=-1,r=0;break;case 2:a=-1,r=-1;break;case 3:a=-2,r=2;break;case 4:a=-1,r=2}if((1===this.angle&&-1===e||1===this.angle&&1===e)&&(a*=-1,r*=-1),2===this.angle&&1===e||0===this.angle&&-1===e||3===this.angle&&-1===e||3===this.angle&&1===e)switch(i){case 0:a=0,r=0;break;case 1:a=1,r=0;break;case 2:a=1,r=-1;break;case 3:a=0,r=2;break;case 4:a=1,r=2}(3===this.angle&&-1===e||3===this.angle&&1===e)&&(a*=-1,r*=-1)}for(var o=0,n=this.rotations[t].split("|"),s=0;s<=3;s++){var c=n[s].split(","),l=Number(c[0]),d=Number(c[1]);if(this.x+l+a<0||this.x+l+a>9||this.y+d+r<0||this.y+d+r>21)break;if(0===this.player.boardPosition[this.x+l+a][this.y+d+r]&&4==++o)return this.x+=a,this.y+=r,!0}}return!1}}])&&o(t.prototype,i),a&&o(t,a),e}();function s(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.currentBag=0,this.currentPiece=0,this.currentPieceName="",this.canHold=!0,this.currentHoldPiece="",this.firstHold=!1,this.b2b=!1,this.tspinRotate=!1,this.combo=0,this.linesSent=0,this.incoming=[],this.boardPosition=[[],[]],this.pressed={},this.begin=!1,this.startTime=0,this.linesSentRecord="",this.boardPositionRecord="",this.stats={b2bTSD:0};for(var t=-1;t<=10;t++){this.boardPosition[t]=[];for(var i=-1;i<=22;i++)this.boardPosition[t][i]=0,-1!=t&&10!=t&&-1!=i&&22!=i||(this.boardPosition[t][i]=1)}}var t,i,a;return t=e,(i=[{key:"isPressed",value:function(e){return void 0!==this.pressed[e]}},{key:"addToIncoming",value:function(e){this.incoming.push(e)}},{key:"getTotalIncoming",value:function(){if(void 0!==this.incoming.length){var e=0,t=!0,i=!1,a=void 0;try{for(var r,o=this.incoming[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){e+=r.value}}catch(e){i=!0,a=e}finally{try{t||null==o.return||o.return()}finally{if(i)throw a}}return e}}},{key:"reduceGarbage",value:function(e){for(var t=game.player,i=0;i<t.incoming.length;i++)e>t.incoming[i]?(e-=t.incoming[i],t.incoming.shift(),i--):e<t.incoming[i]&&(t.incoming[i]-=e,e=0);return e}}])&&s(t.prototype,i),a&&s(t,a),e}();function l(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.io=t,this.player=null,this.bag=[],this.id=null,this.randomModiferInterval=null,this.modifiers=null}var t,i,a;return t=e,(i=[{key:"start",value:function(){this.reset(),this.player=new c;var e=this.player;e.begin||(e.begin=!0,e.startTime=(new Date).getTime(),this.spawnPiece())}},{key:"reset",value:function(){if(null!=this.player){$("#otherPlayerCanvas").html("");var e=this.player;this.bag=[],clearInterval(e.piece.interval),e.piece=null}settings.myNameIsMeidy&&(game.meidy(),clearInterval(settings.meidy),settings.meidy=setInterval(function(){game.meidy()},2e4)),env.modifiers&&(settings.gravity=1e3,clearInterval(this.randomModifierInterval),this.randomModiferInterval=setInterval(this.applyRandomModifier.bind(this),7e3)),this.modifiers={increaseGravity:!1,randomColor:!1,disableGhost:!1,cheeseGarbage:!1,oneGarbage:!1,noHardDrop:!1,noHold:!1,level:1}}},{key:"checkLoss",value:function(){for(var e=this.player,t=!1,i=0;i<=1;i++)for(var a=3;a<=6;a++)0!=e.boardPosition[a][i]&&(t=!0);return t}},{key:"loss",value:function(){console.log("YOU FUCKING LOST"),socket.emit("died"),game.losingGray(),this.player.begin=!1,$(".note").show()}},{key:"moveLeft",value:function(){var e=this.player;e.canMoveLeft=setTimeout(this.doMoveLeft.bind(this),settings.das),e.piece.checkCollision(2)||(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.tspinRotate=!1,e.piece.lockdown(),e.piece.x--,e.piece.update()),delete e.pressed.moveRight}},{key:"doMoveLeft",value:function(){var e=this.player;e.pressed.moveLeft>0&&(e.piece.checkCollision(2)||(e.tspinRotate=!1,e.piece.lockdown(),e.piece.x--,e.piece.update()),e.canMoveLeft=setTimeout(this.doMoveLeft.bind(this),settings.arr))}},{key:"rotateRight",value:function(){var e=this.player;e.piece.canRotate(1)&&(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.piece.angle++,e.piece.angle>3&&(e.piece.angle=0),e.tspinRotate=!0,e.piece.lockdown(),e.piece.update())}},{key:"moveRight",value:function(){var e=this.player;e.canMoveRight=setTimeout(this.doMoveRight.bind(this),settings.das),e.piece.checkCollision(0)||(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.tspinRotate=!1,e.piece.lockdown(),e.piece.x++,e.piece.update()),delete e.pressed.moveLeft}},{key:"doMoveRight",value:function(){var e=this.player;e.pressed.moveRight>0&&(e.piece.checkCollision(0)||(e.tspinRotate=!1,e.piece.lockdown(),e.piece.x++,e.piece.update()),e.canMoveRight=setTimeout(this.doMoveRight.bind(this),settings.arr))}},{key:"softDrop",value:function(){var e=this.player;e.piece.checkCollision(1)||(clearInterval(e.piece.interval),e.piece.interval=setInterval(e.piece.doGravity.bind(e.piece),settings.softDrop),e.piece.y++,e.piece.y>e.piece.lowestLine&&(e.piece.lowestLine=e.piece.y,e.piece.rotationLimit=0,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1),e.tspinRotate=!1,e.piece.lockdown(),e.piece.update())}},{key:"rotateLeft",value:function(){var e=this.player;e.piece.canRotate(-1)&&(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.piece.angle--,e.piece.angle<0&&(e.piece.angle=3),e.tspinRotate=!0,e.piece.lockdown(),e.piece.update())}},{key:"rotateHalf",value:function(){var e=this.player;e.piece.canRotate(2)&&(e.piece.rotationLimit++,clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,e.piece.angle+=2,e.piece.angle>3&&(e.piece.angle-=4),e.tspinRotate=!0,e.piece.lockdown(),e.piece.update())}},{key:"hardDrop",value:function(){if(!this.checkLoss()&&!this.modifiers.noHardDrop){for(var e=this.player;!e.piece.checkCollision(1);)e.tspinRotate=!1,e.piece.y++;e.piece.update(),e.piece.die()}}},{key:"spawnPiece",value:function(e){if(!this.checkLoss()){var t,i,a=this.player;if(void 0===e){null==this.bag[a.currentBag+1]&&this.newBag();var r=this.bag[a.currentBag].split(",");a.currentPieceName=r[a.currentPiece],a.currentPiece++,a.currentPiece>=7&&(a.currentPiece=0,a.currentBag++)}i=this.getPieceRotation(a.currentPieceName),t=this.getPieceNumber(a.currentPieceName),this.modifiers.randomColor&&(t=this.random(1,7)),a.piece=new n(a,3,-1,a.currentPieceName,t,i),a.pressed.softDrop>0&&(a.piece.checkCollision(1)||(clearInterval(a.piece.interval),a.piece.interval=setInterval(a.piece.doGravity.bind(a.piece),settings.softDrop))),a.piece.checkCollision(1)||(a.piece.y++,a.piece.y>a.piece.lowestLine&&(a.piece.lowestLine=a.piece.y,a.rotationLimit=0,clearTimeout(a.piece.lockDownTimer))),a.piece.update(),void 0===e&&(a.canHold||a.firstHold?a.canHold=!0:a.firstHold=!0)}}},{key:"hold",value:function(){var e=this.player;console.log(e),e.canHold&&(e.firstHold?(e.canHold=!1,e.currentHoldPiece=[e.currentPieceName,e.currentPieceName=e.currentHoldPiece][0],clearInterval(e.piece.interval),clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,this.spawnPiece("hold")):(e.canHold=!1,e.currentHoldPiece=e.currentPieceName,clearInterval(e.piece.interval),clearTimeout(e.piece.lockDownTimer),e.piece.lockDownTimer=!1,this.spawnPiece()))}},{key:"clearLines",value:function(){for(var e=this.player,t=0,i=game.checkTspin(),a=21;a>=0;a--){for(var r=0,o=0;o<=9;o++)0!==e.boardPosition[o][a]&&r++;if(10==r){for(t++,o=0;o<=9;o++)0!==e.boardPosition[o][a]&&(e.boardPosition[o][a]=0);for(var n=a;n>=0;n--)for(var s=0;s<=9;s++)e.boardPosition[s][n]=0!=n?e.boardPosition[s][n-1]:0;a++}}t>0?e.combo++:(e.combo=0,game.applyGarbage()),game.linesSent(t,i),e.tspinRotate=!1}},{key:"checkTspin",value:function(){var e=this.player;if("T"==e.currentPieceName){var t,i=[!1,!1,!1,!1];if(!e.tspinRotate)return"not";if(e.boardPosition[e.piece.x+0][e.piece.y+1])(t=0-e.piece.angle)<0&&(t=4+t),i[t]=!0;if(e.boardPosition[e.piece.x+2][e.piece.y+1])(t=1-e.piece.angle)<0&&(t=4+t),i[t]=!0;if(e.boardPosition[e.piece.x+2][e.piece.y+3])(t=2-e.piece.angle)<0&&(t=4+t),i[t]=!0;if(e.boardPosition[e.piece.x+0][e.piece.y+3])i[t=3-e.piece.angle]=!0;return i[0]&&i[1]&&(i[2]||i[3])?"tspin":i[2]&&i[3]&&(i[1]||i[0])?"mini":"not"}return"not"}},{key:"linesSent",value:function(e,t){var i=this.player,a=!1,r="",o=0;switch(i.combo){case 0:case 1:break;case 2:case 3:case 4:o+=1;break;case 5:case 6:o+=2;break;case 7:case 8:o+=3;break;case 9:case 10:case 11:o+=4;break;case 12:default:o+=5}r="Combo: "+i.combo.toString()+"<BR>";for(var n=21;n>=18;n--){for(var s=0,c=0;c<=9;c++)""!=i.boardPosition[c][n]&&s++;if(0!=s&&10!=s)break;18==n&&(o+=10,r+="PERFECT CLEAR!!!!!!!!!!!!!<BR>",i.b2b=!1)}if(o<=5)if(1==i.b2b&&4==e)o+=5,r+="Back to back TETRIS!!!<BR>";else if(1==i.b2b&&"not"!=t){if("mini"==t&&e<2)o+=1,r+="Back to back T-spin mini!!!<BR>";else if("tspin"==t||"mini"==t)switch(e){case 1:o+=3,r+="Back to back T-spin single!!!<BR>";break;case 2:o+=5,r+="Back to back T-spin double!!!<BR>",env.b2bTSD&&(a=!0);break;case 3:o+=7,r+="Back to back T-spin triple!!!<BR>"}}else{switch(e){case 1:i.b2b=!1,r+="single<BR>";break;case 2:o+=1,i.b2b=!1,r+="double!<BR>";break;case 3:o+=2,i.b2b=!1,r+="Triple!!<BR>";break;case 4:o+=4,r+="Tetris!!!!!<BR>",i.b2b=!0}if("mini"==t&&e<2)e>0&&(o+=0,i.b2b=!0),r+="T-spin mini<BR>";else if("tspin"==t||"mini"==t){switch(e){case 1:o+=2,r+="T-spin single!<BR>";break;case 2:o+=3,r+="T-spin double!!!<BR>",env.b2bTSD&&(a=!0);break;case 3:o+=4,r+="T-spin triple!!!!!<BR>"}i.b2b=!0}}if(o>1&&settings.handicap&&(o=1),o>=1&&settings.myNameIsMeidy&&(o*=4,o>10&&(o=10)),i.linesSent+=o,env.b2bTSD){if(o=0,e>0&&!a)return void this.loss();a&&(i.stats.b2bTSD++,socket.emit("b2bTSD",i.stats.b2bTSD),o=3),r+="Total Back to Back Tspin Doubles: "+i.stats.b2bTSD+"<br>"}e>0&&game.recordLinesSent(o),r+="lines sent: "+o+"<br>";r+="total lines sent: "+i.linesSent;o=i.reduceGarbage(o),console.log(o),o>0&&socket.emit("linesSent",o),this.clearMessage(),this.writeMessage(r)}},{key:"losingGray",value:function(){for(var e=game.player,t=0;t<=21;t++)for(var i=0;i<=9;i++)0!=e.boardPosition[i][t]&&(e.boardPosition[i][t]=8);game.draw()}},{key:"clean",value:function(){var e=this.player;clearInterval(e.piece.interval)}},{key:"writeMessage",value:function(e){document.getElementById("line").innerHTML+=e;var t=this.modifiers,i="";t.increaseGravity&&(i+="Gravity Increased, "),t.randomColor&&(i+="Random Color, "),t.disableGhost&&(i+="Ghost Disabled, "),t.cheeseGarbage&&(i+="Cheese Garbage, "),t.oneGarbage&&(i+="One Solid Garbage Per Line, "),t.noHardDrop&&(i+="No Hard Drop, "),t.noHold&&(i+="No Hold, "),t.randomBag&&(i+="Random Pieces, "),document.getElementById("line").innerHTML+="<br> Modifiers: "+i}},{key:"clearMessage",value:function(){document.getElementById("line").innerHTML=""}},{key:"newBag",value:function(){if(this.modifiers.randomBag){if(this.modifiers.randomBag){t=this.bag.length;for(this.bag[t]=[];this.bag[t].length<7;){var e=this.random(1,7);this.bag[t].push(this.getPieceLetter(e))}this.bag[t]=this.bag[t].join(",")}}else{var t=this.bag.length;this.bag[t]=["S","Z","I","T","J","L","O"],this.shuffleBag(this.bag[t]),this.bag[t]=this.bag[t].join(",")}}},{key:"shuffleBag",value:function(e){for(var t,i,a=e.length;0!==a;)i=Math.floor(Math.random()*a),t=e[a-=1],e[a]=e[i],e[i]=t;return e}},{key:"getPieceNumber",value:function(e){switch(e){case"S":return 1;case"Z":return 2;case"I":return 3;case"T":return 4;case"J":return 5;case"L":return 6;case"O":return 7;default:console.log("no such piece available")}}},{key:"getPieceLetter",value:function(e){switch(e){case 1:return"S";case 2:return"Z";case 3:return"I";case 4:return"T";case 5:return"J";case 6:return"L";case 7:return"O";default:console.log("no such piece available")}}},{key:"getPieceRotation",value:function(e){switch(e){case"S":return["1,1|2,1|0,2|1,2","1,1|1,2|2,2|2,3","1,2|2,2|0,3|1,3","0,1|0,2|1,2|1,3"];case"Z":return["0,1|1,1|1,2|2,2","2,1|1,2|2,2|1,3","0,2|1,2|1,3|2,3","1,1|0,2|1,2|0,3"];case"I":return["0,1|1,1|2,1|3,1","2,0|2,1|2,2|2,3","0,2|1,2|2,2|3,2","1,0|1,1|1,2|1,3"];case"T":return["1,1|0,2|1,2|2,2","1,1|1,2|2,2|1,3","0,2|1,2|2,2|1,3","1,1|0,2|1,2|1,3"];case"J":return["0,1|0,2|1,2|2,2","1,1|2,1|1,2|1,3","0,2|1,2|2,2|2,3","1,1|1,2|0,3|1,3"];case"L":return["2,1|0,2|1,2|2,2","1,1|2,3|1,2|1,3","0,2|1,2|2,2|0,3","1,1|1,2|0,1|1,3"];case"O":return["1,1|1,2|2,1|2,2","1,1|1,2|2,1|2,2","1,1|1,2|2,1|2,2","1,1|1,2|2,1|2,2"];default:console.log("no such piece available")}}},{key:"shadeColor",value:function(e,t){var i=parseInt(e.slice(1),16),a=t<0?0:255,r=t<0?-1*t:t,o=i>>16,n=i>>8&255,s=255&i;return"#"+(16777216+65536*(Math.round((a-o)*r)+o)+256*(Math.round((a-n)*r)+n)+(Math.round((a-s)*r)+s)).toString(16).slice(1)}},{key:"getPieceColor",value:function(e){switch(e){case 1:return"#69BE28";case 2:return"#ED2939";case 3:return"#009FDA";case 4:return"#952D98";case 5:return"#0065BD";case 6:return"#FF7900";case 7:return"#FECB00";case 8:return"#696969"}}},{key:"draw",value:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){for(var e=this.player,t=[],i=e.currentPiece,a=e.currentBag,r=0;r<4;r++){var o=this.bag[a].split(",");t.push(o[i]),++i>=7&&(i=0,a++)}var n={id:this.id,ghost:{y:e.piece.ghost.y,color:e.piece.ghost.color},piece:{rotation:e.piece.rotations[e.piece.angle],x:e.piece.x,y:e.piece.y,color:e.piece.color},boardPosition:e.boardPosition,hold:e.currentHoldPiece,queue:t,incoming:e.getTotalIncoming()};socket.emit("update",n),draw.clearCanvas(draw.boardCanvas),draw.drawGrid(draw.boardCanvas,24);var s=n.piece.rotation.split("|");if(draw.clearCanvas(draw.boardCanvas),!this.modifiers.disableGhost)for(r=0;r<=3;r++){d=s[r].split(","),c=Number(d[0]),l=Number(d[1]),draw.makeBlock(1+24*n.piece.x,1+24*n.ghost.y,c,l,n.ghost.color,draw.boardCanvas,24)}s=n.piece.rotation.split("|");for(r=0;r<=3;r++){var c,l,d,h;d=s[r].split(","),c=Number(d[0]),l=Number(d[1]),h=draw.getPieceColor(n.piece.color),draw.makeBlock(1+24*n.piece.x,1+24*n.piece.y,c,l,h,draw.boardCanvas,24)}draw.drawBoard(draw.boardCanvas,n.boardPosition,24),draw.drawHold(n.hold),draw.drawQueue(n.queue),draw.drawIncoming(n.incoming)})},{key:"recordBoardPosition",value:function(){for(var e=this.player,t="",i=0;i<=21;i++)for(var a=0;a<=9;a++)e.boardPosition[a][i]>0&&(t+=e.boardPosition[a][i]),t+=".";t+=","+((new Date).getTime()-e.startTime)+"|",e.boardPositionRecord+=t}},{key:"recordLinesSent",value:function(e){var t=this.player,i="";i+=e.toString()+",",i+=(new Date).getTime()-t.startTime+"|",t.linesSentRecord+=i}},{key:"addGarbage",value:function(e){for(var t=this.player,i=this.random(0,9),a=0;a<=20;a++)for(var r=0;r<=9;r++)t.boardPosition[r][a]=t.boardPosition[r][a+e];for(a=0;a<e;a++)if(this.modifiers.cheeseGarbage&&(i=this.random(0,9)),settings.myNameIsMeidy&&(i=settings.random),this.modifiers.oneGarbage){for(r=0;r<=9;r++)t.boardPosition[r][21-a]=0;t.boardPosition[i][21-a]=8}else{for(var r=0;r<=9;r++)t.boardPosition[r][21-a]=8;t.boardPosition[i][21-a]=0}t.piece.update()}},{key:"applyGarbage",value:function(){var e=this.player;if(void 0!==e.incoming.length){var t=!0,i=!1,a=void 0;try{for(var r,o=e.incoming[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var n=r.value;game.addGarbage(n)}}catch(e){i=!0,a=e}finally{try{t||null==o.return||o.return()}finally{if(i)throw a}}e.incoming=[]}}},{key:"applyRandomModifier",value:function(){if(console.log("Applied Random Modifer"),1==this.modifiers.level)switch(this.random(1,8)){case 1:settings.gravity=100,this.modifiers.increaseGravity=!0;break;case 2:this.modifiers.randomColor=!0;break;case 3:this.modifiers.disableGhost=!0;break;case 4:this.modifiers.cheeseGarbage=!0;break;case 5:this.modifiers.oneGarbage=!0;break;case 6:this.modifiers.noHardDrop=!0;break;case 7:this.modifiers.noHold=!0;break;case 8:this.modifierse.randomBag=!0}if(2==this.modifiers.level)switch(this.random(1,1)){case 1:this.modifiers.randomBag=!0}if(3==this.modifiers.level)switch(this.random(1,1)){case 1:this.modifiers.noHardDrop=!0}if(4==this.modifiers.level)switch(this.random(1,1)){case 1:this.modifiers.oneGarbage=!0}}},{key:"random",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}},{key:"meidy",value:function(){settings.random=game.random(0,9)}}])&&l(t.prototype,i),a&&l(t,a),e}();i(4),i(5);function h(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.queueCanvas=document.getElementById("queueCanvas"),this.holdCanvas=document.getElementById("holdCanvas"),this.boardCanvas=document.getElementById("boardCanvas"),this.playerIncomingCanvas=document.getElementById("playerIncomingCanvas"),this.otherPlayerCanvas=[]}var t,a,r;return t=e,(a=[{key:"makeBlock",value:function(e,t,i,a,r,o,n){o!=draw.holdCanvas&&o!=draw.queueCanvas&&(a-=2);var s=o.getContext("2d");s.fillStyle=r,s.fillRect(e+i*n,t+a*n,n,n),s.beginPath(),s.rect(e+i*n,t+a*n,n,n),s.stroke(),s.globalAlpha=1}},{key:"drawS",value:function(e,t,i,a){var r="#69BE28";game.modifiers.randomColor&&(r="#ED2939"),this.makeBlock(e,t,2,1,r,i,a),this.makeBlock(e,t,1,1,r,i,a),this.makeBlock(e,t,1,2,r,i,a),this.makeBlock(e,t,0,2,r,i,a)}},{key:"drawZ",value:function(e,t,i,a){var r="#ED2939";game.modifiers.randomColor&&(r="#69BE28"),this.makeBlock(e,t,0,1,r,i,a),this.makeBlock(e,t,1,1,r,i,a),this.makeBlock(e,t,1,2,r,i,a),this.makeBlock(e,t,2,2,r,i,a)}},{key:"drawI",value:function(e,t,i,a){var r="#009FDA";game.modifiers.randomColor&&(r="#FECB00"),this.makeBlock(e,t,0,1,r,i,a),this.makeBlock(e,t,1,1,r,i,a),this.makeBlock(e,t,2,1,r,i,a),this.makeBlock(e,t,3,1,r,i,a)}},{key:"drawT",value:function(e,t,i,a){var r="#952D98";game.modifiers.randomColor&&(r="#009FDA"),this.makeBlock(e,t,1,1,r,i,a),this.makeBlock(e,t,0,2,r,i,a),this.makeBlock(e,t,1,2,r,i,a),this.makeBlock(e,t,2,2,r,i,a)}},{key:"drawJ",value:function(e,t,i,a){var r="#0065BD";game.modifiers.randomColor&&(r="#FF7900"),this.makeBlock(e,t,0,1,r,i,a),this.makeBlock(e,t,0,2,r,i,a),this.makeBlock(e,t,1,2,r,i,a),this.makeBlock(e,t,2,2,r,i,a)}},{key:"drawL",value:function(e,t,i,a){var r="#FF7900";game.modifiers.randomColor&&(r="#0065BD"),this.makeBlock(e,t,2,1,r,i,a),this.makeBlock(e,t,0,2,r,i,a),this.makeBlock(e,t,1,2,r,i,a),this.makeBlock(e,t,2,2,r,i,a)}},{key:"drawO",value:function(e,t,i,a){var r="#FECB00";game.modifiers.randomColor&&(r="#952D98"),this.makeBlock(e,t,1,1,r,i,a),this.makeBlock(e,t,1,2,r,i,a),this.makeBlock(e,t,2,1,r,i,a),this.makeBlock(e,t,2,2,r,i,a)}},{key:"clearCanvas",value:function(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}},{key:"drawIncoming",value:function(e){draw.clearCanvas(draw.playerIncomingCanvas);var t=draw.playerIncomingCanvas.getContext("2d");t.fillStyle="red",e>19?t.fillRect(0,1,4,draw.playerIncomingCanvas.height):t.fillRect(0,1+draw.playerIncomingCanvas.height-24*e,4,1+draw.playerIncomingCanvas.height-24*(20-e))}},{key:"drawGrid",value:function(e,t){this.blockWidth=t,e.width=10*this.blockWidth+2,e.height=20*this.blockWidth+2,this.context=e.getContext("2d");for(var i=1;i<=e.width;i+=this.blockWidth)this.context.moveTo(i,0),this.context.lineTo(i,e.height);for(var a=1;a<=e.height;a+=this.blockWidth)this.context.moveTo(0,a),this.context.lineTo(e.width,a);this.context.strokeStyle="black",this.context.stroke();var r=e.toDataURL();e.style.backgroundImage="url("+r+")"}},{key:"drawQueue",value:function(e){draw.clearCanvas(draw.queueCanvas,24);for(var t=0;t<=3;t++)switch(e[t]){case"S":draw.drawS(1,96*t+1,draw.queueCanvas,24);break;case"Z":draw.drawZ(1,96*t+1,draw.queueCanvas,24);break;case"I":draw.drawI(1,96*t+1,draw.queueCanvas,24);break;case"T":draw.drawT(1,96*t+1,draw.queueCanvas,24);break;case"J":draw.drawJ(1,96*t+1,draw.queueCanvas,24);break;case"L":draw.drawL(1,96*t+1,draw.queueCanvas,24);break;case"O":draw.drawO(1,96*t+1,draw.queueCanvas,24);break;default:console.log("no such piece available")}}},{key:"drawBoard",value:function(e,t,i){for(var a=2;a<=21;a++)for(var r=0;r<=9;r++)if(0!==t[r][a]){var o=draw.getPieceColor(t[r][a]);o=shadeColor(o,-.15),draw.makeBlock(1+r*i,1+a*i,0,0,o,e,i)}}},{key:"drawHold",value:function(e){switch(draw.clearCanvas(draw.holdCanvas,24),e){case"S":draw.drawS(1,1,draw.holdCanvas,24);break;case"Z":draw.drawZ(1,1,draw.holdCanvas,24);break;case"I":draw.drawI(1,1,draw.holdCanvas,24);break;case"T":draw.drawT(1,1,draw.holdCanvas,24);break;case"J":draw.drawJ(1,1,draw.holdCanvas,24);break;case"L":draw.drawL(1,1,draw.holdCanvas,24);break;case"O":draw.drawO(1,1,draw.holdCanvas,24);break;case"":break;default:console.log("no such piece available")}}},{key:"getPieceColor",value:function(e){return i(6)(e)}}])&&h(t.prototype,a),r&&h(t,r),e}();window.game=new d,window.draw=new u}]);