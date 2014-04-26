// start slingin' some d3 here.

var gameOptions = {
  'height': 500,
  'width': 800,
  'nEnemies' : 30,
  'padding' : 20
};

var Player = function(gameOptions){
  this.path = "m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z";
  this.fill = '#ff6600';
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.r = 10;
  this.gameOptions = gameOptions;
  this.el = d3.selectAll('circle.player');

};

Player.prototype.render = function(gameBoard){
  this.el = gameBoard.append('svg:circle')
            .attr('class','player')
            // .attr('d', this.path)
            .attr('cx', this.x)
            .attr('cy', this.y)
            .attr('r', this.r)
            .attr('fill', this.fill);
            //.attr('fill', this.fill);
            //
  this.transform(this.gameOptions.width/2, this.gameOptions.width/2);
  this.setupDragging();
};

Player.prototype.transform = function(x, y) {
  // console.log(this.el);
  x = x || this.x;
  y = y || this.y;
  this.setX(x);
  this.setY(y);


  this.el.attr('cx', this.gameOptions.width/2)
         .attr('cy', this.gameOptions.height/2);
};

Player.prototype.getX = function(){
  return this.x;
};

Player.prototype.getY = function(){
  return this.y;
};

Player.prototype.setX = function(x){
  var minX = this.gameOptions.padding;
  var maxX = this.gameOptions.width - this.gameOptions.padding;

  if (this.x >= minX && this.x <= maxX) {
    this.x = x;
  }
};

Player.prototype.setY = function(y){
  var minY = this.gameOptions.padding;
  var maxY = this.gameOptions.height - this.gameOptions.padding;

  if (this.y >= minY && this.x <= maxY) {
    this.y = y;
  }
};

Player.prototype.move = function(dx, dy) {
  // console.log(dx, dy);

  this.setX(this.getX() + dx);
  this.setY(this.getY() + dy);
  this.el.attr('transform', 'translate('+this.getX()+', '+this.getY()+')');
};

Player.prototype.setupDragging = function() {


  // var drag = d3.behavior.drag().on('drag', function() {
  //   console.log(this);
  //   this.setX(this.getX() + d3.event.dx);
  //   this.setY(this.getY() + d3.event.dy);
  //   // this.move(d3.event.dx, d3.event.dy);
  // });

  // this.el.call();
};

var path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';

var gameBoard = d3.select('body').append('svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);
                  // .style('background-color', 'white');

var createEnemies = function() {
  return _.map(_.range(0, gameOptions.nEnemies), function(i) {
    return {
      'id': i,
      'x': Math.random() * gameOptions.width,
      'y': Math.random() * gameOptions.height
    };
  });
};

var render = function(enemyData){
  var enemies = gameBoard.selectAll("circle.enemy")
                .data(enemyData, function(d) {return d.id});

  enemies.transition().duration(750)
         .attr('cx', function(d){return d.x})
         .attr('cy', function(d){return d.y});

  enemies.enter()
         .append('svg:circle')
         .attr('class', "enemy")
         .attr('cx', function(d){return d.x})
         .attr('cy', function(d){return d.y})
         .attr('r', 10);

 enemies.exit().remove();
};

var player = new Player(gameOptions);
player.render(gameBoard);

setInterval(function() {
  var enemyData = createEnemies();
  render(enemyData);
}, 1000);


