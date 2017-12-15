// Hyejin Im, hyejin.im@tufts.edu

class Meteor extends THREE.Object3D {
  constructor(type, size, color) {
    super();
    var type;
    if (type=="Octahedron"){
      type = new THREE.OctahedronGeometry(size, 0)
    }else if (type=="Torus"){
      type = new THREE.TorusGeometry( size, 10, 7, 15);
    }else if (type=="Sphere"){
      type = new THREE.SphereGeometry( size, 8, 6 );
    }else if (type=="Tetrahedron"){
      type = new THREE.TetrahedronGeometry(size);
    }
    var m = new THREE.Mesh(type,
        new THREE.MeshPhongMaterial({
          color: color
        }));
    this.add(m);
  }
  tick(){
    this.rotation.y += (1/this.scale.x) *.05;
    this.rotation.x += (1/this.scale.x) *.05;
    this.rotation.z += (1/this.scale.x) *.05;
    this.position.x += -10 -(1/this.scale.x) * speed.x *.05;
    this.position.y += (1/this.scale.x) * speed.y *.05;
  }
}
