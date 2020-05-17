const SimplexNoise = require('simplex-noise');
import { map } from './map';

// Create Simplex Noise with a seed of 4
const simplex = new SimplexNoise('4');

/**
 * Remap -1 : 1 to 0 : 1, since Simplex returns a value from -1 to 1
 * @param nx
 * @param ny
 * @returns {*}
 */
export const noise = function generateNoise(nx, ny) {
    return map(simplex.noise2D(nx, ny),-1, 1, 0, 1);
};
