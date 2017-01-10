cc.Class({
    extends: cc.Component,

    properties: {
        leftActionButton :cc.Node,
        rightActionButton:cc.Node,
        jumpActionButton:cc.Node,
        playerNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        let player  = this.playerNode.getComponent('Player');
        
        
        this.leftActionButton.on(cc.Node.EventType.TOUCH_START,function(){
            player.moveLeft();
       //    console.log("MOVE LEFT");
        },this.leftActionButton);
        
        
        this.rightActionButton.on(cc.Node.EventType.TOUCH_START,function(){
         //   console.log("MOVE RIGHT");
            player.moveRight();
        },this.rightActionButton);
        
        this.leftActionButton.on(cc.Node.EventType.TOUCH_END,function(){
          
           player.stopMoveAction()
           
       }, this.leftActionButton);
       
       
       this.rightActionButton.on(cc.Node.EventType.TOUCH_END,function(){
           player.stopMoveAction()
          
       }, this.rightActionButton);

      this.jumpActionButton.on(cc.Node.EventType.TOUCH_START,function(){
         
           player.jumpAction()
      },this.jumpActionButton);  
        
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
