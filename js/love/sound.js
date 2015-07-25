Love = Love || defineLove();

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