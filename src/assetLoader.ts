import { Scene, SceneLoader, Mesh, Vector3, MeshBuilder } from "@babylonjs/core";
import Bike from "./entities/bike";

export default class AssetLoader {
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    public async loadGame1(): Promise<void> {
        await this._loadRoad();
        await this._loadBike();
        await this._duplicateBike("jo.glb", "bike_enemy", 5);
    }
    
    public async loadGame2(): Promise<void> {
        await this._loadRoad();
       //await this._loadRoad2();
        await this._loadBike();
        await this._duplicateBike("jo.glb", "bike_enemy", 4);
        await this._loadObstacles();
    }

    private _loadObstacles(): void {
        for (let i = 0; i < 5; i++) {
            const sphere = MeshBuilder.CreateSphere(`obstacle_${i}`, { diameter: 5 }, this._scene);
            sphere.position = new Vector3(
                (Math.random() - 0.5) * 130,
                1,
                (Math.random() - 0.5) * 100
            );
        }
    }

    private _loadRoad(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SceneLoader.ImportMesh("", "./", "glory.glb", this._scene, (meshes) => {
                const roadMesh = meshes[0] as Mesh;
                roadMesh.position = new Vector3(30, 0, 0);
                
                roadMesh.name = "Road";
                const plane = this._scene.getMeshByName("Plane.001");
                const sideWalk  = this._scene.getMeshByName("Plane")
                if (plane) {
                    plane.scaling = new Vector3(4, 1, 1);
                }
                if (sideWalk) {
                    sideWalk.scaling.x = 16;
                }

                const base  = this._scene.getMeshByName("Plane.002")
                if (base) {
                    base.scaling = new Vector3(345, 1, 600);
                }
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("palm_trunk_6_0_palm_trunk_6_0Mat_0.001")) {
                        mesh.scaling.x = 2;
                    }
                });
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("palm_trunk_6_0_palm_trunk_6_0Mat_0.002")) {
                        mesh.scaling.x = -.5;
                    }
                });
                resolve();
            }, undefined, reject);
        });
    }

    private _loadRoad2(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SceneLoader.ImportMesh("", "./", "glory.glb", this._scene, (meshes) => {
           
                const base  = this._scene.getMeshByName("Object_7")
                if (base) {
                    base.scaling = new Vector3(35, 1, 1);
                    base.rotation = new Vector3(0, Math.PI / 2.5, 0);
                }
                resolve();
            }, undefined, reject);
        });
    }

    private async _loadBike(): Promise<void> {
        new Bike(this._scene, "biker_animated", "Bike_1.glb", this._getStartPosition());
    }

    private async _duplicateBike(fileName: string, bikeName: string, nbreBike: number): Promise<void> {
        const startPosition = this._getStartPosition();
        // Create and position the bikes relative to StartTex
        const offsetX = 5;
        for (let i = 1; i <= nbreBike; i++) {
            new Bike(this._scene, `${bikeName}_${i}`, fileName, new Vector3(
                startPosition.x + (i * offsetX),
                startPosition.y,
                startPosition.z
            ));
        }
    }

    private _getStartPosition(): Vector3 {
        const startTex = this._scene.getMeshByName("StartTex") as Mesh;
        let position: Vector3;

        if (!startTex) {
            position = new Vector3(23, 0, 114);
        } else {
            position = startTex.position.clone();
        }

        return position;
    }
}
