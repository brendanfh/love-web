Love = Love || defineLove();

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
})();