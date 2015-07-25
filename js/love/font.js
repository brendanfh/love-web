Love = Love || defineLove();

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
