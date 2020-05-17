/**
 * Maps a value from one space to another.
 * @param val
 * @param smin
 * @param smax
 * @param emin
 * @param emax
 * @returns {*}
 */
export const map = function mapValues(val, smin, smax, emin, emax) {
    const t =  (val - smin) / (smax - smin);
    return (emax - emin) * t + emin;
};
