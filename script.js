"use strict";

let W, H;
let points;
window.onload = function() {
  let cnv = document.getElementById("cnv");
  let ctx = cnv.getContext("2d");
  function init() {
    W = window.innerWidth;
    H = window.innerHeight;
    cnv.width = W;
    cnv.height = H;
    points = [];
  }
  init();
  window.onresize = init;

  function Origin(x, y) {
    this.l = Math.random() * 10 + 5;
    this.x = x - this.l / 2;
    this.y = y - this.l / 2;
    this.v = 5;
    this.dx = 0;
    this.smthng = Math.round(Math.random());
    this.color = `hsl(${Math.floor(Math.random() * 360)}deg, 100%, ${50 +
      Math.floor(Math.random() * 50)}%)`;
    this.draw = function() {
      ctx.fillStyle = this.color;
      if (this.smthng) {
        ctx.fillRect(this.x - this.dx, this.y, this.l, this.l);
        ctx.fillRect(this.x + this.dx, this.y, this.l, this.l);
      } else {
        ctx.fillRect(this.x, this.y - this.dx, this.l, this.l);
        ctx.fillRect(this.x, this.y + this.dx, this.l, this.l);
      }
      this.dx += this.v;
    };
  }

  function form(x, y) {
    let point = new Origin(x, y);
    points.push(point);
  }

  function clear() {
    ctx.beginPath();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, W, H);
  }

  function rand() {
    form(Math.random() * W, Math.random() * H);
    let time = 200 + Math.random() * 200;
    setTimeout(rand, time);
  }

  rand();

  cnv.addEventListener("click", function(e) {
    let x = e.clientX;
    let y = e.clientY;
    form(x, y);
  });

  function animate() {
    clear();
    for (let p of points) {
      p.draw();
    }
    if (points.length) {
      if (points[0].dx > W && points[0].dx > H) {
        points.shift();
      }
    }
    window.requestAnimationFrame(animate);
  }
  animate();
};
