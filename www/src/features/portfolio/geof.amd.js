define([
  'jquery',
  'underscore',
  'lib/peels.amd/index',
  'lib/warmth.amd/index',
  'lib/three.amd/three',
  'lib/one-color',
  'moment'
], function(
  $, _, Sphere, ThermalModel, THREE, color, moment
){

  var sphereGeometry = function(Sphere, opts){

    var vfc = Sphere.toCG(opts);

    var geometry = new THREE.Geometry();

    _.each(vfc.vertices, function(vertex){
      geometry.vertices.push(
        new THREE.Vector3(vertex.x, vertex.y, vertex.z)
      );
    });

    _.each(vfc.faces, function(face, fi){
      var triangle = new THREE.Face3(face[0], face[1], face[2]);
      triangle.vertexColors[0] = vfc.colors[face[0]];
      triangle.vertexColors[1] = vfc.colors[face[1]];
      triangle.vertexColors[2] = vfc.colors[face[2]];
      geometry.faces[fi] = triangle;
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    Sphere.bindGeometry(geometry, opts.colorFn);

    return geometry;

  };

  function GEOFCanvas(){

    var π = Math.PI,
      self = this;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 33, 1, 0.1, 1000 );

    camera.position.z = 5;

    // Lighting

    scene.add( new THREE.AmbientLight( 0x97867C ) );
    scene.add( new THREE.HemisphereLight( 0xC6C2B6, 0x3A403B, .85 ) );

    // Renderer

    var pixelRatio = 1;

    if(
      matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ||
      matchMedia('(min-device-pixel-ratio: 2)').matches ||
      matchMedia('(-ms-min-device-pixel-ratio: 2)').matches ||
      matchMedia('(-moz-min-device-pixel-ratio: 2)').matches
    ){
      pixelRatio = 2;
    }

    this.renderer = null;

    var renderSize = function(){
      var r = self.el.parentElement.getBoundingClientRect(),
        w = r.width,
        h = r.height;

      self.renderer.setSize( w * pixelRatio, h * pixelRatio );

      camera.aspect = (w/h);
      camera.updateProjectionMatrix();

    };

    // Sphere

    var d = 8,
        s = new Sphere({divisions: d}),
        tm = new ThermalModel({ fields: 2 * d * d * 5 + 2 });

    tm.setTime(moment());

    var ce = color('#000000'),
        cp = color('#EBf6f7'),
        cb = new THREE.Color('#000000');

    var colorBlend = function(blend){
      var red = ce.red() * (1 - blend) + cp.red() * blend,
        green = ce.green() * (1 - blend) + cp.green() * blend,
        blue = ce.blue() * (1 - blend) + cp.blue() * blend;
      return new THREE.Color(red, green, blue);
    };

    var colorFn = function(data, pos, sxy){
      var thermal = tm.get(pos);
      if(thermal.k > 0){
        return colorBlend(thermal.k);
      }else{
        return cb;
      }
    };

    var geometry = sphereGeometry(s, { colorFn: colorFn });

    var material = new THREE.MeshPhongMaterial({
      shading: THREE.SmoothShading,
      vertexColors: THREE.VertexColors
    });

    var sphere = new THREE.Mesh( geometry, material );
    sphere.rotation.x -= π/2;
    scene.add( sphere );

    var continueRender = false,
      cycle = 6e3;

    var render = function () {
      sphere.rotation.z = 2 * π * (Date.now() % cycle) / cycle;
      self.renderer.render(scene, camera);
      if(continueRender) requestAnimationFrame(function(){
        render.call(self, arguments);
      });
    };

    this.bind = function(canvas){

      self.el = canvas;

      self.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas
      });

      window.addEventListener('resize', _.debounce(renderSize, 200));
      renderSize();

    };

    this.start = function(){
      console.log('GEOF Started!');
      renderSize();
      continueRender = true;
      render();
    };

    this.pause = function(){
      console.log('GEOF Paused!');
      continueRender = false;
    }

  }

  return new GEOFCanvas();

});