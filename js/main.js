import * as  THREE from './../node_modules/three/build/three.module.js';
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { WEBGL } from './../node_modules/three/examples/jsm/WEBGL.js';
import { GLTFLoader } from './../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// import { Raycaster } from "./../node_modules/three/src/core/Raycaster";


if (WEBGL.isWebGLAvailable()) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    cube.addEventListener('click', function (event) {

        alert("event.message");

    });
    scene.add(cube);

    camera.position.z = 5;
    
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.x = -10;
    mouse.y = -10;

    var animate = function () {
        requestAnimationFrame(animate);

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(scene.children);

        for (var i = 0; i < intersects.length; i++) {
            intersects[i].object.material.color.set(0xff0000);
        }

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // cube.position.x -= 0.5;
        // cube.position.z -= 0.5;
        //                 cube.position.y -= 0.01;

        renderer.render(scene, camera);
    }


    function onMouseDown(event) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousedown', onMouseDown, false);
    
    /* const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    console.log("controls:" + controls); */
    
    animate();  
} else {

    var warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);

}