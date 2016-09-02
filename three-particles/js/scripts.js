var scene, camera, renderer, controls;
var geometry, material, mesh;
var canvas = document.getElementById('canvas');

// particles set up
var particleCount = 100;
var particles = [];

init();
fillScene();
animate();

function fillScene() {

  var particleGeometry = new THREE.SphereGeometry(10, 32, 32); // size, number of polys to form this circle
  var particleMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.5
  });

  // create a random set of particles
  for (var i = 0; i < particleCount; i++) {

    particles[i] = new THREE.Mesh( particleGeometry, particleMaterial );

    //randomize positions
    var px = Math.random() * window.innerWidth * 2 - window.innerWidth;
    var py = Math.random() * window.innerHeight * 2 - window.innerHeight;
    var pz = Math.random() * window.innerWidth * 2 - window.innerWidth;

    particles[i].position.x = px;
    particles[i].position.y = py;
    particles[i].position.z = pz;

    particles[i]. direction = {
      x: Math.random(),
      y: Math.random()
    }

    scene.add(particles[i]);
  }
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x31AED1, 1);
  renderer.setSize( window.innerWidth, window.innerHeight );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  canvas.appendChild( renderer.domElement );
  fillScene();
  renderer.render( scene, camera );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();

    for (var i = 0; i < particleCount; i++) {
      particles[i].position.x += particles[i].direction.x;
      particles[i].position.y += particles[i].direction.y;

      // if edge is reached, bounce back
      if (particles[i].position.x < -window.innerWidth ||
      particles[i].position.x > window.innerWidth) {
        particles[i].direction.x = -particles[i].direction.x;
      }
      if (particles[i].position.y < -window.innerHeight ||
      particles[i].position.y > window.innerHeight) {
        particles[i].direction.y = -particles[i].direction.y;
      }
    }

    renderer.render( scene, camera );

}
