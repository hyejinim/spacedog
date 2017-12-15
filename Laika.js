// Hyejin Im, hyejin.im@tufts.edu

class Laika extends Dog {
    constructor() {
      super(0xffd9b3, 0x0c0c4c);
    }
    /*
     * Received whenever timer tick's,
     * we should update everything we need in scene graph,
     * redraw is automatic.
     */
    tick() {
      super.tick();

      // Update Laika's position, rotation
      // Make the Laika swing according to the mouse direction
      // currentValue += (targetValue - currentValue) / smoothing
      this.rotation.z += ((-speed.y/50)-this.rotation.z)/smoothing;
      this.rotation.x += ((-speed.y/50)-this.rotation.x)/smoothing;
      this.rotation.y += ((-speed.y/50 + 60*DEG2RAD )-this.rotation.y)/smoothing;

      // Make the Laika move according to the mouse direction
      this.position.x += (((mousePos.x - windowHalfX)) - this.position.x) / smoothing;
      this.position.y += ((-speed.y*10)-this.position.y)/smoothing;
    }
  }
