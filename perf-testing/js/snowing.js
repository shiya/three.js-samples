var scene, camera, renderer, controls;
var canvas = document.getElementById('canvas');

// particles set up
var particleCount = 1000;
var particles = [];

init();
animate();

function init() {

  scene = new THREE.Scene();

  // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  // controls = new THREE.DeviceOrientationControls( camera );


  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x111727, 1 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  // ambient light
  var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHex( 0xffffff );
  hemiLight.groundColor.setHex( 0xffffff );
  hemiLight.position.set( 0, 500, 0 );
  scene.add( hemiLight );

  // point light (stree lamp)
  var pointLight = new THREE.PointLight( 0xffffff, 1, 700, 2 );
  pointLight.position.set(200, 200, 300);
  scene.add(pointLight);

  // ground
  var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
  var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
  groundMat.color.setHex( 0xbfd2eb )
  var ground = new THREE.Mesh( groundGeo, groundMat );
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -33;
  scene.add( ground );
  ground.receiveShadow = true;

  // create a random set of particles
  for (var i = 0; i < particleCount; i++) {

    particles[i] = new THREE.Mesh( new THREE.SphereGeometry(5, 32, 32), new THREE.MeshPhongMaterial({color: 0xbfd2eb}));

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
