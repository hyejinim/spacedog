// Hyejin Im, hyejin.im@tufts.edu

class Star extends THREE.Object3D {
  constructor(size, color) {
    super();

    var star = new THREE.Mesh(new THREE.OctahedronGeometry(size, 0),
      new THREE.MeshPhongMaterial({
        color: color
      }));

    this.add(star);
  }
  // Make star rotate
  tick(){
    this.rotation.y += .005;
    this.rotation.x += .005;
    this.rotation.z += .005;
  }
}
