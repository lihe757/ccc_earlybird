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
        land1: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
        },
        land2: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
        },
        bgWidth: {
            // ATTRIBUTES:
            default: 0,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Integer, // optional, default is typeof default
        },
        
        pip1: {
            default: null,
            type: cc.Node
        },
        pip2: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        var land1 = this.land1;
        var land2 = this.land2;
        var bg = this.bg;

        var halfBgW = this.bgWidth/2;
        land1.x = land1.x - 2.0;
        land2.x = land1.x + land1.getContentSize().width - 2.0;
        if(land1.x < -(halfBgW + land1.getContentSize().width)){
            land1.x = -halfBgW;
        }

        var pip1 = this.pip1;
        var pip2 = this.pip2;
        var pips = [pip1, pip2];
        if(pip1 && pip2){
            for(var i = 0; i < pips.length; i++){
                var p = pips[i];
                p.x = p.x - 2;
                if(p.x < -170){
                    p.x = 170;
                    p.y = this.getRandomHeight();
                }
        //         singlePip->setPositionX(singlePip->getPositionX() - 2);
        // if(singlePip->getPositionX() < -PIP_WIDTH) {
        //     singlePip->setTag(PIP_NEW);
        //     Size visibleSize = Director::getInstance()->getVisibleSize();
        //     singlePip->setPositionX(visibleSize.width);
        //     singlePip->setPositionY(this->getRandomHeight());
        // }
            }
        }
    },

    getRandomHeight(){
        var h = Math.random() * 320 %(2*320 + 100 - 512);
        return h;
    }
});
