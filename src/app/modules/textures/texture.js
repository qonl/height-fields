import { constants } from '../../constants';
import { octave } from '../octave';

const { CANVAS } = constants;

/**
 * Write the noise to the <canvas> element.
 * @returns {ImageData}
 */
export const texture = function generateTexture() {
    const c = CANVAS.getContext('2d');
    c.fillStyle = 'black';
    c.fillRect(0, 0, CANVAS.width, CANVAS.height);

    for(let i = 0; i < CANVAS.width; i++) {
        for(let j = 0; j < CANVAS.height; j++) {
            let v =  octave(i / CANVAS.width, j / CANVAS.height, 16);
            const per = `${(100 * v).toFixed(2)}%`;
            c.fillStyle = `rgb(${ per },${ per },${ per })`;
            c.fillRect(i, j, 1, 1);
        }
    }

    return c.getImageData(0, 0, CANVAS.width, CANVAS.height);
};
