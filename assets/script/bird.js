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

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
    },

    init (gameCtrl) {
        this.gameCtrl = gameCtrl;
    },
    

    onBeginContact(contact, self, other) {
        cc.log("--->碰到水管");
        this.gameCtrl.onGameOver();
    },

    fly(){
        var pbody = this.getComponent(cc.RigidBody);
        pbody.gravityScale = 1;
    },

    idle(){
        var pbody = this.getComponent(cc.RigidBody);
        pbody.gravityScale = 0;
    },

    die(){
        this.anim.stop();
        // this.node.rotation = -90;
    }

    // update (dt) {},
});
