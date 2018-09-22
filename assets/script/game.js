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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._score = 0;
        this.schedule(function(){
            cc.log("----vvv");
            
            this.onGamePlaying(this._score++);
        }.bind(this), 1);

    },

    onGamePlaying: function(number){
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

    onGameStart: function (event, customEventData) {
        var btnStart = event.target;
        var readyLayer = this.readyLayer;
        readyLayer.active = false;
    },

    start () {

    },

    update (dt) {


    },
});
