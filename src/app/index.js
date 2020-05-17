import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { texture } from './modules/textures/texture';
import { water } from './modules/textures/water';
import { terrain } from './modules/textures/terrain';

import { constants } from './constants';

const {
    VIEW_ANGLE,
    HEIGHT,
    WIDTH,
    ASPECT,
    FAR,
    NEAR,
} = constants;

// Instantiate three.js variables
let camera, scene, renderer;

let controls;

/**
 * Initialize the content that will be used in the scene.
 * @param scene
 */
const initContent = function initContent(scene) {
    // Set the background color of the scene
    scene.background = new THREE.Color( 0xcccccc );

    const light = new THREE.DirectionalLight( 0xffffff, 0.7 );
    light.position.set( 1, 1, 0 ).normalize();
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const tex = texture();
    const mesh = terrain(tex);
    water(scene);
    scene.add(mesh);

    renderer.render( scene, camera );
};

/**
 * Initialize the scene.
 */
const initScene = function initScene() {
    // Create DIV for the canvas
    const container = document.createElement( 'div' );
    document.body.appendChild( container );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    renderer.gammaOutput = true;
    container.appendChild( renderer.domElement );

    camera.position.z = 200;

    camera.position.y = 50;

    controls = new OrbitControls(camera, renderer.domElement);

    initContent(scene, camera, renderer);

    window.addEventListener( 'resize', () => {
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);
    }, false );

    animate();
};

/**
 * Create the animation loop for OrbitControls.
 */
const animate = function animate() {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
};

initScene();



