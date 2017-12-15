// Hyejin Im, hyejin.im@tufts.edu

class Dog extends THREE.Object3D {
    constructor(bodyColor, earsntailColor) {
      super();

      /*
       * Initialize some Materials we will be using
       */
      var earsntail = new THREE.MeshLambertMaterial({
        color: earsntailColor //0x0c0c4c
      });
      var eyes = new THREE.MeshPhongMaterial({
        color: 0x000000,
        shininess: 100
      });
      var pupils = new THREE.MeshPhongMaterial({
        color: 0xC6EADD,
        shininess: 100
      });
      var nose = new THREE.MeshPhongMaterial({
        color: 0x000000,
        shininess: 80
      });
      var body = new THREE.MeshLambertMaterial({
        color: bodyColor //0xffd9b3,
      });

      this.angleTail = 0;
      this.angleLeg = 0;

      /*
       * The body
       */
      var torso = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1, 3.5), body);
      torso.position.set(0, 0, 0);
      this.add(torso);

      /*
       * Tail
       */
      var tailTrans = new THREE.Object3D();
      tailTrans.position.set(0, 0.5, -1.5);
      // tailTrans.rotation.x = -5*DEG2RAD;
      this.add(tailTrans);

      this.tailMove = new THREE.Object3D()
      this.tailMove.userData = 1; // Our own data field
      tailTrans.add(this.tailMove);

      var tail = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.49), earsntail);
      // tail.position.set(0, 0, 0);
      this.tailMove.add(tail);

      /*
       * The foot
       */
      // Fore Foot
      var foreFootTrans = new THREE.Object3D();
      foreFootTrans.position.set(0, -0.3, 1.5);
      foreFootTrans.rotation.x = -60*DEG2RAD;
      this.add(foreFootTrans);

      this.foreMove = new THREE.Object3D()
      this.foreMove.userData = 1; // Our own data field
      foreFootTrans.add(this.foreMove);

      var foreLeft = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.3, 0.5), body);
      foreLeft.position.set(0.5, 0, 0);
      this.foreMove.add(foreLeft);

      var foreRight = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.3, 0.5), body);
      foreRight.position.set(-0.5, 0, 0);
      this.foreMove.add(foreRight);

      // Hind foot
      var hindFootTrans = new THREE.Object3D();
      hindFootTrans.position.set(0, -0.3, -1.5);
      hindFootTrans.rotation.x = 60*DEG2RAD;
      this.add(hindFootTrans);

      this.hindMove = new THREE.Object3D();
      this.hindMove.userData = -1;
      hindFootTrans.add (this.hindMove);

      var hindLeft = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.3, 0.5), body);
      hindLeft.position.set(0.5, 0, 0);
      this.hindMove.add(hindLeft);

      var hindRight = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.3, 0.5), body);
      hindRight.position.set(-0.5, 0, 0);
      this.hindMove.add(hindRight);

      /*
       * Head
       */
      var headTrans = new THREE.Object3D();
      headTrans.position.set(0, 1.25, 2);
      this.add(headTrans);

      this.headMove = new THREE.Object3D();
      this.headMove.userData = -1;
      headTrans.add(this.headMove);

      var head = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 2.5), body);
      this.headMove.add(head);

      /*
       * Helmet
       */
      // I referenced this link: https://codepen.io/seanwasere/pen/BjMeqO
      // for making transparent material
      var geometry = new THREE.SphereGeometry( 1.9, 32, 32 );
      var material = new THREE.MeshPhongMaterial( {
        shininess: 100,
        color: 0xffffff,
        specular: 0xffffff,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      } );

      var helmet = new THREE.Mesh( geometry, material );
      helmet.position.set(0, 0.5, 0);
      helmet.castShadow = true;
      helmet.receiveShadow = true;
      this.headMove.add(helmet);

      /*
       * Ear
       */
      // Left ear
      var leftEar = new Ear(earsntail);
      leftEar.position.set(-1 / 2, 1, -1);
      this.headMove.add(leftEar);

      // Right ear
      var rightEar = new Ear(earsntail);
      rightEar.position.set(1 / 2, 1, -1);
      this.headMove.add(rightEar);

      /*
       * Eye
       */
      // Left eye
      var leftEye = new Eye(eyes);
      leftEye.position.set(-0.8, 0.3, -0.4);
      this.headMove.add(leftEye);

      // Right eye
      var rightEye = new Eye(eyes);
      rightEye.position.set(0.8, 0.3, -0.4);
      this.headMove.add(rightEye);

      /*
       * Nose
       */
      var nose = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.3), nose);
      nose.position.set(0, 0, 1.4);
      this.headMove.add(nose);
    }

    /*
     * Received whenever timer tick's,
     * we should update everything we need in scene graph,
     * redraw is automatic.
     */
    tick() {
      // Tail animation
      this.angleTail += speed.x/300;
      this.tailMove.rotation.z = Math.cos(this.angleTail)*0.5;

      // Leg animation
      this.angleLeg += speed.x/500;
      this.foreMove.rotation.x = Math.cos(this.angleLeg)*0.5;
      this.hindMove.rotation.x = Math.cos(Math.PI + this.angleLeg)*0.5;

      // Head animation
      var a = this.headMove.rotation.y;

      a += (this.headMove.userData * 2 * 25 * DEG2RAD) / (2.5 * 60);
      if (Math.abs(a) > 25 *DEG2RAD) {
        this.headMove.userData *= -1;
      }
      this.headMove.rotation.set(0, a, 0);
    }
  }

  class Ear extends THREE.Object3D {
    constructor(earsntail, headMove) {
      super();

      var ear = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), earsntail);
      ear.position.set(0, 0, 0);
      this.add(ear);
    }
  }

  class Eye extends THREE.Object3D {
    constructor(eyes, headMove) {
      super();

      var pupils = new THREE.MeshPhongMaterial({
        color: 0xC6EADD,
        shininess: 100
      });

      // Eye
      var eye = new THREE.Mesh(new THREE.BoxGeometry(0.1, .5, .5), eyes);
      eye.position.set(0, 0, 0);
      this.add(eye);

      // Pupil
      var pupil = new THREE.Mesh(new THREE.BoxGeometry(0.05, .2, .2), pupils);
      pupil.position.set(-0.05, 0.1, -0.1);
      this.add(pupil);
    }
  }
