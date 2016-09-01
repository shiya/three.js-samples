var scene, camera, renderer, controls;
var canvas = document.getElementById('canvas');

// particles set up
var particleCount = 1000;
var particleGeometry = new THREE.SphereGeometry(5, 32, 32); // size, number of polys to form this circle
var particleMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  transparent: true,
  opacity: 0.5
});
var particles = [];

init();
animate();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

  controls = new THREE.DeviceOrientationControls( camera );

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x202F40, 1);
  renderer.setSize( window.innerWidth, window.innerHeight );

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

    particles[i].direction = {
      x: Math.random(),
      y: Math.random()
    }
    particles[i].velocity = {
      y: Math.random()
    }

    scene.add(particles[i]);
  }

  canvas.appendChild( renderer.domElement );

  renderer.render( scene, camera );
}

function animate() {

    requestAnimationFrame( animate );
    controls.update();

    for (var i = 0; i < particleCount; i++) {
      particles[i].position.y -= particles[i].velocity.y * 3;
      if (particles[i].position.y < -window.innerHeight ||
      particles[i].position.y > window.innerHeight) {
        particles[i].position.y = window.innerHeight;
      }
    }

    renderer.render( scene, camera );

}
