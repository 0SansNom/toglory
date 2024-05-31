import { Engine, Scene, Vector3, HemisphericLight, ArcRotateCamera, Color4, Mesh } from "@babylonjs/core";
import { GameCanvas } from "./gameCanvas";
import InputController from "./controllers/InputController";
import AssetLoader from "./assetLoader";
import { Inspector } from "@babylonjs/inspector";

class AppLevel2 {
    private _canvas: GameCanvas;
    private _engine: Engine;
    private _scene: Scene;
    private _playerControls: InputController;
    private _road: AssetLoader;

    constructor() {
        this._canvas = new GameCanvas();
        this._engine = new Engine(this._canvas.canvas, true);
        this._scene = new Scene(this._engine);
        const camera = new ArcRotateCamera("camera", 2, 1.4, 160, new Vector3(15, 15, 15), this._scene);
        this._playerControls = new InputController(this._scene, camera);
         new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);
        // new HemisphericLight("light2", new Vector3(34, 1, 0), this._scene);
        new HemisphericLight("light3", new Vector3(31, 144, 40), this._scene);
        this._scene.clearColor = new Color4(0, 0, 0, 0);
        this._road = new AssetLoader(this._scene);
        this._road.loadGame2();  
        this._setupRenderLoop();
        Inspector.Show(this._scene, {});
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
        }, 60000);
    }

    private _stopGameAndShowScores(): void {
        this._engine.stopRenderLoop();
        const bikes = this._scene.meshes.filter(mesh => mesh.name.startsWith('bike'));
        const finish = this._scene.meshes.find(mesh => mesh.name === 'Text');

        
        
        if (finish) {
            bikes.sort((a, b) => a.position.subtract(finish.position).length() - b.position.subtract(finish.position).length());
            
            const scores = {
                winner: bikes[0].name,
                ranks: bikes.map(bike => ({ name: bike.name }))
            };
            
            localStorage.setItem('scores', JSON.stringify(scores));
            window.location.href = 'scores2.html';
        }
    }

    public stopGame(): void{
        const stop =    this._scene.getMeshByName("Text");
        this._scene.meshes.forEach(mesh => {
         if (mesh instanceof Mesh && mesh.name.startsWith("bike") && mesh !== this._scene.meshes[0]) {
             if(stop){
                 if(mesh.position.z <= stop.position.z)
                     this._stopGameAndShowScores()
    }}});
     }
}

new AppLevel2();
