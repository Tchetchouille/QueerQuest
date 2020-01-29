class Monde extends Phaser.Scene{
    constructor(){
        super({key : 'monde', active : true})
    }
    
    preload(){
        //SPRITES
        this.load.spritesheet('hero', 'assets/spriteTest.png', {
            frameWidth : 12,
            frameHeight : 16
        });
    }

    create(){
        //Pour eviter les aller-retour entre menu et monde, cf //MENU
        this.escDisponible = false;

        //BACKGROUND
        let background = this.add.graphics();
        background.fillStyle(0x2F4F4F, 1);
        background.fillRect(0,0,1200,600);

        //PHYSIQUE
        this.heros = this.physics.add.sprite(100, 100, 'hero', 12);
        
        //ANIMATIONS DEPLACEMENTS HEROS
        this.anims.create({
            key : 'down',
            repeat : 0,

            frames : this.anims.generateFrameNames('hero',{
                start : 0, end : 0
            })
        });
        this.anims.create({
            key : 'up',
            repeat : 0,

            frames : this.anims.generateFrameNames('hero',{
                start : 1, end : 1
            })
        });
        this.anims.create({
            key : 'left',
            repeat : 0,

            frames : this.anims.generateFrameNames('hero',{
                start : 2, end : 2
            })
        });
        this.anims.create({
            key : 'right',
            repeat : 0,

            frames : this.anims.generateFrameNames('hero',{
                start : 3, end : 3
            })
        });

        //TEST
        //Simulation d'ennemi
        this.ennemiTest = this.add.rectangle(50, 50, 20, 20, 0x000000);
    }

    update(){
        //VAR DEPLACEMENT
        //Visiblement phaser n'accepte de me donner que 2 durees a la fois...
        //Pas bien grave, ca reste parfaitement instinctif
        this.dureeBas = this.input.keyboard.addKey("S").getDuration();
        this.dureeHaut = this.input.keyboard.addKey("W").getDuration();
        this.dureeGauche = this.input.keyboard.addKey("A").getDuration();
        this.dureeDroite = this.input.keyboard.addKey("D").getDuration();

        //DEPLACEMENTS HEROS
        //Si ma duree est pressee apres la duree opposee ou que l'autre n'est pas pressee, go
        if(this.dureeGauche<this.dureeDroite && this.dureeGauche!=0 || (this.dureeGauche>this.dureeDroite && this.dureeDroite==0)){
            this.heros.setVelocityX(-100);
            this.heros.anims.play('left',true);
        }
        else if(this.dureeDroite<this.dureeGauche && this.dureeDroite!=0 || (this.dureeDroite>this.dureeGauche && this.dureeGauche==0)){
            this.heros.setVelocityX(100);
            this.heros.anims.play('right',true);
        }
        else{
            this.heros.setVelocityX(0);
        }
        if((this.dureeBas<this.dureeHaut && this.dureeBas!=0) || (this.dureeBas>this.dureeHaut && this.dureeHaut==0)){
            this.heros.setVelocityY(100);
            this.heros.anims.play('down',true);
        }
        else if(this.dureeHaut<this.dureeBas && this.dureeHaut!=0 || (this.dureeHaut>this.dureeBas && this.dureeBas==0)){
            this.heros.setVelocityY(-100);
            this.heros.anims.play('up',true);
        }
        else{
            this.heros.setVelocityY(0);
        }

        //MENU
        //Afficher le menu quand on appuie sur escape
        if(this.input.keyboard.addKey('ESC').isUp){
            //La touche ne declenche l'action que si on l'a relachee apres le debut de la scene
            this.escDisponible = true;
        }
        if(this.input.keyboard.addKey('ESC').isDown && this.escDisponible){
            this.escDisponible = false;
            this.scene.switch('menu');
        }
    
    //TEST
    //Detection par ennemi
    if((this.heros.x>this.ennemiTest.x-10 && this.heros.x<this.ennemiTest.x+10) && (this.heros.y>this.ennemiTest.y && this.heros.y<this.ennemiTest.y+100)){
        this.scene.start('combat');
    }
    }
}