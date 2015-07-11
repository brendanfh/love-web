var wrap = function(t, f) {
    return function() {
        f.apply(t, arguments);
    }
};

var unimplemented = function(name) {
    console.warn("[", name, "] hasn't been implemented yet");  
};

var neverimplemented = function(name) {
    console.warn("[", name, "] can not be implemented in JS");
};

Love = (function() {
    function Love(elem, conf) {
        elem = elem || null;
        Love.element = elem;
        
        this.graphics   = new Love.Graphics(conf.width, conf.height);
        this.event      = new Love.Event();
        this.window     = new Love.Window(this.graphics, this.event);
        this.audio      = new Love.Audio();
        this.filesystem = new Love.FileSystem();
        this.font       = new Love.Font();
        this.joystick   = new Love.Joystick();
        this.keyboard   = new Love.Keyboard(this.event);
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

//Most of FileSystem can't be reinplemented but local storage will help
Love.FileSystem = (function() {
    function FileSystem() {
        define(this);
    }
    
    function define(self) {
        //Things that will work
        self.append = function(name, data) {
            localStorage[name] += data;
        };
        
        self.areSymlinksEnabled = function() {
            return false;
        };
        
        self.createDirectory = function(name) {
            //Unneeded in JS
        };
        
        self.exists = function(name) {
            return localStorage.getItem(name) != null;
        };
        
        self.getAppdataDirectory = function() {
            return "";
        };
        
        self.getDirectoryItems = function(dir) {
            return new shine.Table();
        };
        
        self.getIdentity = function() {
            return "";  
        };
        
        self.getSaveDirectory = function() {
            return "";  
        };
        
        self.getSourceBaseDirectory = function() {
            return "";  
        };
        
        self.getUserDirectory = function() {
            return "";  
        };
        
        self.getWorkingDirectory = function() {
            return "";  
        };
        
        self.init = function() {
            //Unneeded in JS  
        };
        
        self.isDirectory = function(name) {
            return false;
        };
        
        self.isFile = function(name) {
            return typeof localStorage[name] == "string";
        };
        
        self.isFused = function() {
            return false;
        };
        
        self.isSymlink = function() {
            return false;  
        };
        
        self.lines = function(filename) {
            return new shine.Table(localStorage[filename].split("\n"));
        };
        
        self.read = function(filename) {
            return localStorage[filename];
        };
        
        self.remove = function(name) {
            localStorage.removeItem(name);
        };
        
        self.write = function(name, data) {
            localStorage.setItem(name, data);
        };
        
        //Things that won't work
        self.getLastModified = function() {
            neverimplemented("love.filesystem.getLastModified");  
        };
        
        self.getRealDirectory = function() {
            neverimplemented("love.filesystem.getRealDirectory");
        };
        
        self.getSize = function() {
            neverimplemented("love.filesystem.getSize");  
        };
        
        self.load = function() {
            neverimplemented("love.filesystem.load");  
        };
        
        self.mount = function() {
            neverimplemented("love.filesystem.mount");  
        };
        
        self.newFile = function() {
            neverimplemented("love.filesystem.newFile");
        };
        
        self.newFileData = function() {
            neverimplemented("love.filesystem.newFileData");  
        };
        
        self.setIdentity = function() {
            neverimplemented("love.filsystem.setIdentity");
        };
        
        self.setSource = function() {
            neverimplemented("love.filesystem.setSource");  
        };
        
        self.setSymlinkEnabled = function() {
            neverimplemented("love.filesystem.setSymlinkEnabled");  
        };
        
        self.unmount = function() {
            neverimplemented("love.filesystem.unmount");  
        };
    }

    return FileSystem;
})();

Love.Font = (function() {
    function Font() {
        define(this);
    }
    
    function define(self) {
        self.newGlyphData = function() {
            neverimplemented("love.font.newGlyphData");  
        };
        
        self.newRasterizer = function() {
            neverimplemented("love.font.newRasterizer");  
        };
    }

    return Font;
})();

Love.Graphics = (function() {
    function Graphics(width, height) {
        define(this);

        if(Love.element == null) {
            this.canvas = new Love.Graphics.Canvas2D(width, height, null, this);
            document.body.appendChild(this.canvas.elem);
            Love.element = this.canvas.elem;
        }
        else {
            this.canvas = new Love.Graphics.Canvas2D(width, height, Love.element, this);
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

        self.draw = function(drawable, quad, x, y, r, sx, sy, ox, oy, kx, ky) {
            if(typeof quad == "number") {
                self.__drawWhole(drawable, quad || 0, x || 0, y || 0, r || 1, sx || 1, sy || 0, ox || 0, oy || 0, kx || 0);
            } else {
                self.__drawWithQuad(drawable, quad, x || 0, y || 0, r || 0, sx || 1, sy || 1, ox || 0, oy || 0, kx || 0, ky || 0);
            }
        };
        
        self.__drawWhole = function(drawable, x, y, r, sx, sy, ox, oy, kx, ky) {
            var ctx = self.ctx;
            var c = r == 0 ? 1 : Math.cos(r);
            var s = r == 0 ? 0 : Math.sin(r);
            var matrix = $M([
                [sx * c - kx * sy * s, ky * sx * c - sy * s, x - ox],
                [sx * s + kx * sy * c, ky * sx * s + sy * c, y - oy],
                [0,                    0,                    1     ]
            ]);
           
            ctx.save();
            self.__updateTransform(matrix);
            ctx.drawImage(drawable.elem, 0, 0);
            ctx.restore();
        };
        
        self.__drawWithQuad = function(drawable, quad, x, y, r, sx, sy, ox, oy, kx, ky) {
            var ctx = self.ctx, w = drawable.getWidth(), h = drawable.getHeight();
            var c = r == 0 ? 1 : Math.cos(r);
            var s = r == 0 ? 0 : Math.sin(r);
            var matrix = $M([
                [sx * c - kx * sy * s, ky * sx * c - sy * s, x - ox],
                [sx * s + kx * sy * c, ky * sx * s + sy * c, y - oy],
                [0,                    0,                    1     ]
            ]);
           
            ctx.save();
            self.__updateTransform(matrix);
            ctx.drawImage(drawable.elem, quad.x, quad.y, quad.w, quad.h, 0, 0, w, h);
            ctx.restore();
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
        
        self.present = function() { /*Uneeded in JS*/ };
        
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
        self.__updateTransform = function(m) {
            var matrix = m || self.__matrix;
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
        
        //Constructors
        self.newCanvas = function(width, height) {
            var canvas = new Love.Graphics.Canvas2D(width, height, this);
            return canvas;
        };
        
        self.newImage = function(path) {
            return new Love.Graphics.Image(path);  
        };
        
        self.newQuad = function(x, y, w, h, sw, sh) {
            return new Love.Graphics.Quad(x, y, w, h);  
        };
        
        self.newFont = function(name, size) {
            return new Love.Graphics.Font(name, size);  
        };
        
        self.newImageFont = function(name, glyphs) {
            return new Love.Graphics.ImageFont(name, glyphs);  
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
        self.getCanvas = function() {
            return self.canvas;  
        };
        
        self.setCanvas = function(canvas) {
            self.canvas = canvas || self.__mainCanvas;
            self.ctx = self.canvas.ctx;
            self.__matrix = self.canvas.matrix;
            self.__updateTransform();
        };
        
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

Love.Graphics.Font = (function() {
    function Font(name, size) {
        define(this);
        
        this.name = name;
        this.size = size;
        
        this.code = size + "px " + name;
    }
    
    function define(self) {
        //Most of these functions will not be properly implemented
        self.getAscent = function() {
            return 0;
        };
        
        self.getBaseline = function() {
            return 0;
        };
        
        self.getDescent = function() {
            return 0;  
        };
        
        self.getFilter = function() {
            return ["nearest", "nearest", 1];
        };
        
        self.getHeight = function() {
            return self.size;  
        };
        
        self.getLineHeight = function() {
            return self.size;  
        };
        
        self.getWidth = function(_, line) {
            unimplemented("Font:getWidth");  
        };
        
        self.getWrap = function(_, lines, width) {
            unimplemented("Font:getWrap");
        };
        
        self.hasGlyphs = function() {
            return false;  
        };
        
        self.setFilter = function() {
            unimplemented("Font:setFilter");
        };
        
        self.setLineHeight = function() {
            unimplemented("Font:setLineHeight");  
        };
    }
    
    return Font;
})();

Love.Graphics.ImageFont = (function() {
    function ImageFont(name, glyphs) {
        this.name = name;
        this.glyphs = glyphs;
        this.chars = {};
        
        define(this);
    }
    
    function define(self) {
        new Love.Graphics.Image(self.name, function(img) {
            self.__img = img;
            
            var charwidth = img.getWidth() / self.glyphs.length,
                i;
            for(i = 0; i < self.glyphs.length; i++) {
                self.chars[self.glyphs.charAt(i)] = new Love.Graphics.Quad(i * charwidth, 0, charwidth, img.getHeight());
            }
        });
        
        //Most of these functions will not be properly implemented
        self.getAscent = function() {
            return 0;
        };
        
        self.getBaseline = function() {
            return 0;
        };
        
        self.getDescent = function() {
            return 0;  
        };
        
        self.getFilter = function() {
            return ["nearest", "nearest", 1];
        };
        
        self.getHeight = function() {
            return self.__img.getHeight();
        };
        
        self.getLineHeight = function() {
            return self.__img.getHeight();
        };
        
        self.getWidth = function(_, line) {
            return self.__img.getWidth() / self.glyphs.length;
        };
        
        self.getWrap = function(_, lines, width) {
            unimplemented("ImageFont:getWrap");
        };
        
        self.hasGlyphs = function() {
            return false;
        };
        
        self.setFilter = function() {
            unimplemented("ImageFont:setFilter");
        };
        
        self.setLineHeight = function() {
            unimplemented("ImageFont:setLineHeight");  
        };
    }
    
    return ImageFont;
})();

Love.Graphics.Image = (function() {
    function LImage(path, onload) {
        define(this);
        
        var cFunc = wrap(this, function() {
            if(onload) onload.call(null, this);
        });
        
        if(typeof path == "string") {
            this.elem = document.querySelector("[src='"+path+"']");
            if(this.elem == null) {
                this.elem = document.createElement("img");
                this.elem.src = "lua/" + path;
                this.elem.onload = cFunc;
            } else {
                cFunc.call(null, this);
            }
        } else {
            this.elem = document.createElement("img");
            this.elem.src = "data:image/" + path.getExtension(path) + ";base64," + path.getString(path);
            this.elem.onload = cFunc;
        }
    }
    
    function define(self) {
        self.getData = function() {
            return new shine.Table();
        };
        
        self.getDimensions = function() {
            return [self.elem.width, self.elem.height];  
        };
        
        self.getFilter = function() {
            neverimplemented("Image:getFilter");  
        };
        
        self.getHeight = function() {
            return self.elem.height;  
        };
        
        self.getMipmapFilter = function() {
            neverimplemented("Image:getMipmapFilter");  
        };
        
        self.getWidth = function() {
            return self.elem.width;  
        };
        
        self.getWrap = function() {
            return "none";  
        };
        
        self.isCompressed = function() {
            return false;  
        };
        
        self.refresh = function() {
            unimplemented("Image:refresh");  
        };
        
        self.setFilter = function() {
            neverimplemented("Image:setFilter");  
        };
        
        self.setMipmapFilter = function() {
            neverimplemented("Image:setMipmapFilter");  
        };
        
        self.setWrap = function() {
            neverimplemented("Image:setWrap");
        };
    }
    
    return LImage;
})();

Love.Graphics.Quad = (function() {
    function Quad(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    Quad.prototype.getViewport = function(self) {
        return [self.x, self.y, self.w, self.h];
    };
    
    Quad.prototype.setViewport = function(self, x, y, w, h) {
        self.x = x;
        self.y = y;
        self.w = w;
        self.h = h;
    };
    
    return Quad;
})();

Love.Graphics.Canvas2D = (function() {
    function Canvas2D(width, height, elem, graphics) {
        define(this, graphics);

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
    
    function define(self, graphics) {
        self.clear = function(_, r, g, b, a) {
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
        
        self.getDimensions = function() {
            return [self.width, self.height];
        };
        
        self.getFilter = function() {
            if(self.ctx.imageSmoothingEnabled) {
                return "linear";
            } else {
                return "nearest";
            }
        };
        
        self.getFormat = function() {
            return "normal";  
        };
        
        self.getHeight = function() {
            return self.height;
        };
        
        self.getImageData = function() {
            var data = self.ctx.getImageData(0, 0, self.width, self.height);
            return new ImageData(data);
        };
        
        self.getMSAA = function() {
            return 0;  
        };
        
        self.getPixel = function(_, x, y) {
            var data = self.ctx.getImageData(x, y, 1, 1);
            return [data[0], data[1], data[2], data[3]];
        };
        
        self.getWidth = function() {
            return self.width;  
        };
        
        self.getWrap = function() {
            return "none";
        };
        
        self.renderTo = function(_, func) {
            graphics.setCanvas(self);
            func.call();
            graphics.setCanvas();
        };
        
        self.setFilter = function(_, filter) {
            var smoothing = filter == "linear", ctx = self.ctx;
            ctx.imageSmoothingEnabled = smoothing;
            ctx.mozImageSmoothingEnabled = smoothing;
            ctx.webkitImageSmoothingEnabled = smoothing;
            ctx.msImageSmoothingEnabled = smoothing;
        };
        
        self.setWrap = function() {
            unimplemented("Canvas:setWrap");  
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
        
        self.setBackgroundColor = function(r, g, b, a) {
            var c;
            if(typeof r == "number") {
                c = new Love.Color(r, g, b, a);
            } else {
                c = new Love.Color(r);
            }
            self.backgroundColor = c;
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
    function Keyboard(event) {
        define(this, event);
        
        this.keysDown = {};
    }
    function define(self, event) {
        document.addEventListener("keydown", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            key = getKey(e);
            self.keysDown[key] = true;
            
            event.push("keypressed", key, e.which);
        }, true);
        
        document.addEventListener("keyup", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            key = getKey(e);
            self.keysDown[key] = false;
            
            event.push("keyreleased", key, e.which);
        }, true);
        
        var keys = {
            8: "backspace",
            9: "tab",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause", 20: "capslock", 27: "escape",
            33: "pageup", 34: "pagedown", 35: "end", 36: "home", 45: "insert", 46: "delete",
            37: "left", 38: "up", 39: "right", 40: "down",
            91: "lmeta", 92: "rmeta", 93: "mode",
            96: "kp0", 97: "kp1", 98: "kp2", 99: "kp3", 100: "kp4", 101: "kp5",
            102: "kp6", 103: "kp7", 104: "kp8", 105: "kp9",
            106: "kp*", 107: "kp+", 109: "kp-", 110: "kp.", 111: "kp/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7",
            119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12",
            144: "numlock", 145: "scrolllock",
            186: ",", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`",
            219: "[", 220: "\\",221: "]", 222: "'"
        };
        
        var shiftKeys = {
            192:"~", 48:")", 49:"!", 50:"@", 51:"#", 52:"$", 53:"%", 54:"^", 55:"&", 56:"*", 57:"(", 109:"_", 61:"+",
            219:"{", 221:"}", 220:"|", 59:":", 222:"\"", 188:"<", 189:">", 191:"?",
            96:"insert", 97:"end", 98:"down", 99:"pagedown", 100:"left", 102:"right", 103:"home", 104:"up", 105:"pageup"
        };
            
        var rightKeys = {
            16: "rshift", 17: "rctrl", 18: "ralt"
        };
        
        function getKey(e) {
            var code, key;
            code = e.which;
            if(event.location && event.location > 1) {
                key = rightKeys[code];
            } else if(event.shiftKey) {
                key = shiftKeys[code] || keys[code];
            } else {
                key = keys[code];
            }
            
            if (typeof key == "undefined") {
                key = String.fromCharCode(code);
                if(!e.shiftKey) {
                    key = key.toLowerCase();
                }
            }
            return key;
        }
        
        self.hasKeyRepeat = function() {
            return false;  
        };
        
        self.hasTextInput = function() {
            return false;  
        };
        
        self.isDown = function(key) {
            if(!self.keysDown[key]) {
                return false;
            } else {
                return self.keysDown[key];
            }
        };
        
        self.setKeyRepeat = function() {
            //Unneeded for JS  
        };
        
        self.setTextInput = function() {
            unimplemented("love.keyboard.setTextInput");  
        };
        
        self.getScancodeFromKey = function() {
            neverimplemented("love.keyboard.getScancodeFromKey");  
        };
        
        self.getKeyFromScancode = function() {
            neverimplemented("love.keyboard.getKeyFromScancode");  
        };
    }

    return Keyboard;
})();

Love.Math = (function() {
    function LMath() {
        define(this);
    }
    
    function define(self) {
        
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
        define(this);
    }
    
    function define(self) {
        self.newDecoder = function() {
            neverimplemented("love.sound.newDecoder");  
        };
        
        self.newSoundData = function() {
            neverimplemented("love.sound.newSoundData");  
        };
    }

    return Sound;
})();

Love.System = (function() {
    function System() {
        define(this);
        
        navigator.battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
        
        this.clipboardText = "";
    }
    
    function define(self) {
        self.getClipboardText = function() {
            return this.clipboardText;
        };
        
        self.setClipboardText = function(text) {
            this.clipboardText = text;  
        };
        
        self.getOS = function() {
            return "Web " + navigator.appVersion;
        };
        
        self.getPowerInfo = function() {
            if(navigator.battery) {
                var state = "",
                    percent = Math.floor(navigator.battery.level * 100),
                    discharge = navigator.battery.dischargTime;
                if(navigator.battery.charging) {
                    if(percent >= 99) {
                        state = "charged";
                    } else {
                        state = "charging";
                    }
                } else {
                    state = "battery";
                }
                return [state, percent, discharge];
            } else {
                return ["nobattery", null, null];
            }
        };
        
        self.getProcessorCount = function() {
            return navigator.hardwareConcurrency || 1;  
        };
        
        self.openURL = function(url) {
            window.open(url)  
        };
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
    function Window(graphics, event) {
        define(this, graphics);
        this.fullscreen = false;
        
        window.onbeforeunload = function() {
            event.quit();
        };
        
        window.onblur = function() {
            event.push("visible", false);
        };
        
        window.onfocus = function() {
            event.push("visible", true);  
        };
    }
    
    function define(self, graphics) {
        var ts = 0;
        var handler = function(e) {
            //If the timestamp of the event is within 100ms of the time we went fullscreen,
            //we can assume we are going fullscreen
            if(e.timeStamp - ts > 100) {
                self.setFullscreen(false);
            }
        };
        document.addEventListener("webkitfullscreenchange", handler);
        document.addEventListener("mozfullscreenchange", handler);
        document.addEventListener("fullscreenchange", handler);
        document.addEventListener("MSFullscreenchange", handler);
        
        self.fromPixels = function() {
            unimplemented("love.window.fromPixels");  
        };
        
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
            return graphics.getHeight();  
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
            if(self.fullscreen) {
                Love.element.requestFullscreen = Love.element.requestFullscreen
                                              || Love.element.mozRequestFullscreen
                                              || Love.element.webkitRequestFullscreen
                                              || Love.element.msRequestFullscreen;
                document.getElementById("fs-text").setAttribute("style", "display: block;");
                document.getElementById("fs-btn-yes").addEventListener("click", function() {
                    document.getElementById("fs-btn-yes").removeEventListener("click");
                    document.getElementById("fs-btn-no").removeEventListener("click");
                    document.getElementById("fs-text").setAttribute("style", "display: none;");
                    ts = Date.now();
                    Love.element.requestFullscreen();
                    var dims = self.getDesktopDimensions();
                    Love.element.setAttribute("style", "width: " + dims[0] + "px; height: " + dims[1] + "px;");
                });
                
                document.getElementById("fs-btn-no").addEventListener("click", function() {
                    document.getElementById("fs-btn-yes").removeEventListener("click");
                    document.getElementById("fs-btn-no").removeEventListener("click");
                    document.getElementById("fs-text").setAttribute("style", "display: none;");
                });
            } else {
                document.exitFullscreen = document.exitFullscreen
                                       || document.mozCancelFullscreen
                                       || document.webkitExitFullscreen
                                       || document.msExitFullscreen;
                document.exitFullscreen();
                var dims = self.getDimensions();
                Love.element.setAttribute("style", "width: " + dims[0] + "px; height: " + dims[1] + "px;");
            }
        };
        
        self.setIcon = function() {
            unimplemented("love.window.setIcon");  
        };
        
        self.setMode = function(width, height, flags) {
            graphics.__mainCanvas.setDimensions(width, height);
            if(flags.getMember("fullscreen")) {
                self.setFullscreen(flags.getMember("fullscreen"));
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
        
        self.toPixels = function() {
            unimplemented("love.window.toPixels");  
        };
    }

    return Window;
})();

if(module) {
    module.exports = Love;
}