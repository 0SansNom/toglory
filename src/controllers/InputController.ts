import { ArcRotateCamera, Mesh, Scene } from "@babylonjs/core";
import { BikeController } from "./bikeController";
import { ROAD_BOUNDS } from "../Globalvariables";

export default class InputController {
    private _timeElapsed: number = 0;
    private _winner: string | undefined;
    private _timerInterval: NodeJS.Timeout | undefined;

    private _keysPressed: { [key: string]: boolean } = {};
    private readonly _bikeSpeed = 0.21;
    private _proximityThreshold = 3;

    // Définir les limites de la route (ajustez les valeurs selon vos besoins)
   // private readonly _roadBounds = { minX: -50, maxX: 50, minZ: -50, maxZ: 50 };

    constructor(private readonly _scene: Scene, private readonly _camera: ArcRotateCamera) {
        window.addEventListener("keydown", this._handleKeyDown.bind(this));
        window.addEventListener("keyup", this._handleKeyUp.bind(this));
        this._timerInterval = setInterval(() => {
            this._timeElapsed += 1; 
            if (this._timeElapsed >= 120) { // 120 secondes (2 minutes)
                this._findWinner();
                clearInterval(this._timerInterval); 
                this._displayScores(); 
            }
        }, 1000);
    }

    private _displayScores(): void {
        const scores = {
            winner: this._winner,
            ranks: this._getRanks()
        };

        localStorage.setItem('scores', JSON.stringify(scores)); 

        setTimeout(() => {
            window.location.href = 'scores.html';
        }, 1000);
    }

    private _getRanks(): { name: string; distance: number }[] {
        const ranks: { name: string; distance: number }[] = [];
        this._scene.meshes.forEach(mesh => {
            if (mesh instanceof Mesh && mesh.name.startsWith("bike")) {
                const distance = mesh.position.subtract(this._scene.getMeshByName("Text")!.position).length();
                ranks.push({ name: mesh.name, distance });
            }
        });

        ranks.sort((a, b) => a.distance - b.distance);
        return ranks;
    }

    private _findWinner(): void {
        let closestDistance = Number.MAX_VALUE;
        let closestBikeName: string | undefined;
        this._scene.meshes.forEach(mesh => {
            if (mesh instanceof Mesh && mesh.name.startsWith("bike")) {
                const distance = mesh.position.subtract(this._scene.getMeshByName("Text")!.position).length();
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestBikeName = mesh.name;
                }
            }
        });

        if (closestBikeName) {
            this._winner = closestBikeName;
            console.log(`Le gagnant est le vélo ${closestBikeName} !`);
            this._declareRanks();
        } else {
            console.log("Aucun gagnant trouvé.");
        }
    }

    private _declareRanks(): void {
        const ranks: { name: string; distance: number }[] = [];
        this._scene.meshes.forEach(mesh => {
            if (mesh instanceof Mesh && mesh.name.startsWith("bike")) {
                const distance = mesh.position.subtract(this._scene.getMeshByName("Text")!.position).length();
                ranks.push({ name: mesh.name, distance });
            }
        });

        ranks.sort((a, b) => a.distance - b.distance);

        console.log("Classement des autres vélos :");
        ranks.forEach((rank, index) => {
            if (rank.name !== this._winner) {
                console.log(`${index + 1}. Vélo ${rank.name}, distance : ${rank.distance}`);
            }
        });
    }

    private _handleKeyDown = (event: KeyboardEvent) => {
        this._keysPressed[event.key] = true;
    }

    private _handleKeyUp = (event: KeyboardEvent) => {
        this._keysPressed[event.key] = false;
    }

    private isKeyPressed(key: string): boolean {
        return this._keysPressed[key] ?? false;
    }

    private _handlePlayerMovement(): void {
        const bike = this._scene.meshes.find(mesh => mesh instanceof Mesh && mesh.name.startsWith('biker_animated')) as Mesh;
        if (bike) {
            const originalPosition = bike.position.clone(); // Store original position

            if (this.isKeyPressed("ArrowUp")) {
                bike.position.z -= this._bikeSpeed;
                bike.rotation.y = Math.PI;
            }
            if (this.isKeyPressed("ArrowDown")) {
                bike.position.z += this._bikeSpeed;
                bike.rotation.y = 0;
            }
            if (this.isKeyPressed("ArrowLeft")) {
                bike.position.x += this._bikeSpeed;
                bike.rotation.y = Math.PI / 1.2;
            }
            if (this.isKeyPressed("ArrowRight")) {
                bike.position.x -= this._bikeSpeed;
                bike.rotation.y = -Math.PI / 1.2;
            }

            if (this._checkCollisions(bike)) {
                // Restore original position if collision occurs
                bike.position.copyFrom(originalPosition);
            }

            // Check if bike is out of road bounds
            this._checkBikePosition(bike);

            this._camera.setTarget(bike.position);
        }
    }

    private _checkBikePosition(bike: Mesh): void {
        if (bike.position.x < ROAD_BOUNDS.minX) bike.position.x = ROAD_BOUNDS.minX ;
        if (bike.position.x > ROAD_BOUNDS.maxX) bike.position.x = ROAD_BOUNDS.maxX;
        if (bike.position.z < ROAD_BOUNDS.minZ) bike.position.z = ROAD_BOUNDS.minZ;
        if (bike.position.z > ROAD_BOUNDS.maxZ) bike.position.z = ROAD_BOUNDS.maxZ;
    }

    private _checkCollisions(bike: Mesh): boolean {
        let proximityDetected = false;

        this._scene.meshes.forEach(mesh => {
            if (mesh instanceof Mesh && mesh.name.startsWith("bike") && mesh !== bike) {
                const distance = bike.position.subtract(mesh.position).length();
                if (distance <= this._proximityThreshold) {
                    proximityDetected = true;
                }
            }
        });

        return proximityDetected;
    }

    private _updateOtherBikes(): void {
        this._scene.meshes.forEach(mesh => {
            if (mesh instanceof Mesh && mesh.name.startsWith("bike_en") && mesh !== this._scene.meshes[0]) {
                const bike = new BikeController(mesh);
                bike.moveRandomly(ROAD_BOUNDS);
                this._checkBikePosition(mesh); 
            }
        });
    }

    public update(): void {
        this._handlePlayerMovement();
        this._updateOtherBikes();
    }


}
