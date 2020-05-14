function Particle(x,y,r) {

   // Defining the particle's options
    var options = {
      isStatic: false
    }

    this.body = Bodies.circle(x,y,r,options);
    this.r = r;

    World.add(world,this.body);

    this.display = function(){
        var pos = this.body.position;
        ellipseMode(CENTER);
        fill("red");
        stroke("Yellow");
        strokeWeight(3);
        ellipse(pos.x,pos.y,this.r * 2);
    }
}