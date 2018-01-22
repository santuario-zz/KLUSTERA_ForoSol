function Item(_x, _y, _r) {
  /*
   *****************************************
   *****************************************
   * VARIABLES
   *****************************************
   *****************************************
   */

  this.position = createVector(_x, _y);
  this.r = _r;
  this.origposition = createVector(_x, _y);
  this.velocity = createVector(0, 0);
  this.holding = false;
  this.targetPosition = createVector(0, 0);


  /*
   *****************************************
   *****************************************
   * LYFE CYCLE METHODS
   *****************************************
   *****************************************
   */

  this.inside = function(_mx, _my) {
    var a = this.position.x - _mx;
    var b = this.position.y - _my;
    return sqrt(pow(a, 2) + pow(b, 2)) < this.r / 2;
  }

  this.display = function() {
    noStroke();
    fill(150, 220);


    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }


  this.update = function() {
    // print(this.targetPosition.x + ", " + this.targetPosition.y);

    this.position.add(this.velocity);
    this.velocity.mult(0.91);


    if (this.position.x < this.origposition.x - 1.5 || this.position.x > this.origposition.x + 1.5 || this.position.y < this.origposition.y - 1.5 || this.position.y > this.origposition.y + 1.5) {
      var normal = p5.Vector.sub(createVector(this.targetPosition.x, this.targetPosition.y), this.position);
      normal.normalize();
      this.velocity.add(normal);
    } else {
      this.position.set(this.origposition.x, this.origposition.y);
    }

  }


  this.checkBoundaryCollision = function() {
    if (this.position.x > windowWidth - this.r) {
      this.position.x = windowWidth - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    } else if (this.position.y > windowHeight - this.r) {
      this.position.y = windowHeight - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }

  this.checkCollision = function(_other) {
    bVect = p5.Vector.sub(_other.position, this.position);
    if (bVect.mag() < this.r + _other.r) {
      bVect.normalize();
      bVect.mult(2);
      this.velocity.sub(bVect);
    }
  }



}