
import { Engine, Mesh, Scene, Sound, Vector3 } from "@babylonjs/core";
import { ArcRotateCamera, HemisphericLight } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import { GameCanvas } from "./gameCanvas";
import InputController from "./controllers/InputController";
import AssetLoader from "./assetLoader";
import Level from "./level";

export class Level1 extends Level {
    constructor() {
        // Appeler le constructeur de la classe parent avec la position de la caméra pour ce niveau
        super(new Vector3(0, 15, 15));

        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            loadingScreen.style.display = "flex";
        }

        // Ajouter les lumières spécifiques à ce niveau
        new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);
        new HemisphericLight("light1", new Vector3(1, 1, 6), this._scene);
        new HemisphericLight("light1", new Vector3(2, 1, 4), this._scene);
        new HemisphericLight("light1", new Vector3(5, 2, 0), this._scene);

        // Charger les ressources spécifiques à ce niveau
        this._loadResources().then(() => {
            if (loadingScreen) {
                loadingScreen.style.display = "none";
            }
            this._setupRenderLoop();
        });

        // Afficher l'inspecteur
        Inspector.Show(this._scene, {});
    }

    private async _loadResources(): Promise<void> {
    
        await this._road?.loadGame1(); 
    }

    public stopGame(): void {
        // Implémenter la logique d'arrêt du jeu spécifique à ce niveau
        const stop = this._scene.getMeshByName("Text");
        this._scene.meshes.forEach(mesh => {
            if (mesh instanceof Mesh && mesh.name.startsWith("bike") && mesh !== this._scene.meshes[0]) {
                if (stop) {
                    if (mesh.position.z <= stop.position.z)
                        this._stopGameAndShowScores();
                }
            }
        });
    }

}
