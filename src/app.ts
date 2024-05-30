import { Engine, Mesh, Scene, Sound, Vector3 } from "@babylonjs/core";
import { ArcRotateCamera, HemisphericLight, SceneLoader } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import { GameCanvas } from "./gameCanvas";
import  InputController  from "./controllers/InputController";
import AssetLoader from "./assetLoader";


export class App {
    private _canvas: GameCanvas;
    private _engine: Engine;
    private _scene: Scene;
    private _playerControls: InputController;
    private _road: AssetLoader;

    constructor() {
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            loadingScreen.style.display = "flex";
        }
        this._canvas = new GameCanvas();
        this._engine = new Engine(this._canvas.canvas, true);
        this._scene = new Scene(this._engine);
        const camera = new ArcRotateCamera("camera", 1.36, 1.49, 150.2, new Vector3(0, 15, 15), this._scene);
        this._playerControls = new InputController(this._scene, camera);
        new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);
        new HemisphericLight("light1", new Vector3(1, 1, 6), this._scene);

        new HemisphericLight("light1", new Vector3(2, 1, 4), this._scene);

        new HemisphericLight("light1", new Vector3(5, 2, 0), this._scene);

        this._road = new AssetLoader(this._scene);
        new Sound("main sound", "./music1.mp3", this._scene, null, { loop: true, autoplay: false});
        this._loadResources().then(() => {
            if (loadingScreen) {
                loadingScreen.style.display = "none";
            }
           this._setupRenderLoop();
        });
      //  this._setupRenderLoop();
        Inspector.Show(this._scene, {});
    }

    private async _loadResources(): Promise<void> {
        await this._road.loadGame1();
    }
    private _setupRenderLoop(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
            this.stopGame();
            this._playerControls.update();
        });

    
        window.addEventListener("resize", () => {
            this._engine.resize();
        });

         // Stop game and display scores after 1 minutes
         setTimeout(() => {
            this._stopGameAndShowScores();
        }, 600000);
    }

    private async _loadSecondLevel(): Promise<void> {
        // Charger le deuxième niveau du jeu
        await this._road.loadGame2();
    }


    public stopGame(): void{
        const stop =    this._scene.getMeshByName("Text");
        this._scene.meshes.forEach(mesh => {
         if (mesh instanceof Mesh && mesh.name.startsWith("bike_en") && mesh !== this._scene.meshes[0]) {
             if(stop){
                 if(mesh.position.z <= stop.position.z)
                     this._stopGameAndShowScores()
    }}});
     }
    


    private _stopGameAndShowScores(): void {
        this._engine.stopRenderLoop();
        const bikes = this._scene.meshes.filter(mesh => mesh.name.startsWith('bike'));
        const object10 = this._scene.meshes.find(mesh => mesh.name === 'Text');

        
        
        if (object10) {
            bikes.sort((a, b) => a.position.subtract(object10.position).length() - b.position.subtract(object10.position).length());
            
            const scores = {
                winner: bikes[0].name,
                ranks: bikes.map(bike => ({ name: bike.name }))
            };
            
            localStorage.setItem('scores', JSON.stringify(scores));
            window.location.href = 'scores.html';
        }
    }
}

//new App();
