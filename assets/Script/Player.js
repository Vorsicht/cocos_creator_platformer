var Animation = cc.Enum({
    
    MOVE :"move",
    JUMP:"jump",
    STAY:"stay",
  
});

const jumpRate = 0.017;
const gravity = 1000;

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        step:10,
        jumpSpeed:10000,
        
        currentAction:{
            default:null,
            visible:false,
        },
        
        left:{
            default:false,
            visible:false,
        },
        right:{
            default:false,
            visible:false,
        },
        jump:{
            default:false,
            visible:false,
        },
        animation:{
            default:null,
            visible:false,
        },
        currentGround:{
            default:null,
            visible:false,
        }
        
        
        
        
    },

    // use this for initialization
    onLoad: function () {
        this.animation  = this.node.getComponent(cc.Animation);
        this.onAnimCompleted(1);
        this.currentGround = this.node.y;
      this.currentSpeed =this.jumpSpeed;
       // console.log(cc.director.setAnimationInterval(1/60));
      
      
    },
        
    onAnimCompleted: function (num) {
              this.playAnimation(Animation.STAY);
        
      
    },
   
   
   
    moveLeft:function(){
        this.playAnimation(Animation.MOVE);
        this.left = true;
        this.node.scaleX = 1;
         this.node.x -=this.step; 
        
    },

    moveRight:function(){
      this.playAnimation(Animation.MOVE);
        this.right = true;
        this.node.scaleX = -1;
        this.node.x +=this.step;
    },

   
    
    stopMoveAction:function(){
        this.right = false;
        this.left = false;
        this.animation.stop(Animation.MOVE);
        this.onAnimCompleted(1);
    },
    
    
    jumpAction:function(){
        this.jump = true;
        this.playAnimation(Animation.JUMP);
        // coming soon....
        
              if(this.node.y < this.currentGround){
                  this.node.y = this.currentGround;
                  this.currentSpeed = this.jumpSpeed;
                  this.jump = false;
              }else{
      
                    console.log(jumpRate * gravity);
                        this.currentSpeed  -=  jumpRate * this.jumpSpeed;
                        
                        console.log("current speed");
                        console.log(this.currentSpeed);
                    
                      
                        this.node.y += jumpRate *  this.currentSpeed; 
                        
                     
                       // this.lastJumpShift =    Math.abs(jumpRate * this.currentSpeed);
                       
              }
        
        
        
    },
    
    atack:function(){
         this.playAnimation(Animation.ATACK);
         
    },
    

   playAnimation:function(animation){
 
               let animationState = this.animation.getAnimationState(animation);
               if(animationState !== null){
                    if(!animationState.isPlaying)
                            this.animation.play(animation);
               }
        
    },


    
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //console.log(cc.director.getAnimationInterval());
        if(this.right)
            this.moveRight();
        else if(this.left)
            this.moveLeft();
        if(this.jump)
            this.jumpAction();
            
            
        
            
    },
});
