var wrap = function(t, f) {
    return function() {
        f.apply(t, arguments);
    }
}

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
        
        this.run = wrap(this, this.run);
    }
    
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
    Love.prototype.run = function() {
        this.load.call();
        console.log("test");
    };
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
    function define(self) {
         self.arc = function(mode, x, y, rad, a1, a2, segments) {
            var ctx = self.ctx;
            ctx.save();
            if(mode == "fill") {
                
            }
        };

        self.circle = function(mode, x, y, rad, segments) {
        };

        self.clear = function(r, g, b, a) {
            var c, ctx = self.ctx;
            if(r == null) {
                c = self.canvas.backgroundColor;
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

        self.draw = function() {
        };
        
        self.line = function(x1, y1, x2, y2) {
        };
        
        self.point = function(x, y) {
        };
        
        self.polygon = function(mode, verts) {
        };
        
        self.present =  function() { /*Uneeded in JS*/ };
        
        self.print = function(text, x, y, r, sx, sy, ox, oy, kx, ky) {
        };
        
        self.printf = function(text, x, y, limit, align, r, sx, sy, ox, oy, kx, ky) {
        };
        
        self.rectangle = function(mode, x, y, w, h) {
        };

        //State
        self.setColor = function(r, g, b, a) {
            var c, ctx = self.ctx;
            if(typeof r == "number") {
                c = new Love.Color(r, g, b, a);
            } else {
                c = new Love.Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
            }
            ctx.fillStyle = c.as_string;
            ctx.strokeStyle = c.as_string;
            ctx.globalAlpha = c.a / 255;
        };

        self.setBackgroundColor = function(r, g, b, a) {
            self.canvas.setBackgroundColor(r, g, b, a);
        };
    }

    function Graphics(width, height) {
        define(this);

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
    
    return Graphics;
})();

Love.Graphics.Canvas2D = (function() {
    function define(self) {
        self.setBackgroundColor = function(r, g, b, a) {
            var c;
            if(typeof r == "number") {
                c = new Love.Color(r, g, b, a);
            } else {
                c = new Love.Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
            }
            self.backgroundColor = c;
        };

        self.setDimensions = function(width, height) {
            self.setWidth(width);
            self.setHeight(height);
        };

        self.setWidth = function(width) {
            self.width = width;
            self.elem.setAttribute('width', width);
        };

        self.setHeight = function(height) {
            self.height = height;
            self.elem.setAttribute('height', height);
        };
    }

    function Canvas2D(width, height, elem) {
        define(this);

        this.elem = elem || document.createElement("canvas");
        //Hide canvas by default for off-screen rendering
        this.elem.setAttribute('display', 'none');
        this.setDimensions(width, height);

        this.ctx = elem.getContext("2d");
        this.setBackgroundColor(0, 0, 0, 0);
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