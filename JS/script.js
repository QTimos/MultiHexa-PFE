// import *  as THREE from "./JS/three.module.js";
// import { FirstPersonControls } from "./JS/FirstPersonControls.js";


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x01010f, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
var axes = new THREE.AxesHelper(500);
scene.add(axes);
var viewingFPS = false;
// var light26 = new THREE.SpotLight(0xffff80, 0.35, 0, Math.PI / 2.8, 1, 1);
// light26.position.set(35, 42, -46);
// light26.target.position.set(35, 0, -46);
// var helper = new THREE.SpotLightHelper(light26);
// scene.add(light26);
// scene.add(light26.target);
// scene.add(helper);


// la meme script just on a changer la bibliotheque de controle

// monsieur la diff. est :

// premiere mode peut pas changer l'heut de view et il doit occupet le souris pour commancer la deplacment (apres cliquer la buttom)
// mais la deuxieme peut changer l'heut et il deja lire la souris sans demande (ou appeler une fonction comme la premiere mode) 

// je vais (return) la premiere mode pour bien clarifi

var fps = new THREE.FirstPersonControls(camera, renderer.domElement);



var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.x = 120;
camera.position.y = 1030;
camera.position.z = 90;
camera.lookAt(50, 980, 0);
var person = new THREE.PointerLockControls(camera, renderer.domElement);

var clock = new THREE.Clock();


// buton pour capture le souris , donc le utilisateur peut control
// c'est ca la button qui appelle notre fonction pour occuper la souris

let btn1 = document.querySelector("#button1");
let btn2 = document.querySelector("#button2");
let btn3 = document.querySelector("#button3");

var home;
var welcome;
document.body.onload = function () {
    var mtlLoader2 = new THREE.MTLLoader();
    // mtlLoader2.setResourcePath('./dd/welcome2');
    mtlLoader2.load('./dd/welcome3.mtl', function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load('./dd/welcome3.obj', function (welcome) {
            welcome.castShadow = true;
            welcome.position.set(0, 980, 0);
            welcome.scale.set(20, 20, 20);
            welcome.name = 'welcomeObj';
            scene.add(welcome);


        });

    });


};

/*


*/


//[      0                   ,       1       ]

var indx = -1;
//   4 objects daba
let modules = ['./dd/home.glb', './dd/home8.glb', './dd/city2.glb'];

// had l variable ghaib9a ytbadl


// hada l variable li ghadi yhez l'object
var selectedModule = modules[indx];

// hadi le button li katbadel les objects

btn3.addEventListener('click', () => {

    if (indx == -1) {
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 100;
        camera.lookAt(0, 0, 0);
        btn3.innerText = "Next module"
    }

    // l index kayzid
    indx = indx + 1;
    if (indx == modules.length) {
        indx = 0;
    }

    // donc l module kaytbadel
    selectedModule = modules[indx];





    scene.remove(home);

    home = null;
    var loader = new THREE.GLTFLoader();
    loader.load(selectedModule, function (gltf) {
        home = gltf.scene;
        // home.rotation.x = Math.PI / 2;
        scene.add(home);
        addLights(home);
        console.log(indx);
        home.receiveShadow = true;
        home.castShadow = true;
    });


});



btn1.addEventListener('click', () => {

    viewingFPS = false;
    if (!viewingFPS) {
        person.lock();
        if (indx == 0) {
            camera.position.set(-14, 4, -46);
            camera.lookAt(0, 1, 50);
        } else if (indx == 1) {
            camera.position.y = 11;
            camera.position.x = 35;
            camera.position.z = 42;

        }
        else if (indx == 2) {
            camera.position.set(-65, -28, 0);
            camera.lookAt(-65, -28, -50);
        }

    }

});
btn2.addEventListener('click', () => {

    viewingFPS = true;
    // document.getElementsByTagName("body")[0].style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";



});


// // on a define une variable sprint qui va changer par pressin (R), donc le vite de marche augmente
var sprint = 1;

//et ces sont les controles des le person 
addEventListener('keydown', (e) => {
    keyboard[e.key] = true;
});
addEventListener('keyup', (e) => {
    keyboard[e.key] = false;
    sprint = 1;
});
let keyboard = [];

function processKeyboard() {
    if (keyboard['r']) {
        sprint = 3;
    }
    if (keyboard['w']) {
        person.moveForward(0.2 * sprint);
    }
    if (keyboard['s']) {
        person.moveForward(-0.2 * sprint);
    }

}

// controls.maxDistance = 150;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 100;
// controls.addEventListener('change', renderer);

var planeGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 10;
plane.position.y = -10;
plane.position.z = 0;
plane.receiveShadow = true;
// scene.add(plane);




// on a ajouter des lumieure sources dans notre objets


var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 0, 0);
spotLight.castShadow = true;
// spotLight.lookAt(0, 0, 1);
scene.add(spotLight);
var boxHelper = new THREE.BoxHelper(spotLight, 0xff00f0);
scene.add(boxHelper);

var spotLight2 = new THREE.SpotLight(0x000055);
spotLight2.position.set(50, 10, 0);
// spotLight2.lookAt(0, 0, 0);
spotLight2.castShadow = true;
// scene.add(spotLight2);

var lightA = new THREE.AmbientLight(0xffffff, .4); // soft white light
// scene.add(lightA);


//   first object lights
const light1 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light1.position.set(-11, 25, -85);
light1.target.position.set(-11, 0, -85);
const light2 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light2.position.set(-11, 25, -15);
light2.target.position.set(-11, 0, -15);
const light3 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light3.position.set(15, 25, -10);
light3.target.position.set(15, 0, -10);
const light4 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light4.position.set(-15, 25, 10);
light4.target.position.set(-15, 0, 10);
const light5 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light5.position.set(11, 25, 15);
light5.target.position.set(11, 0, 15);
const light6 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light6.position.set(-11, 25, 85);
light6.target.position.set(-11, 0, 85);
const light7 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light7.position.set(85, 25, -13);
light7.target.position.set(85, 0, -13);
const light8 = new THREE.SpotLight(0xffff80, 0.55, 0, Math.PI / 4, .2);
light8.position.set(-85, 25, 13);
light8.target.position.set(-85, 0, 13);
var carlight = new THREE.SpotLight(0xffffff, .3, 0, Math.PI / 5, .1);
carlight.position.set(-1.5, 2, -26);
carlight.target.position.set(-1.5, 0, -20);
var carlight2 = new THREE.SpotLight(0xffffff, .3, 0, Math.PI / 5, .1);
carlight2.position.set(-7, 2, -26);
carlight2.target.position.set(-7, 0, -20);



//  second object lights




var light21 = new THREE.SpotLight(0xffff80, .35, 0, Math.PI / 2.8, 1, 1);;
var helper21 = new THREE.SpotLightHelper(light21);
light21.position.set(-35, 61, 33);
light21.target.position.set(-35, 0, 33);



var light22 = new THREE.SpotLight(0xffff80, .35, 0, Math.PI / 2.8, 1, 1);;
var helper22 = new THREE.SpotLightHelper(light22);
light22.position.set(13, 61, 33);
light22.target.position.set(13, 0, 33);



var light23 = new THREE.SpotLight(0xffff80, .35, 0, Math.PI / 2.8, 1, 1);;
var helper23 = new THREE.SpotLightHelper(light23);
light23.position.set(50.5, 61, 33);
light23.target.position.set(50.5, 0, 33);


var light24 = new THREE.SpotLight(0xffff80, .35, 0, Math.PI / 2.8, 1, 1);;
var helper24 = new THREE.SpotLightHelper(light24);
light24.position.set(31, 42, 10);
light24.target.position.set(31, 0, 10);

var light25 = new THREE.SpotLight(0xffff80, .35, 0, Math.PI / 2.8, 1, 1);;
var helper25 = new THREE.SpotLightHelper(light25);
light25.position.set(35, 42, -46);
light25.target.position.set(35, 0, -46);

var light26 = new THREE.SpotLight(0xffff80, .35, 0, Math.PI / 2.8, 1, 1);;
var helper26 = new THREE.SpotLightHelper(light25);
light26.position.set(-39, 42, -52);
light26.target.position.set(-35, 0, -48);

var carlight21 = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 5, 0);
carlight21.position.set(34, 6.5, -8.5);
carlight21.target.position.set(34, 5, -10);

var carlight22 = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 5, 0);
carlight22.position.set(42, 6.5, -8.5);
carlight22.target.position.set(42, 5, -10);




// first object light helper
const helper1 = new THREE.SpotLightHelper(light1);
const helper2 = new THREE.SpotLightHelper(light2);
const helper3 = new THREE.SpotLightHelper(light3);
const helper4 = new THREE.SpotLightHelper(light4);
const helper5 = new THREE.SpotLightHelper(light5);
const helper6 = new THREE.SpotLightHelper(light6);
const helper7 = new THREE.SpotLightHelper(light7);
const helper8 = new THREE.SpotLightHelper(light8);
const carhelper = new THREE.SpotLightHelper(carlight);
const carhelper2 = new THREE.SpotLightHelper(carlight2);


function addLights(homeV) {

    if (indx == 0) {
        homeV.scale.set(100, 100, 100);


        scene.remove(lightA);



        scene.add(light1);
        scene.add(light1.target);
        scene.add(light2);
        scene.add(light2.target);
        scene.add(light3);
        scene.add(light3.target);
        scene.add(light4);
        scene.add(light4.target);
        scene.add(light5);
        scene.add(light5.target);
        scene.add(light6);
        scene.add(light6.target);
        scene.add(light7);
        scene.add(light7.target);
        scene.add(light8)
        scene.add(light8.target);
        scene.add(carlight);
        scene.add(carlight.target);
        scene.add(carlight2);
        scene.add(carlight2.target);

        scene.add(cube2);
        scene.add(cube3);
        scene.add(cube4);
        scene.add(cube5);
        scene.add(cube6);
        scene.add(cube7);







        // scene.remove(helper21);
        // scene.remove(helper22);
        // scene.remove(helper23);
        // scene.remove(helper24);
        // scene.remove(helper25);





    }
    else if (indx == 1) {
        homeV.scale.set(10, 10, 10);
        scene.remove(light1);
        scene.remove(light1.target);
        scene.remove(light2);
        scene.remove(light2.target);
        scene.remove(light3);
        scene.remove(light3.target);
        scene.remove(light4);
        scene.remove(light4.target);
        scene.remove(light5);
        scene.remove(light5.target);
        scene.remove(light6);
        scene.remove(light6.target);
        scene.remove(light7);
        scene.remove(light7.target);
        scene.remove(light8)
        scene.remove(light8.target);
        scene.remove(carlight);
        scene.remove(carlight.target);
        scene.remove(carlight2);
        scene.remove(carlight2.target);
        scene.remove(cube2);
        scene.remove(cube3);
        scene.remove(cube4);
        scene.remove(cube5);
        scene.remove(cube6);
        scene.remove(cube7);
        if (scene.getObjectByName('cubename') != null) { scene.remove(cube); }


        scene.add(light21);
        scene.add(light21.target);
        scene.add(light22);
        scene.add(light22.target);
        scene.add(light23);
        scene.add(light23.target);
        scene.add(light24);
        scene.add(light24.target);
        scene.add(light25);
        scene.add(light25.target);
        scene.add(light26);
        scene.add(light26.target);
        scene.add(carlight21);
        scene.add(carlight21.target);
        scene.add(carlight22);
        scene.add(carlight22.target);
        scene.add(cube8);
        // scene.add(helper21);
        // scene.add(helper22);
        // scene.add(helper23);
        // scene.add(helper24);
        // scene.add(helper25);

        // const helper11 = new THREE.SpotLightHelper(light11);

    } else if (indx == 2) {
        homeV.scale.set(8, 8, 8);
        homeV.position.set(1630, -400, 1300);

        scene.remove(light21);
        scene.remove(light21.target);
        scene.remove(light22);
        scene.remove(light22.target);
        scene.remove(light23);
        scene.remove(light23.target);
        scene.remove(light24);
        scene.remove(light24.target);
        scene.remove(light25);
        scene.remove(light25.target);
        scene.remove(light26);
        scene.remove(light26.target);
        scene.remove(carlight21);
        scene.remove(carlight21.target);
        scene.remove(carlight22);
        scene.remove(carlight22.target);
        scene.remove(cube8);



        scene.add(lightA);

    }
}



var daylightIntensity = 0.4;

const daylight1 = new THREE.SpotLight(0x328ba8, daylightIntensity, 0, Math.PI / 2.8, 1);
daylight1.position.set(-100, 80, 100);
daylight1.target.position.set(0, 0, 0);
scene.add(daylight1);
scene.add(daylight1.target);
// const helper9 = new THREE.SpotLightHelper(daylight1);
// scene.add(helper9);


const daylight2 = new THREE.SpotLight(0xffc7b3, .2, 0, Math.PI / 2.8, 1);
daylight2.position.set(100, 80, -100);
daylight2.target.position.set(0, 0, 0);
scene.add(daylight2);
scene.add(daylight2.target);
// const helper10 = new THREE.SpotLightHelper(daylight2);
// scene.add(helper10);

var daylight3 = new THREE.SpotLight(0xffffff, .15, 0, Math.PI / 2.8, .2);
daylight3.position.set(100, 80, -100);
daylight3.target.position.set(0, 0, 0);
// scene.add(daylight3);
// scene.add(daylight3.target);
// const helper11 = new THREE.SpotLightHelper(daylight3);
// scene.add(helper11);



// chaque lumieure source on le placee sur les source des lumieure de notre objet 3d

var cubeGeometry = new THREE.BoxGeometry(70, 150, 70);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;
cube.castShadow = true;
cube.name = 'cubename';

//on a ajouter cube et la define par une nom pour activer le click procissing, on va la voir apres

var cube2Geometry = new THREE.BoxGeometry(72, 150, 72);
var cube2Material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 });
var cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
cube2.position.set(-65, 75, -65);
cube2.castShadow = true;


var cube3Geometry = new THREE.BoxGeometry(44, 55, 44);
var cube3Material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 });
var cube3 = new THREE.Mesh(cube3Geometry, cube3Material);
cube3.position.set(-40, 28, 40);
cube3.castShadow = true;

var cube4Geometry = new THREE.BoxGeometry(52, 60, 42);
var cube4Material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 });
var cube4 = new THREE.Mesh(cube4Geometry, cube4Material);
cube4.position.set(45, 28, 80);
cube4.castShadow = true;

var cube5Geometry = new THREE.BoxGeometry(78, 38, 35);
var cube5Material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 });
var cube5 = new THREE.Mesh(cube5Geometry, cube5Material);
cube5.position.set(55, 18, -75);
cube5.castShadow = true;

var cube6Geometry = new THREE.BoxGeometry(55, 25, 30);
var cube6Material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 });
var cube6 = new THREE.Mesh(cube6Geometry, cube6Material);
cube6.position.set(65, 12, 27);
cube6.castShadow = true;

var cube7Geometry = new THREE.BoxGeometry(33, 27, 33);
var cube7Material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 });
var cube7 = new THREE.Mesh(cube7Geometry, cube7Material);
cube7.position.set(65, 15, -35);
cube7.castShadow = true;

var cube8Geometry = new THREE.BoxGeometry(58, 45, 30);
var cube8Material = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0 });
var cube8 = new THREE.Mesh(cube8Geometry, cube8Material);
cube8.position.set(-10, 25, -20);
cube8.castShadow = true;


//et ici on import notre objet (pour maintenet on utilise glb format, apres on va la placer par notre sketchup [obj, mtl] fichiers )

// let home;
// var loader = new THREE.GLTFLoader();
// loader.load('./dd/home.glb', function (gltf) {
//     home = gltf.scene;
//     home.scale.set(100, 100, 100);
//     scene.add(home);
//     home.castShadow = true;
// });




// comme ca on importer les fichiers obj et mtl

// var mtlLoader2 = new THREE.MTLLoader();
// // mtlLoader2.setResourcePath('./obj1/e14fbb84-d413-4119-ab45-a3d93a89850f');
// mtlLoader2.load('./obj1/CITY_1.mtl', function (materials) {
//     materials.preload();

//     var objLoader = new THREE.OBJLoader();
//     objLoader.setMaterials(materials);

//     objLoader.load('./obj1/CITY_1.obj', function (object) {
//         object.castShadow = true;
//         scene.add(object);


//     });

// });



// ici on va utilise le cube que on la deja cree , donc quand on cliquer sur lui dans notre scene (object dans site) on exuceter quelqu chose
// dans notre cas on ajouter une autre cube et la (remove) si il est deja existe


const domEvent = new THREEx.DomEvents(camera, renderer.domElement);
domEvent.addEventListener(cube2, 'dblclick', event => {

    if (indx == 0) {

        window.open('https://www.quackit.com/javascript/examples/sample_popup.cfm', 'cube2', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

    }

});

domEvent.addEventListener(cube2, 'mouseover', event => {
    if (indx == 0) {
        if (cube2Material.opacity == 0) {
            cube2Material.transparent = true;
            cube2Material.color = 0xff0000;
            cube2Material.opacity = 0.2;
        }
    }

});

domEvent.addEventListener(cube2, 'mouseout', event => {
    if (indx == 0) {
        if (cube2Material.opacity == 0.2) {
            cube2Material.transparent = true;
            cube2Material.color = 0xff0000;
            cube2Material.opacity = 0;
        }
    }

});

domEvent.addEventListener(cube3, 'dblclick', event => {

    if (indx == 0) {

        window.open('https://www.quackit.com/javascript/examples/sample_popup.cfm', 'cube3', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

    }

});
domEvent.addEventListener(cube3, 'mouseover', event => {
    if (indx == 0) {
        if (cube3Material.opacity == 0) {
            cube3Material.transparent = true;
            cube3Material.color = 0xff0000;
            cube3Material.opacity = 0.2;
        }
    }

});

domEvent.addEventListener(cube3, 'mouseout', event => {
    if (indx == 0) {
        if (cube3Material.opacity == 0.2) {
            cube3Material.transparent = true;
            cube3Material.color = 0xff0000;
            cube3Material.opacity = 0;
        }
    }

});
domEvent.addEventListener(cube4, 'dblclick', event => {

    if (indx == 0) {

        window.open('https://www.quackit.com/javascript/examples/sample_popup.cfm', 'cube4', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

    }

});
domEvent.addEventListener(cube4, 'mouseover', event => {
    if (indx == 0) {
        if (cube4Material.opacity == 0) {
            cube4Material.transparent = true;
            cube4Material.color = 0xff0000;
            cube4Material.opacity = 0.2;
            image.png``        }
    }

});

domEvent.addEventListener(cube4, 'mouseout', event => {
    if (indx == 0) {
        if (cube4Material.opacity == 0.2) {
            cube4Material.transparent = true;
            cube4Material.color = 0xff0000;
            cube4Material.opacity = 0;
        }
    }

});
domEvent.addEventListener(cube5, 'dblclick', event => {

    if (indx == 0) {

        window.open('https://www.quackit.com/javascript/examples/sample_popup.cfm', 'cube5', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

    }

});
domEvent.addEventListener(cube5, 'mouseover', event => {
    if (indx == 0) {
        if (cube5Material.opacity == 0) {
            cube5Material.transparent = true;
            cube5Material.color = 0xff0000;
            cube5Material.opacity = 0.2;
        }
    }

});

domEvent.addEventListener(cube5, 'mouseout', event => {
    if (indx == 0) {
        if (cube5Material.opacity == 0.2) {
            cube5Material.transparent = true;
            cube5Material.color = 0xff0000;
            cube5Material.opacity = 0;
        }
    }

});

domEvent.addEventListener(cube6, 'dblclick', event => {

    if (indx == 0) {

        window.open('https://www.quackit.com/javascript/examples/sample_popup.cfm', 'cube6', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

    }

});
domEvent.addEventListener(cube6, 'mouseover', event => {
    if (indx == 0) {
        if (cube6Material.opacity == 0) {
            cube6Material.transparent = true;
            cube6Material.color = 0xff0000;
            cube6Material.opacity = 0.2;
        }
    }

});

domEvent.addEventListener(cube6, 'mouseout', event => {
    if (indx == 0) {
        if (cube6Material.opacity == 0.2) {
            cube6Material.transparent = true;
            cube6Material.color = 0xff0000;
            cube6Material.opacity = 0;
        }
    }

});
domEvent.addEventListener(cube7, 'dblclick', event => {

    if (indx == 0) {

        window.open('https://www.quackit.com/javascript/examples/sample_popup.cfm', 'cube7', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

    }

});
domEvent.addEventListener(cube7, 'mouseover', event => {
    if (indx == 0) {
        if (cube7Material.opacity == 0) {
            cube7Material.transparent = true;
            cube7Material.color = 0xff0000;
            cube7Material.opacity = 0.2;
        }
    }

});

domEvent.addEventListener(cube7, 'mouseout', event => {
    if (indx == 0) {
        if (cube7Material.opacity == 0.2) {
            cube7Material.transparent = true;
            cube7Material.color = 0xff0000;
            cube7Material.opacity = 0;
        }
    }

});

domEvent.addEventListener(cube8, 'dblclick', event => {

    if (indx == 1) {

        window.open('https://www.quackit.com/javascript/examples/sample_popup.cfm', 'popUpWindow', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no,titlebar=no');

    }

});
domEvent.addEventListener(cube8, 'mouseover', event => {
    if (indx == 1) {
        if (cube8Material.opacity == 0) {
            cube8Material.transparent = true;
            cube8Material.color = 0xff0000;
            cube8Material.opacity = 0.2;
        }
    }

});

domEvent.addEventListener(cube8, 'mouseout', event => {
    if (indx == 1) {
        if (cube8Material.opacity == 0.2) {
            cube8Material.transparent = true;
            cube8Material.color = 0xff0000;
            cube8Material.opacity = 0;
        }
    }

});


// et c'est une fonction init pour ajouter le blaque de statue a corner (qui identifie le fps )

function initStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    $("#Stats-output").append(stats.domElement);
    return stats;
}


// et set fonction responsable pour controler les animation (dans notre cas il n y a pas animation, just clavier controls fonction)


var stats = initStats();
var step = 0;
function renderScene() {
    stats.update();
    // l 'autre mode de control est first person mode.... je vais l'active!
    if (viewingFPS) {
        fps.update(clock.getDelta());

    }
    if (!viewingFPS) {
        processKeyboard();

    }
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
}

renderScene();
$("#WebGL-output").append(renderer.domElement);


// merci monsieur