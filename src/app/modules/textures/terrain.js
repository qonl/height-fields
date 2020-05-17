import * as THREE from 'three';
import { map } from '../map';
import { toRad } from '../../utility/toRad';

/**
 * Generate the terrain mesh from the <canvas> data.
 * @param data
 * @returns {Mesh}
 */
export const terrain = function generateMeshFromTexture(data) {
    // Make plane geometry
    const geo = new THREE.PlaneGeometry(data.width, data.height, data.width, data.height + 1);

    // Assign vert data from the canvas
    for(let j = 0; j < data.height; j++) {
        for (let i = 0; i < data.width; i++) {
            const n =  (j * (data.height) + i);
            const nn = (j * (data.height + 1) + i);
            const col = data.data[n * 4]; // The red channel
            const v1 = geo.vertices[nn];

            v1.z = map(col,0,255,-10,10); // Map from 0:255 to -10:10

            if (v1.z > 2.5) v1.z *= 1.5; // Exaggerate the peaks

            v1.x += map(Math.random(),0,1,-0.5,0.5); // Jitter x
            v1.y += map(Math.random(),0,1,-0.5,0.5); // Jitter y
        }
    }

    // For every face
    geo.faces.forEach(f => {
        // Get three vertices for the face
        const a = geo.vertices[f.a];
        const b = geo.vertices[f.b];
        const c = geo.vertices[f.c];

        // If average is below water, set to 0
        const averageZ = (a.z + b.z + c.z) / 3;
        if (averageZ < 0) {
            a.z = 0;
            b.z = 0;
            c.z = 0;
        }


        // Assign colors based on the highest point of the face
        const max = Math.max(a.z, Math.max(b.z, c.z));
        if (max <= 0)   return f.color.set(0xc6efff);
        if (max <= 1.5) return f.color.set(0x228800);
        if (max <= 3.5)   return f.color.set(0xeecc44);
        if (max <= 5)   return f.color.set(0xcccccc);

        // Otherwise, return white
        f.color.set('white');
    });

    geo.colorsNeedUpdate = true;
    geo.verticesNeedUpdate = true;

    // Required for flat shading
    geo.computeFlatVertexNormals();
    const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({
        // wireframe:true,
        vertexColors: THREE.VertexColors,
        // This is required for flat shading
        flatShading: true,
    }));

    mesh.position.y = -0;
    mesh.position.z = -20;
    // Tilt slightly
    mesh.rotation.x = toRad(-90);
    return mesh;
};
