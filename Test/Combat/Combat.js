class Combat extends Phaser.Scene{
    constructor(){
        super({key : 'combat', active : false})
    }

    preload(){

    }

    create(){
        //BACKGROUND
        this.background = this.add.graphics();
        this.background.fillStyle(0x000000, 1);
        this.background.fillRect(0,0,config.width,config.height);

        //HEROS
        //Il faudra les remplacer par les images
        this.Sam = this.add.rectangle(config.width/5, config.height, 200, 400, 0x8B7D7B);
        this.Horgred = this.add.rectangle(config.width/5*2, config.height, 200, 400, 0x8B7D7B);
        this.Mireille = this.add.rectangle(config.width/5*3, config.height, 200, 400, 0x8B7D7B);
        this.Alex = this.add.rectangle(config.width/5*4, config.height, 200, 400, 0x8B7D7B);

        //TEST
        //generation d'un nombre aleatoire d'ennemis
        this.nombreEnnemis = Math.floor(Math.random()*3)+1;
        this.ennemis = [];
        this.spheres = [];
        //Systeme de combat
        //Une cartographie des cases
        this.cases = [
            [
                [],[],[],[],[]
            ],[
                [],[],[],[],[]
            ],[
                [],[],[],[],[]
            ],[
                [],[],[],[],[]
            ],[
                [],[],[],[],[]
            ]
        ];
        //La taille des cases
        this.case = 25;
        //On cree un espace de combat pour chaque ennemi, et une sphere qui represente lea joueur.euse a l'interieur
        for(let i=0; i<this.nombreEnnemis; i++){
            this.ennemis[i] = this.add.rectangle(config.width/(this.nombreEnnemis+1)*(i+1), config.height/3, 125, 125, 0x8B7D7B);
            this.spheres[i] = this.add.circle(0, 0, 15, 0xFFFFFF);
            for(let j=0; j<4; j++){
                for(let k=0; k<4; k++){
                    this.cases[i][j][k] = "nouveau";
                }
            }
            this.cases[i][2][2] = "sphere";
        }


    }

    update(){
        //TEST
        //Espace de combat
        //J'utilise for plutot que forEach car impossible d'utiliser this dans forEach
        //Attribution de valeurs aux cases
        for(let i=0;i<this.nombreEnnemis;i++){
            for(let j=0;j<4;j++){
                for(let k=0;k<4;k++){
                    if(this.cases[i][j][k]=="nouveau"){
                        //Il faudra que j'augmente la limite de cases car celles qui ne sont pas affichees doivent quand-meme etre memorisees
                    }
                    }
                }
            }
        //Deplacement et creation des objets de maniere a ce que les valeurs des cases soient exprimees en jeu
        for(let i=0;i<this.nombreEnnemis;i++){
            for(let j=0;j<4;j++){
                for(let k=0;k<4;k++){
                    if(this.cases[i][j][k]=="sphere"){
                        this.spheres[i].x = config.width/(this.nombreEnnemis+1)*(i+1);
                        this.spheres[i].y = config.height/3;
                    }
                }
            }
        }
    }
}
