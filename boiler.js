// Hyejin Im, hyejin.im@tufts.edu

/*
 * All the boilerplate from the first example is here,
 * you just provide makeSceneGraph()
 */

// Global variables
var scene,
		renderer,
		camera,
		controls,
		myScene;

// Screen variables
var HEIGHT,
		WIDTH,
		windowHalfX,
		windowHalfY,
		xLimit,
		yLimit;

var fieldOfView,
  	aspectRatio,
  	nearPlane,
  	farPlane;

var DEG2RAD = Math.PI / 180;

// Meteor colors
var colors = ['#FFFF8D',
							'#dff69e',
          		'#00ceff',
							'#ee78aa',
          		'#3f159f',
          		'#71b583',
          		'#00a2ff'];

var maxMeteorsZ = 200;

// Our Dog
var laika;

// Speed
var speed = {x:0, y:0};
var smoothing = 10;

// Miscellaneous
var mousePos = {x:0, y:0};
var halfPI = Math.PI/2;

window.onload = function () {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	// Most browsers now support WebGLRenderer
	renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true } );
	// renderer.setClearColor( new THREE.Color ("#E3AFC5")) // I will draw background in style sheet
	renderer.setSize( WIDTH, HEIGHT );
	document.getElementById('theContainer').appendChild(renderer.domElement);

	// Create the scene
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xE3AFC5, 0.0006 );
	renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// Put a camera into the scene
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1; // the camera won't "see" any object placed in front of this plane
	farPlane = 2000; // the camera wont't see any object placed further than this plane

	camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, nearPlane, farPlane );
	camera.position.z = 1000;
	scene.add(camera);

	// Create a camera contol
	// controls = new THREE.OrbitControls( camera, renderer.domElement );
	// controls.addEventListener( 'change', render );

	// Other initialization: when the mouse moves, call our function
	// Generate stars
	var ang = (60/2)*Math.PI / 180;
	// calculate the max y position seen by the camera related to the maxParticlesZ position, I start by calculating the y limit because fielOfView is a vertical field of view. I then calculate the x Limit
  yLimit = (camera.position.z + maxMeteorsZ) * Math.tan(ang); // this is a formula I found, don't ask me why it works, it just does :)
  // Calculate the max x position seen by the camera related to the y Limit position
  xLimit = yLimit *camera.aspect;

  // precalculate the center of the screen, used to update the speed depending on the mouse position
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

	// Add our stuff to the scene, kept in a separate function
	makeSceneGraph()
	render()
	animate()
}

// Animation loop
function animate() {
	requestAnimationFrame( animate );
	// controls.update();
}

// Render the scene
function render() {
	renderer.render( scene, camera );
}

// In case window is resized
window.onresize = function() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();

  windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;

	// recalculate the limits
	var ang = (60/2)* Math.PI / 180;
	yLimit = (camera.position.z + maxMeteorsZ) * Math.tan(ang);
	xLimit = yLimit *camera.aspect;

	render();
}
