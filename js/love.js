Love = (function() {
    function Love(elem, conf) {
        elem = elem || null;
        Love.element = elem;

        this.audio = new Love.Audio();
        this.event = new Love.Event();
        this.filesystem = new Love.FileSystem();
        this.font = new Love.Font();
        this.graphics = new Love.Graphics(conf.width, conf.height);
        this.joystick = new Love.Joystick();
        this.keyboard = new Love.Keyboard();
        this.math = new Love.Math();
        this.mouse = new Love.Mouse();
        this.sound = new Love.Sound();
        this.system = new Love.System();
        this.timer = new Love.Timer();
        this.window = new Love.Window();
    }

    var _defaultRunImpl = function() {

    };
    
    Love.prototype.load = function() { };
    Love.prototype.update = function() { };
    Love.prototype.draw = function() { };
    Love.prototype.quit = function() { };
    Love.prototype.keypressed = function() { };
    Love.prototype.keyreleased = function() { };
    Love.prototype.mousefocus = function() { };
    Love.prototype.mousemoved = function() { };
    Love.prototype.mousepressed = function() { };
    Love.prototype.resize = function() { };
    Love.prototype.run = _defaultRunImpl;
    Love.prototype.visible = function() { };
    
    return Love;
})();

Love.Audio = (function() {
    function Audio() {

    }

    return Audio;
})();

Love.Color = (function() {
    function Color(r, g, b, a) {
        if (typeof r == "string") {
            //TODO write color parser
        } else {
            this.r = r || 0;
            this.g = g || 0;
            this.b = b || 0;
            this.a = a || 255;
            this.as_string = "#" + (r << 16 | g << 8 | b).toString(16);
        }
    }

    return Color;
})();

Love.Event = (function() {
    function Event() {

    }

    return Event;
})();

Love.FileSystem = (function() {
    function FileSystem() {

    }

    return FileSystem;
})();

Love.Font = (function() {
    function Font() {

    }

    return Font;
})();

Love.Graphics = (function() {
    function Graphics(width, height) {
        if(Love.element == null) {
            this.canvas = new Love.Graphics.Canvas2D(width, height);
            document.body.appendChild(this.canvas.elem);
            Love.element = this.canvas.elem;
        }
        else {
            this.canvas = new Love.Graphics.Canvas2D(width, height, Love.element);
        }
        this.canvas.elem.setAttribute('display', 'inheirit');

        this.mainCanvas = this.canvas;

        this.setColor(255, 255, 255);
        this.setBackgroundColor(0, 0, 0);
    }

    //Drawing
    Graphics.prototype.arc = function(mode, x, y, rad, a1, a2, segments) {
        this.canvas.arc(mode, x, y, rad, a1, a2, segments);
    };

    Graphics.prototype.circle = function(mode, x, y, rad, segments) {
        this.canvas.circle(mode, x, y, rad, segments);
    };

    Graphics.prototype.clear = function(r, g, b, a) {
        this.canvas.clear(r, g, b, a);
    };

    Graphics.prototype.draw = function() {
        this.canvas.draw.call(arguments);
    };

    //State
    Graphics.prototype.setColor = function(r, g, b, a) {
        this.canvas.setColor(r, g, b, a);
    };

    Graphics.prototype.setBackgroundColor = function(r, g, b, a) {
        this.canvas.setBackgroundColor(r, g, b, a);
    };
    
    return Graphics;
})();

Love.Graphics.Canvas2D = (function() {
    function Canvas2D(width, height, elem) {
        elem = elem || document.createElement("canvas");
        elem.setAttribute('display', 'none');
        this.setDimensions(width, height);

        this.ctx = elem.getContext("2d");
        this.clear(0, 0, 0, 255);
    }

    Canvas2D.prototype.clear = function(r, g, b, a) {
        var c;
        if(typeof r == "number") {
            c = new Love.Color(r, g, b, a);
        } else {
            c = new Love.Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
        }
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = color.as_string;
        this.ctx.globalAlpha = a / 255;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.restore();
    };

    Canvas2D.prototype.draw = function(drawable, quad) {
        console.log(arguments);
    };

    Canvas2D.prototype.setColor = function(r, g, b, a) {
        var c;
        if(typeof r == "number") {
            c = new Love.Color(r, g, b, a);
        } else {
            c = new Love.Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
        }
        this.ctx.fillStyle = c.as_string;
        this.ctx.strokeStyle = c.as_string;
        this.ctx.globalAlpha = c.a / 255;
    };

    Canvas2D.prototype.setDimensions = function(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };

    Canvas2D.prototype.setWidth = function(width) {
        this.width = width;
        this.elem.setAttribute('width', width);
    };

    Canvas2D.prototype.setHeight = function(height) {
        this.height = height;
        this.elem.setAttribute('height', height);
    }

    return Canvas2D;
})();

Love.Joystick = (function() {
    function Joystick() {

    }

    return Joystick
})();

Love.Keyboard = (function() {
    function Keyboard() {

    }

    return Keyboard;
})();

Love.Math = (function() {
    function LMath() {

    }

    return LMath;
})();

Love.Mouse = (function() {
    function Mouse() {

    }function LMath() {

    }

    return Mouse;
})();

//TODO: Impl this.... maybe
//Love.Physics

Love.Sound = (function() {
    function Sound() {

    }

    return Sound;
})();

Love.System = (function() {
    function System() {

    }

    return System;
})();

Love.Timer = (function() {
    function Timer() {

    }

    return Timer;
})();

Love.Window = (function() {
    function Window() {

    }

    return Window;
})();

if(module) {
    module.exports = Love;
}