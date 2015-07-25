function defineLove() {
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
    
}