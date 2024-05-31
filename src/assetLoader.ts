import { Scene, SceneLoader, Mesh, Vector3, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
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
       await this._loadRoad2();
        await this._loadBike();
        await this._duplicateBike("jo.glb", "bike_enemy", 4);
        await this._loadObstacles();
    }

    public async loadGame3(): Promise<void> {
        await this._loadRoad3();
         await this._loadBike();
         await this._duplicateBike("jo.glb", "bike_enemy", 4);
         await this._loadObstacles();
     }
    private _loadObstacles(): void {
        for (let i = 0; i < 5; i++) {
            const sphere = MeshBuilder.CreateSphere(`obstacle_${i}`, { diameter: 5 }, this._scene);
            sphere.position = new Vector3(
                (Math.random() - .6) * 50,
                1,
                (Math.random() - .6) * 50
            );
        }
    }

    private _loadRoad(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SceneLoader.ImportMesh("", "./", "glory.glb", this._scene, (meshes) => {
                const roadMesh = meshes[0] as Mesh;
                roadMesh.position = new Vector3(30, 0, 0);
        
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
                resolve();
            }, undefined, reject);
        });
    }


    private _loadRoad2(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SceneLoader.ImportMesh("", "./", "level2.glb", this._scene, (meshes) => {
                const roadMesh = meshes[0] as Mesh;
                roadMesh.position = new Vector3(30, 0, 0);

                                const plane = this._scene.getMeshByName("Plane.001");
                const sideWalk  = this._scene.getMeshByName("Plane")
                if (plane) {
                    plane.scaling = new Vector3(4, 1, 1);
                }
                if (sideWalk) {
                    sideWalk.scaling.x = 4;
                }

                const base  = this._scene.getMeshByName("Plane.002")
                if (base) {
                    base.scaling = new Vector3(345, 1, 600);
                }
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("Tree.Birch.")) {
                        mesh.scaling.x = 2.5;
                    }
                });
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("StreetLight")) {
                        mesh.scaling.x = 2;
                    }
                });

                
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("pCube3")) {
                        mesh.scaling = new Vector3(2, .7, .7);
                    }
                });
                resolve();
            }, undefined, reject);
        });
    }



    private _loadRoad3(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SceneLoader.ImportMesh("", "./", "level3.glb", this._scene, (meshes) => {
                const roadMesh = meshes[0] as Mesh;
                roadMesh.position = new Vector3(30, 0, 0);
        
                const plane = this._scene.getMeshByName("Plane.001");
                const sideWalk  = this._scene.getMeshByName("Plane")
                if (plane) {
                    plane.scaling = new Vector3(4, 1, 1);
                }
                if (sideWalk) {
                    sideWalk.scaling.x = 4;
                }

                const base  = this._scene.getMeshByName("Plane.002")
                if (base) {
                    base.scaling = new Vector3(0, 0, 0);
                    base.isVisible = false;

                }
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("Tree.Birch.")) {
                        mesh.scaling.x = 2.5;
                    }
                });
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("StreetLight")) {
                        mesh.scaling.x = 2;
                    }
                });

                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("Object_30")) {
                

                    }
                });
                this._scene.meshes.forEach(mesh => {
                    if (mesh instanceof Mesh && mesh.name.startsWith("anneaux")) {
                        mesh.scaling =  new Vector3(2, 3, 1);
                        mesh.scaling.x = 2;
                    }
                });
              
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
