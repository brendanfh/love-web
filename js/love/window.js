Love = Love || defineLove();

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
