// Hyejin Im, hyejin.im@tufts.edu

/*
 * An object to hold the lights,
 * constructor just adds them to global var scene
 */
class Lights {
    constructor () {
    	// Uses typical lighting setup, like portrait or TV studio...
    	this.mainLight = new THREE.DirectionalLight (0xffffff, 1)
      this.mainLight.position.set(-1, 1, 1);
    	scene.add (this.mainLight);

    	// Fill light
    	this.fillLight = new THREE.DirectionalLight ("white", 0.8)
    	this.fillLight.position.set (1, -1, -1)
    	scene.add (this.fillLight)

      // Hemisphere light
      var light = new THREE.HemisphereLight( 0xffffbb, 0x757575, 0.3 );
      scene.add( light );

      // Ambient light, white, still less bright
    	this.ambientLight = new THREE.AmbientLight (0xffffff, 0.1)
    	scene.add (this.ambientLight);

      // Point light
      var pointLight = new THREE.PointLight(0xffffbb, 1, 1000);
      pointLight.position.set(50, 50, 100);
      scene.add(pointLight);
    }
}
