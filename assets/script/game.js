// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Utils = require("common");

cc.Class({
    extends: cc.Component,

    properties: {
        readyLayer: {
            default: null,
            type: cc.Node
        },
        scoreNode: {
            default: null,
            type: cc.Node
        },
        numberAtlas:{
            default: null,
            type: cc.SpriteAtlas
        },
        bird:{
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._score = 0;
        this.gameStatus = Utils.GameStatus.READY;
        // this.schedule(function(){
        //     cc.log("----vvv");
            
        //     this.onGamePlaying(this._score++);
        // }.bind(this), 1);

    },

    createPips(){

    },

    onGameStart(event, customEventData) {
        var btnStart = event.target;
        var readyLayer = this.readyLayer;
        readyLayer.active = false;

        var GameStatus = Utils.GameStatus;

        
        if(this.gameStatus == GameStatus.READY) {
            var bird = this.bird.getComponent("bird");
            bird.fly();
            this.gameStatus = GameStatus.START;
            this.createPips();

            // this->delegator->onGameStart();
            // this->bird->fly();
            // this->gameStatus = GAME_STATUS_START;
            // this->createPips();
        }else if(this.gameStatus == GameStatus.START) {
            // this->bird->getPhysicsBody()->setVelocity(Vect(0, 260));
        }
    },

    onGameEnd(){

    },

    onGamePlaying(number){
        var scoreContainer = this.scoreNode;
        scoreContainer.removeAllChildren();
        if(number == 0){
            var scoreNode= new cc.Node('Sprite');
            var sp = scoreNode.addComponent(cc.Sprite);
            scoreNode.parent = scoreContainer;
            var frame = this.numberAtlas.getSpriteFrame(Utils.sprintf("number_score_%02d", number));
            sp.spriteFrame = frame;
        }

        var totalWidth = 0;
        var numCount = 0;
        while(number){
            numCount++;
            var temp = number % 10;
            number /= 10;
            number = parseInt(number);
            var scoreNode= new cc.Node('Sprite');
            var sp = scoreNode.addComponent(cc.Sprite);
            scoreNode.parent = scoreContainer;
            var frame = this.numberAtlas.getSpriteFrame(Utils.sprintf("number_score_%02d", temp));
            sp.spriteFrame = frame;
            totalWidth += scoreNode.width;
            scoreNode.x -= (numCount - 1) * scoreNode.width;
        }
        // scoreContainer.width = totalWidth;

    },

    start () {

    },

    update (dt) {
        if (this.gameStatus == Utils.GameStatus.START) {
            // this.rotateBird();
            // this.checkHit();
        }

    },
});
