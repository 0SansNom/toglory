import { Scene, SceneLoader, Mesh, Vector3, MeshBuilder, StandardMaterial, Color3, Texture } from "@babylonjs/core";
import Bike from "./entities/bike";
import { TexturePaths } from "./Globalvariables";

export default class AssetLoader {
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    public async loadGame1(): Promise<void> {
        await this._loadRoad1();
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

    private _applyTextureToMeshes(texturePaths: TexturePaths): void {
        const plane = this._scene.getMeshByName("Plane.001");
        const sideWalk = this._scene.getMeshByName("Plane");
        const base = this._scene.getMeshByName("Plane.002");
        const treeBirch = this._scene.getMeshByName("Tree.Birch.001"); 
        const streetLight = this._scene.getMeshByName("StreetLight_primitive0"); 
        const pCube = this._scene.getMeshByName("pCube3");
    
        if (plane && plane instanceof Mesh) {
            plane.scaling = new Vector3(4, 1, 1);
            this._applyTextureToMesh(plane, texturePaths.planeDiffuse, texturePaths.planeBump);
        }
    
        if (sideWalk && sideWalk instanceof Mesh) {
            sideWalk.scaling.x = 4;
            this._applyTextureToMesh(sideWalk, texturePaths.sideWalkDiffuse);
        }
    
        if (base && base instanceof Mesh) {
            base.scaling = new Vector3(345, 1, 600);
            if (texturePaths.baseDiffuse) {
                this._applyTextureToMesh(base, texturePaths.baseDiffuse);
            }
        }
    
        if (treeBirch && treeBirch instanceof Mesh) {
            treeBirch.scaling.x = 2;
            if (texturePaths.treeDiffuse) {
                this._applyTextureToMesh(treeBirch, texturePaths.treeDiffuse);
            }
        }
    
        if (streetLight && streetLight instanceof Mesh) {
            streetLight.scaling.x = 3;
            if (texturePaths.streetLightDiffuse) {
                this._applyTextureToMesh(streetLight, texturePaths.streetLightDiffuse);
            }
        }
    
        if (pCube && pCube instanceof Mesh) {
            pCube.scaling = new Vector3(2, 0.7, 0.7);
            if (texturePaths.pCubeDiffuse) {
                this._applyTextureToMesh(pCube, texturePaths.pCubeDiffuse);
            }
        }
    }
    
    private _applyTextureToMesh(mesh: Mesh, diffuseTexturePath: string, bumpTexturePath?: string): void {
        const material = new StandardMaterial(`${mesh.name}Material`, this._scene);
        material.diffuseTexture = new Texture(diffuseTexturePath, this._scene);
        if (bumpTexturePath) {
            material.bumpTexture = new Texture(bumpTexturePath, this._scene);
        }
        mesh.material = material;
    }
    
    private _loadRoad(texturePaths: TexturePaths): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SceneLoader.ImportMesh("", "./", "level2.glb", this._scene, (meshes) => {
                const roadMesh = meshes[0] as Mesh;
                roadMesh.position = new Vector3(30, 0, 0);
    
                this._applyTextureToMeshes(texturePaths);
    
                resolve();
            }, undefined, reject);
        });
    }
    
    
    private _loadRoad1(): Promise<void> {
        const texturePaths: TexturePaths = {
            planeDiffuse: "/textures/road1.jpeg",
            planeBump: "/textures/road1.jpeg",
            sideWalkDiffuse: "/textures/sidewalk1.jpeg",
        };
        return this._loadRoad(texturePaths);
    }
    
    private _loadRoad2(): Promise<void> {
        const texturePaths: TexturePaths = {
            planeDiffuse: "/textures/road2.jpeg",
            planeBump: "/textures/road2_bump.jpeg",
            sideWalkDiffuse: "/textures/sidewalk2.jpeg",
            baseDiffuse: "/textures/base2.jpeg",
           // treeDiffuse: "/textures/tree2.jpeg",
           streetLightDiffuse: "/textures/streetLight2.jpeg",
            pCubeDiffuse: "/textures/pCube2.jpeg",
        };
        return this._loadRoad(texturePaths);
    }
    
    private _loadRoad3(): Promise<void> {
        const texturePaths: TexturePaths = {
            planeDiffuse: "/textures/road3.jpeg",
            planeBump: "/textures/road3_bump.jpeg",
            sideWalkDiffuse: "/textures/sidewalk3.jpeg",
            baseDiffuse: "/textures/base3.jpeg",
            treeDiffuse: "/textures/tree3.jpeg",
            streetLightDiffuse: "/textures/streetLight3.jpeg",
            pCubeDiffuse: "/textures/pCube3.jpeg",
        };
        return this._loadRoad(texturePaths);
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
        const startTex = this._scene.getMeshByName("StartText1") as Mesh;
        let position: Vector3;

        if (!startTex) {
            position = new Vector3(23, 0, 114);
        } else {
            position = startTex.position.clone();
        }

        return position;
    }
}


