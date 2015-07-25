Love = Love || defineLove();

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
