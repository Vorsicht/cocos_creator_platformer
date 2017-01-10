var BenefitType = cc.Enum({
    NONE:-1,
    ACORN:1,
    HEALTH_POITION:30,
    
});

cc.Class({
    extends: cc.Component,

    properties: {
   
      benefitType:{
         default:BenefitType.NONE,
         type:BenefitType,
      },
        
      timeExistence:{
        default:0,
        displayName:"time existence(sec)",
       },
        
       timeExistenceMilliseconds:{
            default:0,
            visible:false,
       },
       
       currentAction:{
           default:null,
           visible:false,
       },
       
        collisionWithPlayer:{
            default:null,
            url:cc.AudioClip,
        },
       
      

    },
    
     
        
        
    // use this for initialization
    onLoad: function () {
        
        this.createdTime  = new Date().getTime();
        this.initAnimation();
        // console.log("  this.createdTime");
        // console.log(  this.createdTime);
            //convert to milliseconds
        this.timeExistenceMilliseconds =  (this.timeExistence * 1000); 
        // console.log(this.timeExistenceMilliseconds);
        // asdfdas
        
        this.disapearHalfMilliseconds = this.timeExistenceMilliseconds / 4;
   
            
        this.decreaseOpacityPerSecond  = 255 / ( this.disapearHalfMilliseconds / 1000); 
        this.timeToDisapearing  = this.createdTime +  ( this.timeExistenceMilliseconds  -  (this.disapearHalfMilliseconds));
        
      
       // nodeDynamicSprite.setSize(20,20);
    },

    onCollisionEnter: function (other, self) {
        this.playCollisionMusic();
        this.collisionDisapearing();

    },
   
    onCollisionStay: function (other) {

    },

    onCollisionExit: function (other, self) {
     
        
    },
    
    initAnimation:function(){
        
        switch(this.benefitType){
            case BenefitType.ACORN :
                this.rotating();
                break;
            case BenefitType.HEALTH_POITION:
                this.scaling();
                break;
        }
    },
    
    
    /**
     * enable rotating animation to current node
     * 
    */
    rotating:function(){
        
         let sequence = cc.sequence(cc.rotateTo(1, 10),cc.rotateTo(1, -10));  
         
        this.currentAction = this.node.runAction(cc.repeatForever(sequence));
    },

    /***
     * enable scaling animation to current node
     * 
    */

    scaling:function(){
        
        let sequence = cc.sequence(cc.scaleTo(1,0.8),cc.scaleTo(1,1));
        this.currentAction = this.node.runAction(cc.repeatForever(sequence));
    },


    /***
     * @return Integer Benefit value;
     * 
    */
    getBenefit:function(){
        return this.benefitType;
    },
    
    disapearing:function(dt){
        
            if( this.node.opacity > 0)    
                this.node.opacity  -= this.decreaseOpacityPerSecond * dt;
            else{
                this.node.opacity = 0;
                this.node.destroy();
            }    
      
    },
    
    collisionDisapearing:function(){
    
        this.node.destroy();
 
    },
    
    playCollisionMusic:function(){
        if(this.collisionWithPlayer === null) return;
        cc.audioEngine.playEffect(this.collisionWithPlayer,false);
    },
    
    
    /**
     * 
     * @param float dt
     *  
    */
    timingDisapear:function(dt){
        if(this.timeExistence > 0){
              let currentTime = new Date().getTime();
        
                if(currentTime > this.timeToDisapearing)
                    this.disapearing(dt);
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      this.timingDisapear(dt);
    },
});
