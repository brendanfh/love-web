Love = Love || defineLove();

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
})();