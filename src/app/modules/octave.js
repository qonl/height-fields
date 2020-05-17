import { noise } from './noise';

/**
 * Stacks noise samples.
 * @param nx
 * @param ny
 * @param octaves
 * @returns {number}
 */
export const octave = function generateOctave(nx, ny, octaves) {
    let val = 0;
    let freq = 1;
    let max = 0;
    let amp = 1;

    for (let i = 0; i < octaves; i++) {
        val += noise(nx * freq,ny * freq) * amp;
        max += amp;
        amp /= 2;
        freq *= 2;
    }

    return val / max;
};
