class Identity extends Phaser.Scene{
    constructor(){
        super({key : 'identity', active : false})
    }

    preload(){

    }

    create(){
        //TOUCHES
        //Pour que les touches ne soient detectees qu'une fois.
        this.escDisponible = false;
        this.qDisponible = false;

        //BACKGROUND
        let background = this.add.graphics();
        background.fillStyle(0xFBF2D3, 1);
        background.fillRect(0,0,1200,600);

        //CAMERA
        this.camPositionY = 0;
        this.camPositionX = 0;

        //TEST
        //SAUVEGARDE EN LOCALSTORAGE
        this.test = parseInt(localStorage.getItem('score')) || 0;
        //Pour sauvegarder la progression, sauvegarder le type de sphere et la position.
    }

    update(){
        //CAMERA
        //Bouger la camera
        if(this.input.keyboard.addKey("W").isDown){
            this.camPositionY += 5;
        }
        if(this.input.keyboard.addKey("S").isDown){
            this.camPositionY -= 5;
        }
        if(this.input.keyboard.addKey("A").isDown){
            this.camPositionX += 5;
        }
        if(this.input.keyboard.addKey("D").isDown){
            this.camPositionX -= 5;
        }
        this.cameras.main.setViewport(this.camPositionX, this.camPositionY, config.width, config.height);

        //MENU
        //Afficher le menu quand on appuie sur escape
        if(this.input.keyboard.addKey('ESC').isUp){
            //La touche ne declenche l'action que si on l'a relachee depuis le debut de la scene
            this.escDisponible = true;
        }
        if(this.input.keyboard.addKey('ESC').isDown && this.escDisponible){
            this.escDisponible = false;
            this.scene.start('menu');
        }

        //TEST
        //Ouvrir UI
        if(this.input.keyboard.addKey('Q').isUp){
            this.qDisponible = true;
        }
        if(this.input.keyboard.addKey('Q').isDown && this.qDisponible){
            //Mettre en pause la scene actuelle
            this.scene.pause();
            this.scene.launch('identityUI');
            this.qDisponible = false;
        }
        //SAUVEGARDE EN LOCALSTORAGE
        //Lien du tuto :
        //https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/
        if(this.input.keyboard.addKey('SPACE').isDown){
            this.test += 10;
            localStorage.setItem("score", this.test);
            console.log("Ton score est de "+parseInt(localStorage.getItem('score')));
        }    
    }
}

class IdentityUI extends Phaser.Scene{
    constructor(){
        super({key : 'identityUI', active : false})
    }

    preload(){

    }

    create(){
        //TOUCHES
        this.espaceDisponible = false;

        //BACKGROUND
        //Le filtre qui attire l'attention sur le menu d'objets
        this.filtre = this.add.graphics();
        this.filtre.fillStyle(0x000000, 0.5);
        this.filtre.fillRect(0,0,config.width,config.height);
        //L'UI qui sert a choisir l'objet d'xp a utiliser
        this.backgroundUI = this.add.graphics();
        this.backgroundUI.fillStyle(0x000000, 1);
        this.backgroundUI.fillRect(config.width-(config.width/5),0,config.width/5,config.height);
    }

    update(){
        //CAMERA
        //Pour que le menu apparaisse bien au bon endroit
        this.filtre.fillRect(Identity.camPositionX, Identity.camPositionY, config.width, config.height)

        if(this.input.keyboard.addKey('ESC').isUp){
            //La touche ne declenche l'action que si on l'a relachee depuis le debut de la scene
            this.escDisponible = true;
        }
        if(this.input.keyboard.addKey('ESC').isDown && this.escDisponible){
            this.escDisponible = false;
            this.scene.start('identity');
        }        
    }
}