(function () {
  var scene, camera, renderer, controls, diretionalLight, hemisphereLight;
  var canvas = document.getElementById('canvas');

  // particles set up
  var particleCount = 100;
  var particles = [];

  init();
  animate();

  function fillScene() {


    // Add stuff to your scene

    var geometry = new THREE.BoxGeometry( 100, 100, 100 );
    var material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

  }

  function init() {
    scene = new THREE.Scene();

    // LIGHTS
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );
    //
    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    scene.add( dirLight );

    dirLight.castShadow = true;
    
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    var d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    // ground
    var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
    groundMat.color.setHex( 0x0C73B8 );
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -33;
    scene.add( ground );
    ground.receiveShadow = true;

    // camera

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xBFE6F3, 1);
    renderer.setSize( window.innerWidth, window.innerHeight );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    fillScene();
    canvas.appendChild( renderer.domElement );
    renderer.render( scene, camera );
  }

  function animate() {
      requestAnimationFrame( animate );
      controls.update();

      renderer.render( scene, camera );
  }
})();