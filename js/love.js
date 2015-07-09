var wrap = function(t, f) {
    return function() {
        f.apply(t, arguments);
    }
};

var unimplemented = function(name) {
    console.warn("[", name, "] hasn't been implemented yet");  
};

Love = (function() {
    function Love(elem, conf) {
        elem = elem || null;
        Love.element = elem;
        
        
        this.graphics   = new Love.Graphics(conf.width, conf.height);
        this.window     = new Love.Window(this.graphics);
        this.audio      = new Love.Audio();
        this.event      = new Love.Event();
        this.filesystem = new Love.FileSystem();
        this.font       = new Love.Font();
        this.joystick   = new Love.Joystick();
        this.keyboard   = new Love.Keyboard();
        this.math       = new Love.Math();
        this.mouse      = new Love.Mouse();
        this.sound      = new Love.Sound();
        this.system     = new Love.System();
        this.timer      = new Love.Timer();
        
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
        this.timer.step(); // Step the timer so it doesn't count load time
        
        var i = 0, e;
        var gameloop = (function(self) {
            return function() {
                for(i = 0; i < self.event.queue.length; i++) {
                    e = self.event.queue[i];
                    self[e[0]].apply(null, e.slice(1, e.length));
                }
                self.event.clear();
                
                self.timer.step();
                self.update.call(null, self.timer.getDelta());
                
                self.graphics.origin()
                self.graphics.clear();
                self.draw.call();
                
                self.timer.nextFrame(gameloop);
            };
        })(this);
        
        this.timer.nextFrame(gameloop);
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
        //this.as_string = (this.r << 16 | this.g << 8 | this.b).toString(16);
        this.as_string = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }

    return Color;
})();

Love.Event = (function() {
    function Event() {
        define(this);
        this.queue = [];
    }

    function define(self) {
        self.clear = function() {
            self.queue = [];
        };

        self.push = function(eType, a1, a2, a3, a4) {
            var event = [eType, a1, a2, a3, a4];
            self.queue.push(event);
        };

        self.quit = function() {
            self.push("quit");
        };

        self.pump = function() { /* Uneeded In JS */ };

        self.poll = function() {
            unimplemented("love.event.poll");
        };

        self.wait = function() {
            unimplemented("love.event.wait");
        }
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
        this.canvas.elem.style.display = "block";

        this.__mainCanvas = this.canvas;
        this.ctx = this.canvas.ctx;
        this.__matrix = this.canvas.matrix;

        this.setColor(255, 255, 255);
        this.setBackgroundColor(0, 0, 0);
    }
    
    function define(self) {
         self.arc = function(mode, x, y, rad, a1, a2, segments) {
            segments = segments || 10;
            var ctx = self.ctx, interval, i, cx, cy;
            ctx.beginPath();
            if(mode == "fill") {
                ctx.moveTo(x, y);
            } else { 
                ctx.moveTo(x + Math.cos(a1) * rad, y + Math.sin(a1) * rad);
            } 
            interval = (a2 - a1) / segments;
            for(i = a1; i <= a2; i += interval) {
                cx = Math.cos(i) * rad + x;
                cy = Math.sin(i) * rad + y;
                ctx.lineTo(cx, cy);
            }
            if(mode == "fill") {
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.stroke();
            }
        };

        self.circle = function(mode, x, y, rad, segments) {
            if(rad < 0) return;
            self.arc(mode, x, y, rad, 0, Math.PI * 2, segments);
        };

        self.clear = function(r, g, b, a) {
            var c, ctx = self.ctx;
            if(r == null) {
                c = self.canvas.backgroundColor;
            } else {
                if(typeof r == "number") {
                    c = new Love.Color(r, g, b, a);
                } else {
                    c = new Love.Color(r);
                }
            }
            if(c.a == 0) { return; }
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = c.as_string;
            ctx.globalAlpha = c.a / 255;
            ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
            ctx.restore();
        };

        self.draw = function() {
        };
        
        self.line = function(x1, y1, x2, y2) {
            var ctx = self.ctx;
            ctx.beginPath();
            if(typeof x1 == "number") {
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            } else {
                ctx.moveTo(x1.getMember(1), x1.getMember(2));
                ctx.lineTo(x1.getMember(3), x1.getMember(4));
                ctx.stroke();
            }
            ctx.closePath();
        };
        
        self.point = function(x, y) {
            self.ctx.fillRect(x, y, 1, 1);
        };
        
        self.polygon = function(mode, verts) {
            var ctx = self.ctx, i, x, y;
            ctx.beginPath();
            ctx.moveTo(verts.getMember(1), verts.getMember(2));
            for(i = 3; i <= verts.__shine.numValues.length; i += 2) {
                x = verts.getMember(i);
                y = verts.getMember(i + 1);
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            if(mode == "fill") {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        };
        
        self.present =  function() { /*Uneeded in JS*/ };
        
        self.print = function(text, x, y, r, sx, sy, ox, oy, kx, ky) {
        };
        
        self.printf = function(text, x, y, limit, align, r, sx, sy, ox, oy, kx, ky) {
        };
        
        self.rectangle = function(mode, x, y, w, h) {
            if(mode == "fill") {
                self.ctx.fillRect(x, y, w, h);
            } else {
                self.ctx.strokeRect(x, y, w, h);
            }
        };
        
        //Transformations
        self.__updateTransform = function() {
            var matrix = self.__matrix;
            self.ctx.setTransform(matrix.e(1, 1), matrix.e(2, 1), matrix.e(1, 2), matrix.e(2, 2), matrix.e(1, 3), matrix.e(2, 3)); 
        };
        
        self.origin = function() {
            self.__matrix = Matrix.I(3);
            self.__updateTransform();
        };
        
        self.pop = function() {
            self.ctx.restore();
        };
        
        self.push = function() {
            self.ctx.save();
        };
        
        self.scale = function(x, y) {
            self.__matrix = self.__matrix.x($M([
                [x, 0, 0],
                [0, y, 0],
                [0, 0, 1]
            ]));
            self.__updateTransform();
        };
        
        self.translate = function(x, y) {
            self.__matrix = self.__matrix.x($M([
                [1, 0, x],
                [0, 1, y],
                [0, 0, 1]
            ]));
            self.__updateTransform();
        };
        
        self.rotate = function(rad) {
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            self.__matrix = self.__matrix.x($M([
                [c, -s, 0],
                [s,  c, 0],
                [0,  0, 1]
            ]));
            self.__updateTransform();
        };
        
        self.shear = function(x, y) {
            self.__matrix = self.__matrix.x($M([
                [1, y, 0],
                [x, 1, 0],
                [0, 0, 1]
            ]));  
            self.__updateTransform();
        };
        
        //Window type things
        self.getWidth = function() {
            return self.canvas.width;
        };
        
        self.getHeight = function() {
            return self.canvas.height;
        };
        
        self.getDimensions = function() {
            return self.canvas.getDimensions();
        };

        //State
        self.setColor = function(r, g, b, a) {
            var c, ctx = self.ctx;
            if(typeof r == "number") {
                c = new Love.Color(r, g, b, a);
            } else {
                c = new Love.Color(r);
            }
            ctx.fillStyle = c.as_string;
            ctx.strokeStyle = c.as_string;
            ctx.globalAlpha = c.a / 255;
        };

        self.setBackgroundColor = function(r, g, b, a) {
            self.canvas.setBackgroundColor(r, g, b, a);
        };
    }
    
    return Graphics;
})();

Love.Graphics.Canvas2D = (function() {
    function Canvas2D(width, height, elem) {
        define(this);

        this.elem = elem || document.createElement("canvas");
        //Hide canvas by default for off-screen rendering
        this.elem.style.display = "none";
        this.setDimensions(width, height);
        
        this.matrix = $M([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);

        this.ctx = elem.getContext("2d");
        this.setBackgroundColor(0, 0, 0, 255);
    }
    
    function define(self) {
        self.setBackgroundColor = function(r, g, b, a) {
            var c;
            if(typeof r == "number") {
                c = new Love.Color(r, g, b, a);
            } else {
                c = new Love.Color(r);
            }
            self.backgroundColor = c;
        };
        
        self.getDimensions = function() {
            return [self.width, self.height];
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
        define(this);
        
        this.dtLimit = 0.25;
        
        this.dt = 0;
        this.tp = Date.now();
        
        window.requestAnimationFrame = window.requestAnimationFrame || function(c) {
            setTimeout(callback, 60/1000);
        };
    }
    
    function define(self) {
        self.getDelta = function() {
            return self.dt;
        };
        
        self.getTime = function() {
            return self.tp;
        };
        
        self.getFPS = function() {
            if(self.dt == 0) { return 0; }
            return 1 / self.dt;
        };
        
        self.sleep = function() {
            unimplemented("love.timer.sleep");  
        };
        
        self.step = function() {
            var delta = (Date.now() - self.tp) / 1000;
            self.dt = Math.max(0, Math.min(self.dtLimit, delta));
            self.tp += self.dt * 1000;
        };
        
        self.nextFrame = function(callback) {
            window.requestAnimationFrame(callback);
        };
    }

    return Timer;
})();

Love.Window = (function() {
    function Window(graphics) {
        define(this, graphics);
        this.fullscreen = false;
    }
    
    function define(self, graphics) {
        self.getDesktopDimensions = function() {
            return [window.screen.width, window.screen.height];
        };
        
        self.getDimensions = function() {
            return graphics.getDimensions();  
        };
        
        self.getDisplayCount = function() {
            return 1;
        };
        
        self.getDisplayNames = function() {
            return window.document.title;  
        };
        
        self.getFullscreen = function() {
            return self.fullscreen;
        };
        
        self.getFullscreenModes = function() {
            return [ new shine.Table({
                width: window.screen.width,
                height: window.screen.height                    
            }) ];
        };
        
        self.getHeight = function() {
            return graphics.getHeight():  
        };
        
        self.getIcon = function() {
            unimplemented("love.window.getIcon");  
        };
        
        self.getMode = function() {
            return [self.getWidth(), self.getHeight(), null];  
        };
        
        self.getPixelScale = function() {
            return window.devicePixelRatio;  
        };
        
        self.getPosition = function() {
            return [0, 0, 1];  
        };
        
        self.getTitle = function() {
            return window.document.title;  
        };
        
        self.getWidth = function() {
            return graphics.getWidth();  
        };
        
        self.hasFocus = function() {
            return document.activeElement == Love.element;  
        };
        
        self.hasMouseFocus = function() {
            return document.activeElement == Love.element;  
        };
        
        self.isCreated = function() {
            return true;  
        };
        
        self.isVisible = function() {
            return true;  
        };
        
        self.setFullscreen = function(fullscreen) {
            self.fullscreen = fullscreen;
            //TODO Implement fullscreen for the game... somehow
        };
        
        self.setIcon = function() {
            unimplemented("love.window.setIcon");  
        };
        
        self.setMode = function(width, height, flags) {
            graphics.__mainCanvas.setDimensions(width, height);
            if(flags.getMember("fullscreen")) {
                self.setFullscreen(flags.getMember("fullscreen"))
            }
        };
        
        self.setPosition = function(x, y) {
            //Unneeded in JS  
        };
        
        self.setTitle = function(title) {
            window.document.title = title;  
        };
        
        self.showMessageBox = function(title, message, type, attachtowindow) {
            window.alert(title + "\n    " + message);  
        };
    }

    return Window;
})();

if(module) {
    module.exports = Love;
}