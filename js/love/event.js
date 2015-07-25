Love = Love || defineLove();

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
