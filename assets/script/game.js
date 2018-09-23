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
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;

        this.gameStatus = Utils.GameStatus.READY;

        //设置控制器
        this.bird.getComponent("bird").init(this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(){
            cc.log("----vvv");
            var GameStatus = Utils.GameStatus;
            if(this.gameStatus == GameStatus.READY) {
                this.onGameStart();
            }
            if(this.gameStatus == GameStatus.START){
                this.bird.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 200);
            }
        }.bind(this), this);
    },

    createPips(){
        var landScroll = this.node.getComponent("landscroll");
        landScroll.onGameStart();
    },

    onGameStart() {
        var readyLayer = this.readyLayer;
        readyLayer.active = false;

        var GameStatus = Utils.GameStatus;
        if(this.gameStatus == GameStatus.READY) {
            var bird = this.bird.getComponent("bird");
            bird.fly();
            this.gameStatus = GameStatus.START;
            
            var landScroll = this.node.getComponent("landscroll");
            landScroll.onGameStart();

            // this->delegator->onGameStart();
            // this->bird->fly();
            // this->gameStatus = GAME_STATUS_START;
            // this->createPips();
        }else if(this.gameStatus == GameStatus.START) {
            // this->bird->getPhysicsBody()->setVelocity(Vect(0, 260));
        }
    },

    onGameEnd(){
        cc.log("--->game over");
    },

    onGamePlaying(number){
        this.scoreNode.getComponent(cc.Label).string = "" + number;
    },

    start () {

    },

    rotateBird(){
        var bird = this.bird;
        var verticalSpeed = bird.getComponent(cc.RigidBody).linearVelocity.y;
        bird.setRotation(Math.min(Math.max(-90, (verticalSpeed*0.2 + 60)), 30));
    },

    checkHit(){
        var landScroll = this.node.getComponent("landscroll");
        var pips = [landScroll.pip1, landScroll.pip2];
        for(var i = 0; i < pips.length; i++){
            var pip = pips[i];
            var pcom = pip.getComponent("pip");
            if (pcom.passType == 0) {
                if (pip.x < this.bird.x) {
                    this._score++;
                    this.onGamePlaying(this._score);
                    pcom.passType = 1;
                }
            }
        }
    },

    update (dt) {
        if (this.gameStatus == Utils.GameStatus.START) {
            this.rotateBird();
            this.checkHit();
        }

    },
});
