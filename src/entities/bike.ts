import { Scene, SceneLoader, Mesh, Vector3 } from "@babylonjs/core";
import { BikeController } from "../controllers/bikeController";

export default class Bike {
    private _scene: Scene;
    private _name: string
    private _fileName: string;
    private _position: Vector3;

    constructor(scene: Scene, name:string , fileName:string, position: Vector3  ) {
        this._name = name;
        this._fileName = fileName;
        this._position = position;
        this._scene = scene;
        this._loadBike();
    }

    private _loadBike(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SceneLoader.ImportMesh("", "./", this._fileName,  this._scene, (meshes) => {
                const player = meshes[0] as Mesh;
                const bike = new BikeController(player);
                bike.setPositionAndProperties({
                    position: this._position,
                    scaling: new Vector3(3, 5, 1.5),
                    rotation: new Vector3(0, 172.5, 0),
                    name: this._name
                });
                resolve();
            }, undefined, reject);
        });
    }

}
