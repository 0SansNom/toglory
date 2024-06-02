import { Vector3 } from "@babylonjs/core";
import AssetLoader from "./assetLoader";
import Level from "./level";

class Level2 extends Level {
    constructor(cameraPosition: Vector3) {
        super(cameraPosition);
        this._road = new AssetLoader(this._scene); 
        this._loadMusic("music2.mp3");
        this._road.loadGame2();
    }
    protected _stopGameAndShowScores(): void {
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
}

const cameraPositionLevel2 = new Vector3(15, 15, 15);
 new Level2(cameraPositionLevel2)