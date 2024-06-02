import { Vector3 } from "@babylonjs/core";
import AssetLoader from "./assetLoader";
import Level from "./level";

class Level3 extends Level {
    constructor(cameraPosition: Vector3) {
        super(cameraPosition);
        this._road = new AssetLoader(this._scene); 
        this._loadMusic("music3.mp3");
        this._road.loadGame3();
    }
}

const cameraPositionLevel3 = new Vector3(15, 15, 15);
 new Level3(cameraPositionLevel3)