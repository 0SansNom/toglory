import { Scene, Mesh } from "@babylonjs/core";

export class OpponentController {
    constructor(private _mesh: Mesh, private _scene: Scene) {}

    public moveRandomly(): void {
        if (this._mesh instanceof Mesh) {
            const randomX = (Math.random() * 0.2) - 0.1;
            const randomZ = Math.random() * 0.1;
            this._mesh.position.x += randomX;
            this._mesh.position.z -= randomZ;
        }
    }
}
