// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.schedule(this.scrollLand, 0.01);
    },

    callback: function (event, customEventData) {
        var btnStart = event.target;
        cc.director.loadScene("Game");
    },

    scrollLand:function(dt){
        var land1 = this.node.getChildByName("land1");
        var land2 = this.node.getChildByName("land2");
        var bg = this.node.getChildByName("bg");

        var halfBgW = bg.width/2;
        land1.x = land1.x - 2.0;
        land2.x = land1.x + land1.getContentSize().width - 2.0;
        if(land1.x < -(halfBgW + land1.getContentSize().width)){
            land1.x = -halfBgW;
        }
    },

    start () {

    },

    // update (dt) {},
});
