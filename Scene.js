// Hyejin Im, hyejin.im@tufts.edu

class Scene extends THREE.Object3D {
  constructor(xLimit, yLimit, maxMeteorsZ) {
    super();

    this.xLimit = xLimit;
    this.yLimit = yLimit;
    this.maxMeteorsZ = maxMeteorsZ;

    this.laika = new Laika();
    this.laika.scale.set(50,50,50);
    this.add(this.laika);

    this.stars = [];
    for (var i=0; i<50; i++) {
      var star = this.createStar();
      star.position.x = getRandomValue(-this.xLimit,this.xLimit);
      star.position.y = getRandomValue(-this.yLimit,this.yLimit);
      star.position.z = -100;

      this.stars.push(star);
      this.add(star);
    }

    this.flyingMeteors = [];
    this.waitingMeteors = [];
    setInterval(this.flyMeteor.bind(this), 200); // launch a new meteor every 200ms

    this.friends = [];
    for (var i=0; i<2; i++) {
      var friend = new Friend(getRandomColor(), getRandomColor(), this.xLimit-400, this.yLimit-400);
      // set the friend position randomly and give it a random scale
      friend.position.x = getRandomValue(-this.xLimit,this.xLimit);
      friend.position.y = getRandomValue(-this.yLimit,this.yLimit);
      friend.position.z = -100;

      var s = 10 + 30*Math.random();
      friend.scale.set(s, s, s);
      this.friends.push(friend);
      this.add(friend);
    }
  }

  flyMeteor(){
    var meteor = this.getMeteor();
    // set the particle position randomly but keep it out of the field of view, and give it a random scale
    meteor.position.x = this.xLimit;
    meteor.position.y = -this.yLimit + Math.random()*this.yLimit*2;
    meteor.position.z = Math.random()*this.maxMeteorsZ;
    var s = .1 + Math.random();
    meteor.scale.set(s,s,s);

    this.flyingMeteors.push(meteor);
   	this.add(meteor);
  }

  createStar() {
    return new Star(getRandomValue(1, 5), 0xFFFF8D);
  }

  createMeteor(){
    var type;
    return new Meteor("Sphere", (20 + Math.random()*30), getRandomColor());
  }

  // depending if there is particles stored in the waintingMeteors array, get one from there or create a new one
  getMeteor(){
    if (this.waitingMeteors.length) {
      return this.waitingMeteors.pop();
    } else {
      return this.createMeteor();
    }
  }
  /*
   * Receive timer tick, pass it to objects that need it
   */
  tick() {
    for (var i=0; i<this.flyingMeteors.length; i++) {
      var meteor = this.flyingMeteors[i];
      meteor.tick();
      if (meteor.position.x < -this.xLimit - 80){ // check if the particle is out of the field of view
        this.remove(meteor);
        this.waitingMeteors.push(this.flyingMeteors.splice(i,1)[0]); // recycle the particle
        i--;
      }
    }
    for (var star of this.stars) {
      star.tick();
    }
    for (var meteor of this.flyingMeteors) {
      meteor.tick();
    }
    for (var friend of this.friends) {
      friend.tick();
    }
    // Laika update
    this.laika.tick();

    render();
  }
}
