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
})();