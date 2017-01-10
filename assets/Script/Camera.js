cc.Class({
    extends: cc.Component,

    properties: {
        

        player:{
            default:null,
            type:cc.Node,
        },
        map:{
            default:null,
            type:cc.Node,
        }
    
    },

    // use this for initialization
    onLoad: function () {
        console.log("NODE");
            console.log(this.node);
        
      let mapWidth = this.map.getComponent(cc.TiledMap).node.width;
        let rect = cc.rect(0,0,mapWidth,this.node.height);      
            console.log('REC');
            console.log(rect);
      let follow = cc.follow(this.player,rect);
      let gameFollow = cc.follow(this.node);
      this.node.runAction(follow);
      
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
 
    // },
});
