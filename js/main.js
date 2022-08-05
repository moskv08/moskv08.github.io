/*  Info
    Entry point to the Javascript side of the application. 
    Has access to the DOM and contains the SceneManager.

    1.  Create the SceneManager, while passing a canvas to it 
        (so that SceneManager won’t have to meddle with the DOM).
    2.  Attach listeners to the DOM events we care about (such as windowresize or mousemove).
    3.  Start the render loop, by calling requestAnimationFrame().
*/
import SceneManager from "./SceneManager.js";

const canvas = document.getElementById('canvas');
const sceneManager = new SceneManager(canvas);

bindEventListener();
render();

function bindEventListener(){
  // window.onresize = resizeCanvas
  // resizeCanvas();
  addEventListener('resize', resizeCanvas)
}

function resizeCanvas(){

  // canvas.style.width = '100%';
  // canvas.style.height = '100%';

  // canvas.width = canvas.offsetWidth;
  // canvas.height = canvas.offsetHeight;

  sceneManager.onWindowResize();
}

function render(){
  requestAnimationFrame(render);
  sceneManager.update();
}