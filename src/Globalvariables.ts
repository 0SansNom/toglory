// config.ts
export const ROAD_BOUNDS = {
    minX: 15,
    maxX: 45,
    minZ: -405,
    maxZ: 410
};



export const PROXIMITY_THRESHOLD = 3;

export interface TexturePaths {
    planeDiffuse: string;
    planeBump?: string;
    sideWalkDiffuse: string;
    baseDiffuse?: string;
    treeDiffuse?: string;
    streetLightDiffuse?: string;
    pCubeDiffuse?: string;
}