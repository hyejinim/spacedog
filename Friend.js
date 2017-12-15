// Hyejin Im, hyejin.im@tufts.edu

class Friend extends Dog {
    constructor(bodyColor, earsntailColor, xLimit, yLimit) {
      super(bodyColor, earsntailColor);
      this.dx = getRandomValue(-xLimit,xLimit);
      this.dy = getRandomValue(-yLimit,yLimit);
      this.sx = getRandomValue(10,50);
    }
    /*
     * Received whenever timer tick's,
     * we should update everything we need in scene graph,
     * redraw is automatic.
     */
    tick() {
      super.tick();

      // Update friend' position, rotation
      // Make the friend swing according to the mouse direction
      // currentValue += (targetValue - currentValue) / smoothing
      this.rotation.z += ((-(speed.y)/50)-this.rotation.z)/(smoothing+this.sx);
      this.rotation.x += ((-(speed.y)/50)-this.rotation.x)/(smoothing+this.sx);
      this.rotation.y += ((-(speed.y)/50 + 60*DEG2RAD )-this.rotation.y)/(smoothing+this.sx);

      // Make the Friend move according to the mouse direction
      this.position.x += (((mousePos.x - windowHalfX + this.dx)) - this.position.x) / (smoothing+this.sx);
      this.position.y += ((-(speed.y)*10 + this.dy)-this.position.y)/(smoothing+this.sx);
    }
  }
