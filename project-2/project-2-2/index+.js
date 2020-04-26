window.onload=function(){
  var position = { x: 0, y: window.innerHeight / 2 };
  var counter = 0;
  var letters = 'More precisely, tool and human produce each other. The artifacts that prosthetically expand thought and reach are what make the human human. As Bernard Stiegler, reading the work of the influential paleoanthropologist Andre Leroi-Gourhan, puts it: "The prosthesis is not the mere extension of the human body; it is the constitution of this body qua human." Leroi-Gourhan echoed the nineteenth­century idea that the human species was unique in evolving organically through its technological extensions: "The whole of our evolution has been oriented toward placing outside ourselves what in the rest of the animal world is achieved inside by species adaption." The body itself is only human by virtue of technology: "the human hand is human because of what it makes, not of what it is." What is human is the gesture of externalization, which is not from some preexisting interior, like thoughts in the brain, but is a gesture that constitutes a new sense of interior. The human is always being invented as such by the gestures that transform it. Brain, body, and artifact cannot be separated. Thinking only occurs in the intermingling between them. Artifacts themselves are thoughts that potentially also trigger new modes of thought. / The human brain is therefore an effect of new tools rather than the generator of new tools. Tools are an opportunity for it rather than an accomplishment of it. The intentionality and anticipation of effects that is distinctly human arises from the activity of making itself. Human intentions are provoked by making tools rather than executed by them. And what makes a tool a tool? Strictly speaking, a tool is not produced to carry out a defined utilitarian task. Tools are born as challenges to existing concepts of utility. They open up new understandings of what could be useful. Utility is not a given unambiguous need. Ambiguity about utility is what drives new forms of utility. / Some paleoanthropologists argue that the main driver of human accomplishment is simply a uniquely human capacity for variability, an impulse to generate a multiplicity of ways to do things in reaction to different circumstances. This variability itself can be understood as design capacity. When other species have figured out a way to do something, they keep repeating it forever until changes in the context reinforce a different direction. Humans continuously imagine different ways even in the same context, to the point of malfunction. The human is the only species that has tools that don\'t work, which is paradoxically the origin of its intelligence. ';

  var canvas;
  var context;
  var mouse = { x: 0, y: 0, down: false }

  // 到结尾标志变量
  var isEnd = false

  function init() {
    // 获取画布
    canvas = document.getElementById('canvas');

    // 获取canvas上下文环境
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 绑定canvas事件
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mouseout', mouseUp, false);

    window.onresize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  function mouseMove(ev) {
    var oEvent = event || ev;
    mouse.x = oEvent.pageX;
    mouse.y = oEvent.pageY;
    !isEnd && draw();
    // draw();
  }

  function draw() {
    if (mouse.down) {
      var d = distance(position, mouse);
      var fontSize = 14;
      var letter = letters[counter];
      var stepSize = textWidth(letter, 20);

      if (d > stepSize) {
        // 鼠标旋转弧度值
        var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

        context.font = fontSize + 'px Courier';

        context.save();
        context.translate(position.x + 1, position.y);
        context.rotate(angle);
        context.fillText(letter, 0, 0);
        context.restore();

        counter++;

        // 到结尾从头开始
        // if (counter > letters.length - 1) {
        //   counter = 0;
        // }

        // 到结尾不从头开始，直接结束，用下面这个
        if (counter > letters.length - 1) {
          isEnd = true
        }

        position.x = position.x + Math.cos(angle) * stepSize + 2;
        position.y = position.y + Math.sin(angle) * stepSize;
      }
    }
  }

  function distance(pt, pt2) {
    var xs = 0;
    var ys = 0;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }

  function mouseDown(ev) {
    var oEvent = ev || event
    mouse.down = true;
    position.x = oEvent.pageX;
    position.y = oEvent.pageY;
  }

  function mouseUp() {
    mouse.down = false;
  }


  // 设置文字大小
  function textWidth(string, size) {
    context.font = size + 'px Courier';
    if (context.fillText) {
      return context.measureText(string).width;
    } else if (context.mozDrawText) {
      return context.mozMeasureText(string);
    }
  }

  init();
}
