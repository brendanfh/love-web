Love = Love || defineLove();

Love.System = (function() {
    function System() {
        define(this);
        
        navigator.battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
        if(!navigator.battery) {
            //NOTE: This will not update as the program continues
            navigator.getBattery().then(function(battery) {
                navigator.battery = battery; 
            });
        }
    }
    
    function define(self) {
        var clipboardText = "";
        
        self.getClipboardText = function() {
            return clipboardText;
        };
        
        self.setClipboardText = function(text) {
            clipboardText = text;  
        };
        
        self.getOS = function() {
            return "Web " + navigator.appVersion;
        };
        
        self.getPowerInfo = function() {
            if(navigator.battery) {
                var state = "",
                    percent = Math.floor(navigator.battery.level * 100),
                    discharge = navigator.battery.dischargingTime;
                if(navigator.battery.charging) {
                    if(percent >= 99) {
                        state = "charged";
                    } else {
                        state = "charging";
                    }
                } else {
                    state = "battery";
                }
                return [state, percent, discharge];
            } else {
                return ["nobattery", null, null];
            }
        };
        
        self.getProcessorCount = function() {
            return navigator.hardwareConcurrency || 1;
        };
        
        self.openURL = function(url) {
            window.open(url);
        };
        
        self.vibrate = function(seconds) {
            navigator.vibrate(seconds * 1000);
        };
    }

    return System;
})();