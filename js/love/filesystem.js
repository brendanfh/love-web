Love = Love || defineLove();

//Most of FileSystem can't be reinplemented but local storage will help
Love.FileSystem = (function() {
    function FileSystem() {
        define(this);
    }
    
    function define(self) {
        //Things that will work
        self.append = function(name, data) {
            localStorage[name] += data;
        };
        
        self.areSymlinksEnabled = function() {
            return false;
        };
        
        self.createDirectory = function(name) {
            //Unneeded in JS
        };
        
        self.exists = function(name) {
            return localStorage.getItem(name) != null;
        };
        
        self.getAppdataDirectory = function() {
            return "";
        };
        
        self.getDirectoryItems = function(dir) {
            return new shine.Table();
        };
        
        self.getIdentity = function() {
            return "";  
        };
        
        self.getSaveDirectory = function() {
            return "";  
        };
        
        self.getSourceBaseDirectory = function() {
            return "";  
        };
        
        self.getUserDirectory = function() {
            return "";  
        };
        
        self.getWorkingDirectory = function() {
            return "";  
        };
        
        self.init = function() {
            //Unneeded in JS  
        };
        
        self.isDirectory = function(name) {
            return false;
        };
        
        self.isFile = function(name) {
            return typeof localStorage[name] == "string";
        };
        
        self.isFused = function() {
            return false;
        };
        
        self.isSymlink = function() {
            return false;  
        };
        
        self.lines = function(filename) {
            return new shine.Table(localStorage[filename].split("\n"));
        };
        
        self.read = function(filename) {
            return localStorage[filename];
        };
        
        self.remove = function(name) {
            localStorage.removeItem(name);
        };
        
        self.write = function(name, data) {
            localStorage.setItem(name, data);
        };
        
        //Things that won't work
        self.getLastModified = function() {
            neverimplemented("love.filesystem.getLastModified");  
        };
        
        self.getRealDirectory = function() {
            neverimplemented("love.filesystem.getRealDirectory");
        };
        
        self.getSize = function() {
            neverimplemented("love.filesystem.getSize");  
        };
        
        self.load = function() {
            neverimplemented("love.filesystem.load");  
        };
        
        self.mount = function() {
            neverimplemented("love.filesystem.mount");  
        };
        
        self.newFile = function() {
            neverimplemented("love.filesystem.newFile");
        };
        
        self.newFileData = function() {
            neverimplemented("love.filesystem.newFileData");  
        };
        
        self.setIdentity = function() {
            neverimplemented("love.filsystem.setIdentity");
        };
        
        self.setSource = function() {
            neverimplemented("love.filesystem.setSource");  
        };
        
        self.setSymlinkEnabled = function() {
            neverimplemented("love.filesystem.setSymlinkEnabled");  
        };
        
        self.unmount = function() {
            neverimplemented("love.filesystem.unmount");  
        };
    }

    return FileSystem;
})();
