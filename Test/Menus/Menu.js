class Menu extends Phaser.Scene{
    constructor(){
        super({key : 'menu', active : false})
    }

    preload(){

    }

    create(){
        //Pour eviter les enchainements quand on appuie sur une touche
        this.escDisponible = false;
        this.spaceDisponible = false;
        this.upDisponible = false;
        this.downDisponible = false;
        this.leftDisponible = false;
        this.rightDisponible = false;

        //BACKGROUND
        this.background = this.add.graphics();
        this.background.fillStyle(0x000000, 1);
        this.background.fillRect(0,0,config.width,config.height);

        //GENDERBREAD
        //SELECTION
        //Cercles qui indiquent les choix disponibles sur le genderbread
        this.circleIdentity = this.add.circle(config.width/5*2, config.height/5, 20, 0x000000);
        this.circleIdentity.setStrokeStyle(5, 0xFFFFFF);
        this.circleExpression = this.add.circle(config.width/5, config.height/5*2, 20, 0x000000);
        this.circleExpression.setStrokeStyle(5, 0xFFFFFF);
        this.circleAttraction = this.add.circle(config.width/5*2+10, config.height/5*2, 20, 0x000000);
        this.circleAttraction.setStrokeStyle(5, 0xFFFFFF);
        this.circleSex = this.add.circle(config.width/5*2, config.height/5*3, 20, 0x000000);
        this.circleSex.setStrokeStyle(5, 0xFFFFFF);
        //Pour savoir ce que pointe le pointeur
        this.position = "Identity";
        //Textes
        this.textIdentity = this.add.text(this.circleIdentity.x+25, this.circleIdentity.y, '')
        this.textExpression  = this.add.text(this.circleExpression.x+25, this.circleExpression.y, '');
        this.textAttraction = this.add.text(this.circleAttraction.x+25, this.circleAttraction.y, '');
        this.textSex = this.add.text(this.circleSex.x+25, this.circleSex.y, '');
    }

    update(){
        //CHANGER DE SCENE
        //REVENIR AU MONDE
        if(this.input.keyboard.addKey('ESC').isUp){
            this.escDisponible = true;
        }
        if(this.input.keyboard.addKey('ESC').isDown && this.escDisponible){
            this.escDisponible = false;
            this.scene.switch('monde');
        }
        //ACCEDER AUX SOUS-MENUS
        if(this.input.keyboard.addKey('SPACE').isUp){
            this.spaceDisponible = true;
        }
        if(this.input.keyboard.addKey('SPACE').isDown && this.spaceDisponible){
            this.spaceDisponible = false;
            //En fonction de la position du pointeur, on accede au sous-menu selectionne.
            //Ici j'utilise start plutôt que switch pour eviter le probleme de la "frame bloquee" (qui cause p.e. le glissement du perso)
            switch(this.position){
                case 'Identity':
                    this.scene.start('identity');
                    break;
                case 'Expression':
                    this.scene.start('expression');
                    break;
                case 'Attraction':
                    this.scene.start('attraction');
                    break;
                case 'Sex':
                    this.scene.start('sex');
                    break;
            }
        } 

        //GENDERBREAD
        //SELECTION
        //Basee sur la poisition du pointeur
        //Pourra probablement être rendu plus concis par la suite. Typiquement on pourrait utiliser un switch
        if(this.position=="Identity"){
            this.textIdentity.setText("Identity");
            if(this.input.keyboard.addKey('A').isDown){
                if(this.leftDisponible){
                    this.position = "Expression";
                    this.leftDisponible = false;
                }
            }
            else{
                this.leftDisponible = true;
            }
            if(this.input.keyboard.addKey('D').isDown){
                if(this.rightDisponible){
                    this.position = "Attraction";
                    this.rightDisponible = false;
                }
            }
            else{
                this.rightDisponible = true;
            }
            if(this.input.keyboard.addKey('S').isDown){
                if(this.downDisponible){
                    this.position = "Attraction";
                    this.downDisponible = false;
                }
            }
            else{
                this.downDisponible = true;
            }
        }
        else{
            this.textIdentity.setText(" ");
        }
        if(this.position=="Expression"){
            this.textExpression.setText("Expression");
            if(this.input.keyboard.addKey('D').isDown){
                if(this.rightDisponible){
                    this.position = "Attraction";
                    this.rightDisponible = false;
                }
            }
            else{
                this.rightDisponible = true;
            }
            if(this.input.keyboard.addKey('S').isDown){
                if(this.downDisponible){
                    this.position = "Sex";
                    this.downDisponible = false;
                }
            }
            else{
                this.downDisponible = true;
            }
            if(this.input.keyboard.addKey('W').isDown){
                if(this.upDisponible){
                    this.position = "Identity";
                    this.upDisponible = false;
                }
            }
            else{
                this.upDisponible = true;
            }
        }
        else{
            this.textExpression.setText(" ");
        }
        if(this.position=="Attraction"){
            this.textAttraction.setText("Attraction");
            if(this.input.keyboard.addKey('A').isDown){
                if(this.leftDisponible){
                    this.position = "Expression";
                    this.leftDisponible = false;
                }
            }
            else{
                this.leftDisponible = true;
            }
            if(this.input.keyboard.addKey('S').isDown){
                if(this.downDisponible){
                    this.position = "Sex";
                    this.downDisponible = false;
                }
            }
            else{
                this.downDisponible = true;
            }
            if(this.input.keyboard.addKey('W').isDown){
                if(this.upDisponible){
                    this.position = "Identity";
                    this.upDisponible = false;
                }
            }
            else{
                this.upDisponible = true;
            }
        }
        else{
            this.textAttraction.setText(" ");
        }
        if(this.position=="Sex"){
            this.textSex.setText("Sex");
            if(this.input.keyboard.addKey('A').isDown){
                if(this.leftDisponible){
                    this.position = "Expression";
                    this.leftDisponible = false;
                }
            }
            else{
                this.leftDisponible = true;
            }
            if(this.input.keyboard.addKey('D').isDown){
                if(this.rightDisponible){
                    this.position = "Attraction";
                    this.rightDisponible = false;
                }
            }
            else{
                this.rightDisponible = true;
            }
            if(this.input.keyboard.addKey('W').isDown){
                if(this.upDisponible){
                    this.position = "Attraction";
                    this.upDisponible = false;
                }
            }
            else{
                this.upDisponible = true;
            }
        }
        else{
            this.textSex.setText(" ");
        }
    }
}
