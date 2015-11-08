//Love on the web
var Love;
Love = Love || defineLove();

//TODO: Look into Web Audio API for more advanced compatibility
Love.Audio = (function() {
    function Audio() {
        define(this);
    }
    
    function define(self) {
        var ctx = new AudioContext() || new webkitAudioContext();
        var volNode = ctx.createGain();
        volNode.connect(ctx.destination);
        
        var panNode = ctx.createPanner();
        panNode.connect(volNode);
        
        var orientation = [ 0, 0, -1, 0, 1, 0 ];
        var position = [ 0, 0, 0 ];
        var velocity = [ 0, 0, 0 ];
        
        self.getDistanceModel = function() {
            return panNode.distanceModel;
        };
        
        self.getDopplerScale = function() {
            return 0;
        };
        
        self.getOrientation = function() {
            return orientation;
        };
        
        self.getPosition = function() {
            return position;
        };
        
        self.getSourceCount = function() {
            return 0;
        };
        
        self.getVelocity = function() {
            return velocity;
        };
        
        self.getVolume = function() {
            return volNode.gain.volume;
        };
        
        self.newSource = function(name) {
            return new Love.Audio.Source(name, ctx);
        };
        
        self.pause = function(source) {
            
        };
        
        self.play = function(source) {
            
        };
        
        self.resume = function(source) {
            
        };
        
        self.rewind = function(source) {
            
        };
        
        self.setDistanceModel = function() {
            unimplemented("love.audio.setDistanceModel");
        };
        
        self.setDopplerScale = function() {
            unimplemented("love.audio.setDopplerScale");
        };
        
        self.setOrientation = function() {
            unimplemented("love.audio.setOrientation");
        };
        
        self.setPosition = function() {
            unimplemented("love.audio.setPosition");
        };
        
        self.setVelocity = function() {
            unimplemented("love.audio.setVelocity");
        };
        
        self.setVolume = function(volume) {
            volNode.gain.volume = volume;
        };
        
        self.stop = function(source) {
            
        };
    }

    return Audio;
})();

Love.Audio.Source = (function() {
    function ASource(path, ctx) {
        this.panner = ctx.createPanner();
        
        var req = new XMLHttpRequest();
        req.open("GET", "lua/" + path, true);
        req.responseType = "arraybuffer";
        req.onload = wrap(this, function(e) {
            ctx.decodeAudioData(req.response, wrap(this, function(buffer) {
                this.buffer = buffer;
            }));
        });
        req.send();
    }
    
    ASource.prototype.clone = function(self) {
    
    };
    
    ASource.prototype.getAttenuationDistance = function(self) {
        unimplemented("Source:getAttenuationDistance");
    };
    
    ASource.prototype.getChannels = function(self) {
        if(self.buffer == null) return 0;
        return self.buffer.numberOfChannels;
    };
    
    ASource.prototype.getCone = function() {
    };
    
    return ASource;
})();;Love = Love || defineLove();

Love.Color = (function() {
    function Color(r, g, b, a) {
        if (typeof r != "number") {
            if(typeof r == "string") {
                var d = parseInt(/#([A-Fa-f0-9]*)/.exec(r)[1], 16);
                this.r = d >> 16;
                this.g = (d >> 8) & 255;
                this.b = d & 255;
                this.a = 255;
            } else {
                this.r = r.getMember(1) || 0;
                this.g = r.getMember(2) || 0;
                this.b = r.getMember(3) || 0;
                this.a = r.getMember(4) || 255;
            }
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
})();;Love = Love || defineLove();

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
;Love = Love || defineLove();

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
;Love = Love || defineLove();

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
;Love = Love || defineLove();

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
                __drawWhole(drawable, quad || 0, x || 0, y || 0, r || 1, sx || 1, sy || 0, ox || 0, oy || 0, kx || 0);
            } else {
                __drawWithQuad(drawable, quad, x || 0, y || 0, r || 0, sx || 1, sy || 1, ox || 0, oy || 0, kx || 0, ky || 0);
            }
        };
        
        var __drawWhole = function(drawable, x, y, r, sx, sy, ox, oy, kx, ky) {
            var ctx = self.ctx;
            var c = r == 0 ? 1 : Math.cos(r);
            var s = r == 0 ? 0 : Math.sin(r);
            var matrix = self.__matrix.x($M([
                [sx * c - kx * sy * s, ky * sx * c - sy * s, x - ox],
                [sx * s + kx * sy * c, ky * sx * s + sy * c, y - oy],
                [0,                    0,                    1     ]
            ]));
           
            ctx.save();
            self.__updateTransform(matrix);
            ctx.drawImage(drawable.elem, 0, 0);
            ctx.restore();
        };
        
        var __drawWithQuad = function(drawable, quad, x, y, r, sx, sy, ox, oy, kx, ky) {
            var ctx = self.ctx, w = drawable.getWidth(), h = drawable.getHeight();
            var c = r == 0 ? 1 : Math.cos(r);
            var s = r == 0 ? 0 : Math.sin(r);
            var matrix = self.__matrix.x($M([
                [sx * c - kx * sy * s, ky * sx * c - sy * s, x - ox],
                [sx * s + kx * sy * c, ky * sx * s + sy * c, y - oy],
                [0,                    0,                    1     ]
            ]));
           
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
            return new Love.Graphics.Canvas2D(width, height, this);
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
        //TODO: Implement all state functions
        self.getBackgroundColor = function() {
            var c = self.canvas.backgroundColor;
            return [ c.r, c.g, c.b, c.a ];   
        };
        
        self.getBlendMode = function() {
            var c = self.ctx;
            if(c.globalCompositeOperation == "source-over") {
                return "alpha";
            } else if(c.globalCompositeOperation == "multiply") {
                return "multiplicative";
            } else if(c.globalCompositeOperation == "lighten") {
                return "additive";
            } else {
                return "normal";
            }
        };
        
        self.getCanvas = function() {
            return self.canvas;  
        };
        
        self.getColor = function() {
            var c = new Love.Color(self.ctx.fillStyle);
            return [c.r, c.g, c.b, self.ctx.globalAlpha * 255];
        };
        
        self.setCanvas = function(canvas) {
            self.canvas = canvas || self.__mainCanvas;
            self.ctx = self.canvas.ctx;
            self.__matrix = self.canvas.matrix;
            self.__updateTransform();
        };
        
        self.setColor = function(r, g, b, a) {
            var c = new Love.Color(r, g, b, a), ctx = self.ctx;
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


//TODO: Look at the pull request on punchdrunk for ideas to make this proper
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
            this.elem = document.querySelector("[src='lua/"+path+"']");
            if(this.elem == null) {
                this.elem = document.createElement("img");
                this.elem.src = "lua/" + path;
                this.elem.onload = cFunc;
            } else {
                cFunc.call();
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

        //These are non-standard but are used thoughout the engine
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
            var c = new Love.Color(r, g, b, a);
            self.backgroundColor = c;
        };
    }
    
    return Canvas2D;
})();
;Love = Love || defineLove();

Love.Joystick = (function() {
    function Joystick() {

    }

    return Joystick;
})();;Love = Love || defineLove();

//TODO: Add key repeating and text-input
Love.Keyboard = (function() {
    function Keyboard(event) {
        define(this, event);
    }
    
    function define(self, event) {
        var keysDown = {};
        var repeat = false;
        
        document.addEventListener("keydown", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            key = getKey(e);
            if(keysDown[key] && repeat) {
                event.push("keypressed", key, true);
            }
            if(!keysDown[key] && !repeat) {
                event.push("keypressed", key, false);
            }
            keysDown[key] = true;
        }, true);
        
        document.addEventListener("keyup", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            key = getKey(e);
            keysDown[key] = false;
            
            event.push("keyreleased", key);
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
            return repeat;
        };
        
        self.hasTextInput = function() {
            return false;
        };
        
        self.isDown = function(key) {
            if(!keysDown[key]) {
                return false;
            } else {
                return keysDown[key];
            }
        };
        
        self.setKeyRepeat = function(r) {
            repeat = r;
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
})();;function defineLove() {
    return (function() {
        function Love(elem, conf) {
            wrap = function(t, f) {
                return function() {
                    f.apply(t, arguments);
                }
            };
            
            unimplemented = function(name) {
                console.warn("[", name, "] hasn't been implemented yet");  
            };
            
            neverimplemented = function(name) {
                console.warn("[", name, "] can not be implemented in JS");
            };
            
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
            this.mouse      = new Love.Mouse(this.event, this.window);
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
        Love.prototype.mousereleased = function() { };
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
    
};Love = Love || defineLove();

Love.Math = (function() {
    function LMath() {
        define(this);
    }
    
    function define(self) {
        
    }

    return LMath;
})();;Love = Love || defineLove();

//TODO: Implement Pointer-lock api for setGrabbed
Love.Mouse = (function() {
    function Mouse(event, win) {
        define(this, event, win);
    }    
    
    function define(self, event, win) {
        var buttons = {
            "l" : false,
            "m" : false,
            "r" : false,
            "wd": false,
            "wu": false,
            "x1": false,
            "x2": false
        };
        
        var love_buttons = ["l", "m", "r", "x1", "x2"];
        
        var __x = 0;
        var __y = 0;
        var __cursor = new Love.Mouse.Cursor();
        
        Love.element.addEventListener("mousedown", function(e) {
            var x, y, dims, rect = Love.element.getBoundingClientRect();
            e.preventDefault();
            e.stopPropagation();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            if(win.getFullscreen()) {
                dims = win.getDimensions();
                x *= (dims[0] / window.innerWidth);
                y *= (dims[1] / window.innerHeight);
            }
            
            buttons[e.which] = true;
            
            __x = x;
            __y = y;
            event.push("mousepressed", x, y, love_buttons[e.which - 1]);
        }, true);
        
        Love.element.addEventListener("mouseup", function(e) {
            var x, y, dims, rect = Love.element.getBoundingClientRect();
            e.preventDefault();
            e.stopPropagation();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            if(win.getFullscreen()) {
                dims = win.getDimensions();
                x *= (dims[0] / window.innerWidth);
                y *= (dims[1] / window.innerHeight);
            }
            
            buttons[e.which] = false;
            
            __x = x;
            __y = y;
            event.push("mousereleased", x, y, love_buttons[e.which - 1]);
        }, true);
        
        Love.element.addEventListener("mousemove", function(e) {
            var x, y, dims, dx, dy, rect = Love.element.getBoundingClientRect();
            e.preventDefault();
            e.stopPropagation();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            if(win.getFullscreen()) {
                dims = win.getDimensions();
                x *= (dims[0] / window.innerWidth);
                y *= (dims[1] / window.innerHeight);
            }
            dx = x - __x;
            dy = y - __y;
            
            __x = x;
            __y = y;
            event.push("mousemoved", x, y, dx, dy);
        }, true);
        
        Love.element.addEventListener("wheel", function(e) {
            var x, y, dims, rect = Love.element.getBoundingClientRect(), up;
            e.preventDefault();
            e.stopPropagation();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            if(win.getFullscreen()) {
                dims = win.getDimensions();
                x *= (dims[0] / window.innerWidth);
                y *= (dims[1] / window.innerHeight);
            }
            up = e.deltaY < 0;
            event.push("mousepressed", x, y, up ? "wu" : "wd");
        }, true);
        
        self.getCursor = function() {
            return __cursor;
        };
        
        self.getPosition = function() {
            return [__x, __y];  
        };
        
        self.getRelativeMode = function() {
            return false;  
        };
        
        self.getSystemCursor = function(type) {
            return new Love.Mouse.Cursor(type);  
        };
        
        self.getX = function() {
            return __x;
        };
        
        self.getY = function() {
            return __y;
        };
        
        self.isDown = function(button) {
            return buttons[button];
        };
        
        self.isGrabbed = function() {
            return false;  
        };
        
        self.isVisible = function() {
            return __cursor.__visible;
        };
        
        self.newCursor = function(data) {
            unimplemented("love.mouse.newCursor");  
        };
        
        self.setCursor = function(cursor) {
            __cursor = cursor;
            Love.element.style.cursor = __cursor.__getHtmlType();
        };
        
        self.setGrabbed = function() {
            neverimplemented("love.mouse.setGrabbed");  
        };
        
        self.setPosition = function() {
            neverimplemented("love.mouse.setPosition");  
        };
        
        self.setRelativeMode = function() {
            neverimplemented("love.mouse.setRelativeMode");  
        };
        
        self.setVisible = function(visible) {
            __cursor.__visible = visible;
            Love.element.style.cursor = __cursor.__getHtmlType();
        };
        
        self.setX = function() {
            neverimplemented("love.mouse.setX");
        };
        
        self.setY = function() {
            neverimplemented("love.mouse.setY");  
        };
    }

    return Mouse;
})();

Love.Mouse.Cursor = (function() {
    function Cursor(type, visible) {
        this.type = type || "arrow";
        this.__visible = visible != null ? visible : true;
    }
    
    var htmlcursor = {
        "arrow"     : "default",
        "ibeam"     : "text",
        "wait"      : "wait",
        "waitarrow" : "progress",
        "crosshair" : "crosshair",
        "sizenwse"  : "nwse-resize",
        "sizenesw"  : "nesw-resize",
        "sizewe"    : "ew-resize",
        "sizens"    : "ns-resize",
        "sizeall"   : "move",
        "no"        : "not-allowed",
        "hand"      : "grab"
    }
    
    Cursor.prototype.__getHtmlType = function() {
        return !this.__visible ? "none" : htmlcursor[this.type];
    };
    
    Cursor.prototype.getType = function(self) {
        return self.type;
    };
    
    return Cursor;
})();;//Ha ha ha ha ha no....;Love = Love || defineLove();

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
})();;Love = Love || defineLove();

Love.System = (function() {
    function System() {
        define(this);
        
        navigator.battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
        if(!navigator.battery) {
            //NOTE: This will not update as the program continues
            navigator.getBattery().then(function(battery) {
                navigator.battery = battery; 
            });
        }
    }
    
    function define(self) {
        var clipboardText = "";
        
        self.getClipboardText = function() {
            return clipboardText;
        };
        
        self.setClipboardText = function(text) {
            clipboardText = text;  
        };
        
        self.getOS = function() {
            return "Web " + navigator.appVersion;
        };
        
        self.getPowerInfo = function() {
            if(navigator.battery) {
                var state = "",
                    percent = Math.floor(navigator.battery.level * 100),
                    discharge = navigator.battery.dischargingTime;
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
            window.open(url);
        };
    }

    return System;
})();;Love = Love || defineLove();

Love.Timer = (function() {
    function Timer() {
        define(this);
        
        window.requestAnimationFrame = window.requestAnimationFrame || function(c) {
            setTimeout(c, 60/1000);
        };
    }
    
    function define(self) {
        var dtLimit = 0.25;
        
        var dt = 0;
        var tp = Date.now();
        
        self.getDelta = function() {
            return dt;
        };
        
        self.getTime = function() {
            return tp;
        };
        
        self.getFPS = function() {
            if(dt == 0) { return 0; }
            return 1 / dt;
        };
        
        self.sleep = function() {
            unimplemented("love.timer.sleep");  
        };
        
        self.step = function() {
            var delta = (Date.now() - tp) / 1000;
            dt = Math.max(0, Math.min(dtLimit, delta));
            tp += dt * 1000;
        };
        
        self.nextFrame = function(callback) {
            window.requestAnimationFrame(callback);
        };
    }

    return Timer;
})();;Love = Love || defineLove();

Love.Window = (function() {
    function Window(graphics, event) {
        define(this, graphics);
        
        window.onbeforeunload = function() {
            event.quit();
        };
        
        window.onblur = function() {
            event.push("visible", false);
            event.push("mousefocus", false);
        };
        
        window.onfocus = function() {
            event.push("visible", true);
            event.push("mousefocus", true);
        };
        
        document.oncontextmenu = function(e) {
            e.preventDefault();
        };
    }
    
    function define(self, graphics) {
        var ts = 0;
        var handler = function() {
            var elem = document.fullscreenElement
                    || document.mozFullScreenElement
                    || document.webkitFullscreenElement
                    || document.msFullScreenElement;
            if(elem != Love.element) {
                fullscreen = false;
                self.setFullscreen(false, true);
            } else {
                fullscreen = true;
            }
        };
        document.addEventListener("webkitfullscreenchange", handler, true);
        document.addEventListener("mozfullscreenchange", handler, true);
        document.addEventListener("fullscreenchange", handler, true);
        document.addEventListener("MSFullscreenchange", handler, true);
        
        var fullscreen = false;
        
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
            return fullscreen;
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
        
        self.setFullscreen = function(fs, fromCallback) {
            fromCallback = fromCallback == null ? false : fromCallback;
            if(fs) {
                Love.element.requestFullscreen = Love.element.mozRequestFullScreen
                                              || Love.element.webkitRequestFullscreen
                                              || Love.element.msRequestFullscreen
                                              || Love.element.requestFullscreen;
                document.getElementById("fs-text").setAttribute("style", "display: block;");
                document.getElementById("fs-btn").addEventListener("click", function() {
                    ts = Date.now();
                    Love.element.requestFullscreen();
                    var dims = self.getDesktopDimensions();
                    Love.element.setAttribute("style", "width: " + dims[0] + "px; height: " + dims[1] + "px;");
                });
            } else {
                document.exitFullscreen = document.exitFullscreen
                                       || document.mozCancelFullScreen
                                       || document.webkitExitFullscreen
                                       || document.msExitFullscreen;
                document.exitFullscreen();
                var dims = self.getDimensions();
                Love.element.setAttribute("style", "width: " + dims[0] + "px; height: " + dims[1] + "px;");
                //Dont remove the message unless the love2d program says to
                if(!fromCallback) {
                    document.getElementById("fs-text").setAttribute("style", "display: none;");
                    document.getElementById("fs-btn").removeEventListener("click", null);
                }
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
