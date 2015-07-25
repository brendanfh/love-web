Love = Love || defineLove();

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
})();