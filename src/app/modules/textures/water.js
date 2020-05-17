import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water2';

import { constants } from '../../constants';

const {
    WIDTH,
    HEIGHT,
    WATER_FLOW
} = constants;

/**
 * Generate the water texture.
 * @param scene
 */
export const water = function generateWaterTexture(scene) {
    const textureLoader = new THREE.TextureLoader();

    const waterGeometry = new THREE.PlaneBufferGeometry( WIDTH, HEIGHT );
    const flowMap = textureLoader.load(WATER_FLOW);

    const waterObj = new Water( waterGeometry, {
        scale: 2,
        textureWidth: 1024,
        textureHeight: 1024,
        flowMap: flowMap
    } );

    waterObj.position.y = 0;
    waterObj.rotation.x = Math.PI * - 0.5;
    scene.add( waterObj );
};
