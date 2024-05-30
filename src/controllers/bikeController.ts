import {  Mesh, Vector3 } from "@babylonjs/core";
import { ROAD_BOUNDS } from "../Globalvariables";

export class BikeController {
    
    constructor(private _mesh: Mesh) {}

    public setPositionAndProperties({ position, scaling, rotation, name }: { position: Vector3, scaling: Vector3, rotation: Vector3, name: string }): void {
        this._mesh.position = position;
        this._mesh.scaling = scaling;
        this._mesh.rotation = rotation;
        this._mesh.name = name;   
    }

    public moveRandomly(roadBounds: { minX: number, maxX: number, minZ: number, maxZ: number }): void {
        if (this._mesh instanceof Mesh) {
            const randomX = (Math.random() * 0.2) - 0.1;
            const randomZ = Math.random() * 0.4;
    
            this._mesh.position.x += randomX;
            this._mesh.position.z -= randomZ;
    
            this._checkBikePosition(roadBounds);
        }
    }
    
    private _checkBikePosition(roadBounds: { minX: number, maxX: number, minZ: number, maxZ: number }): void {
        if (this._mesh.position.x < ROAD_BOUNDS.minX) this._mesh.position.x = ROAD_BOUNDS.minX;
        if (this._mesh.position.x > ROAD_BOUNDS.maxX) this._mesh.position.x = ROAD_BOUNDS.maxX;
        if (this._mesh.position.z < ROAD_BOUNDS.minZ) this._mesh.position.z = ROAD_BOUNDS.minZ;
        if (this._mesh.position.z > ROAD_BOUNDS.maxZ) this._mesh.position.z = ROAD_BOUNDS.maxZ;
    
        const bikeWidth = this._mesh.scaling.x; 
        const bikeDepth = this._mesh.scaling.z; 
    
        const minBoundaryX = roadBounds.minX + (bikeWidth / 2);
        const maxBoundaryX = roadBounds.maxX - (bikeWidth / 2);
        const minBoundaryZ = roadBounds.minZ + (bikeDepth / 2);
        const maxBoundaryZ = roadBounds.maxZ - (bikeDepth / 2);
    
        if (this._mesh.position.x < minBoundaryX) this._mesh.position.x = minBoundaryX;
        if (this._mesh.position.x > maxBoundaryX) this._mesh.position.x = maxBoundaryX;
        if (this._mesh.position.z < minBoundaryZ) this._mesh.position.z = minBoundaryZ;
        if (this._mesh.position.z > maxBoundaryZ) this._mesh.position.z = maxBoundaryZ;
    }
    
    
}
