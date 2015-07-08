Love = (function() {
    function Love(elem, conf) {
        elem = elem || null;
        Love.element = elem;

        this.audio      = new Love.Audio();
        this.event      = new Love.Event();
        this.filesystem = new Love.FileSystem();
        this.font       = new Love.Font();
        this.graphics   = new Love.Graphics(conf.width, conf.height);
        this.joystick   = new Love.Joystick();
        this.keyboard   = new Love.Keyboard();
        this.math       = new Love.Math();
        this.mouse      = new Love.Mouse();
        this.sound      = new Love.Sound();
        this.system     = new Love.System();
        this.timer      = new Love.Timer();
        this.window     = new Love.Window();

        this.run = (function(_this) { return function() { _defaultRunImpl(_this); } })(this);
    }

    var _defaultRunImpl = function(_this) {
        _this.load.call();
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
        if (typeof r != "number") {
            this.r = r.getMember(1) || 0;
            this.g = r.getMember(2) || 0;
            this.b = r.getMember(3) || 0;
            this.a = r.getMember(4) || 255;
        } else {
            this.r = r || 0;
            this.g = g || 0;
            this.b = b || 0;
            this.a = a || 255;
        }
        this.as_string = "#" + (this.r << 16 | this.g << 8 | this.b).toString(16);
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
        //Show the canvas that will be on screen
        this.canvas.elem.setAttribute('display', 'inheirit');

        this.mainCanvas = this.canvas;
        this.ctx = this.canvas.ctx;

        this.setColor(255, 255, 255);
        this.setBackgroundColor(0, 0, 0);
    }

    //Drawing
    Graphics.prototype.arc = function(mode, x, y, rad, a1, a2, segments) {
        var ctx = this.ctx;
        ctx.save();
        if(mode == "fill") {
            
        }

    };

    Graphics.prototype.circle = function(mode, x, y, rad, segments) {
    };

    Graphics.prototype.clear = function(r, g, b, a) {
        var c, ctx = this.ctx;
        if(r == null) {
            c = this.canvas.backgroundColor;
        } else {
            if(typeof r == "number") {
                c = new Love.Color(r, g, b, a);
            } else {
                c = new Love.Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
            }
        }
        if(c.a == 0) { return; }
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = c.as_string;
        ctx.globalAlpha = c.a / 255;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    };

    Graphics.prototype.draw = function() {
    };
    
    Graphics.prototype.line = function(x1, y1, x2, y2) {
    };
    
    Graphics.prototype.point = function(x, y) {
    };
    
    Graphics.prototype.polygon = function(mode, verts) {
    };
    
    Graphics.prototype.present = function() { /*Unneeded in JS*/ };
    
    Graphics.prototype.print = function(text, x, y, r, sx, sy, ox, oy, kx, ky) {
    };
    
    Graphics.prototype.printf = function(text, x, y, limit, align, r, sx, sy, ox, oy, kx, ky) {
    };
    
    Graphics.prototype.rectangle = function(mode, x, y, w, h) {
    };

    //State
    Graphics.prototype.setColor = function(r, g, b, a) {
        var c, ctx = this.ctx;
        if(typeof r == "number") {
            c = new Love.Color(r, g, b, a);
        } else {
            c = new Love.Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
        }
        ctx.fillStyle = c.as_string;
        ctx.strokeStyle = c.as_string;
        ctx.globalAlpha = c.a / 255;
    };

    Graphics.prototype.setBackgroundColor = function(r, g, b, a) {
        this.canvas.setBackgroundColor(r, g, b, a);
    };
    
    return Graphics;
})();

Love.Graphics.Canvas2D = (function() {
    function Canvas2D(width, height, elem) {
        this.elem = elem || document.createElement("canvas");
        //Hide canvas by default for off-screen rendering
        this.elem.setAttribute('display', 'none');
        this.setDimensions(width, height);

        this.ctx = elem.getContext("2d");
        this.setBackgroundColor(0, 0, 0, 0);
    }

    Canvas2D.prototype.setBackgroundColor = function(r, g, b, a) {
        var c;
        if(typeof r == "number") {
            c = new Love.Color(r, g, b, a);
        } else {
            c = new Love.Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
        }
        this.backgroundColor = c;
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

    return Joystick;
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
        window.requestAnimationFrame = window.requestAnimationFrame || function(c) {
            setTimeout(callback, 60/1000);
        };
    }

    Timer.prototype.nextFrame = function(callback) {
        window.requestAnimationFrame(callback);
    };

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