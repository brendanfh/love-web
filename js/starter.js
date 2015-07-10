function LOVEWEB(conf) {
    var elem = conf.elem;
    conf.window = conf.window || {
        width: 800,
        height: 600,
    };
    conf.modules = conf.modules || {};

    new shine.FileManager().load("./lua/conf.lua.json", function(err, file) {
        if(file) {
            var conf_env = { love: {} }
            var conf_vm = new shine.VM(conf_env);
            conf_vm.execute(null, file);
            conf_env.love.conf.call(null, conf);
        }

        var love = new Love(elem, conf.window);

        var vm = new shine.VM({
            love: love
        });
        
        vm._globals['package'].path = "lua/?.lua.json;lua/?.json;" + vm._globals['package'].path;
        vm.load({"sourceName":"@lua/boot.lua","lineDefined":0,"lastLineDefined":0,"upvalueCount":0,"paramCount":0,"is_vararg":2,"maxStackSize":2,"instructions":[5,0,0,0,1,1,1,0,28,0,2,1,5,0,2,0,6,0,0,259,28,0,1,1,30,0,1,0],"constants":["require","main","love","run"],"functions":[],"linePositions":[1,1,1,3,3,3,3],"locals":[],"upvalues":[],"sourcePath":"lua/boot.lua"})
    });
}