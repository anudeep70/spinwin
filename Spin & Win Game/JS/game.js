//Hello World of Phaser = Basic Game = Single Scene in Spin & Win Game
// How to create the basic skeleton for the game -> Game Loop

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}
let hsv;
let i=0;

let badge1;
let poison1;
let config = {
    type:Phaser.AUTO,
    
    scale:{
        mode:Phaser.Scale.FIT,
        width : 800,
        height :600,
    },
    backgroundColor : 0xffcc00,
      physics:{
        default:'arcade',
        arcade :{
            gravity:{
               y:1000,
            },
            debug:false,
        },
        audio: {
        disableWebAudio: true
    }
    },
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
   
};
let game = new Phaser.Game(config);
let player_config = {
    player_speed : 150,
    player_jumpspeed : -700,
}

function preload(){
    console.log("Preload");
    //load object, load some images
    this.load.image('background','../Assets/newback.png');
    console.log(this);
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    this.load.spritesheet("dude","../Assets/dude2.png",{frameWidth:37,frameHeight:45});
    this.load.spritesheet("poison","../Assets/poison.png",{frameWidth:32,frameHeight:32});
    this.load.spritesheet("star","../Assets/star.png",{frameWidth:32,frameHeight:32});
    this.load.audio('sound1','../Assets/sounds.mp3');
//    game.load.spritesheet('badge', '../Assets/badge.png', 42, 54,18);
this.load.spritesheet('badge', 
        '../Assets/badge.png',
        { frameWidth: 42, frameHeight: 54 });
 
  this.load.audio('sfx', [
        '../Assets/SoundEffects/fx_mixdown.ogg',
        '../Assets/SoundEffects/fx_mixdown.mp3'
    ], {
        instances: 4
    });
  this.load.audio('sfx1', [
        '../Assets/SoundEffects/magical_horror_audiosprite.ogg',
        '../Assets/SoundEffects/magical_horror_audiosprite.mp3'
    ]);
}
function create(){
     hsv = Phaser.Display.Color.HSVColorWheel();

    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;


    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.76);
    
     //lets create the stand
    let stand = this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    //lets create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    pin.depth = 1;
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25); 
    //this.wheel.alpha = 0.5;
     this.soundd=this.sound.add('sound1');
     this.anims.create({ key: 'everything', frames: this.anims.generateFrameNames('poison'),frameRate : 10, repeat: -1 });
    poison1=this.add.sprite(150,500,'poison',100).play("everything");
    poison1.alpha=0;
    this.anims.create({ key: 'everything1', frames: this.anims.generateFrameNames('badge'),frameRate : 10, repeat: -1 });
    badge1=this.add.sprite(150,500,'badge',100).play("everything1");
    this.anims.create({ key: 'everything2', frames: this.anims.generateFrameNames('star'),frameRate : 10, repeat: -1 });
    star1=this.add.sprite(100,100,'star',100).play("everything2");
    this.add.sprite(700,100,'star',100).play("everything2");
    this.add.sprite(15,29,'star',100).play("everything2");
    //event listener for mouse click
    // this.input.on("pointerdown",spinwheel,this);
    
    //lets create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "white",
    }
    font_style1 = {
        font : "bold 17px Arial",
        align : "center",
        color : "white",
    }
    this.game_text = this.add.text(22,10,"Welcome to Spin & Win",font_style);
    this.game_text.setStroke('#00f', 10);
    this.game_text.setShadow(2, 2, "#333333", 2, true, true);
    this.game_text1 = this.add.text(115,445,"catch me",font_style1);
    this.game_text1.setStroke('#00f', 5);
    this.game_text1.setShadow(2, 2, "#333333", 2, true, true);
    //dude
    this.player = this.physics.add.sprite(100,100,'dude',4);
    console.log(this.player);
    //set the bounce values
    this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);
    //player animations and player movements

    this.anims.create({
        key : 'left',
        frames: this.anims.generateFrameNumbers('dude',{start:0,end:3}),
        frameRate : 10,
        repeat : -1
    });
    this.anims.create({
        key : 'center',
        frames: [{key:'dude',frame:4}],
        frameRate : 10,
    });
    this.anims.create({
        key : 'right',
        frames: this.anims.generateFrameNumbers('dude',{start:5,end:8}),
        frameRate : 10,
        repeat : -1
    });


    // keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
  badge2 = this.physics.add.staticGroup({
        key: "badge",
        visible:false,
        frames: this.anims.generateFrameNames('badge'),frameRate : 10, repeat: -1,
        setXY : {x:150,y:500},
    });
this.physics.add.overlap(this.player,badge2,eatBadge,null,this);
    // //create cameras
    // this.cameras.main.setBounds(0,0,W,H);
    // this.physics.world.setBounds(0,0,W,H);

    // this.cameras.main.startFollow(this.player,true,true);
    // this.cameras.main.setZoom(1.5);
}

//Game Loop
function update(){
    console.log("Inside Update");

  
    //this.wheel.angle += 1;
      if(this.cursors.left.isDown){
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left',true);
    }
    else if(this.cursors.right.isDown){
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('right',true);
    }
    else{
        this.player.setVelocityX(0);
        this.player.anims.play('center');
    }

    //add jumping ability , stop the player when in air
    if(this.cursors.up.isDown){
        this.player.setVelocityY(player_config.player_jumpspeed);
    }

}



function spinwheel(){
    
    console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse!");
    
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won something " + prizes_config.prize_names[idx]);
        },
    });
    
}



function eatBadge(player,badge){
     this.sound.play('sfx',{ name: 'ping', start: 10, duration: 1.0, config: {} });

    badge.body.enable=false;
    
    badge1.alpha = 0;
     poison1.alpha=1;
     this.game_text1.setText("spinning");
     console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse!");
    
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
     this.sound.play('sound1');
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope:this,
        onComplete:function(){
            this.sound.play('sfx1', { name: 'charm', start: 0, duration: 2.7, config: {} });
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
            this.game_text1.setText("catch me");
            badge.body.enable=true;
             
              poison1.alpha=0;
              badge1.alpha = 1;

        },
    });

}


