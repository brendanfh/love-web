Love = Love || defineLove();

Love.Color = (function() {
    function Color(r, g, b, a) {
        if (typeof r != "number") {
            if(typeof r == "string") {
                var d = parseInt(/#([A-Fa-f0-9]*)/.exec(r)[1], 16);
                this.r = d >> 16;
                this.g = (d >> 8) & 255;
                this.b = d & 255;
                this.a = 255;
            } else {
                this.r = r.getMember(1) || 0;
                this.g = r.getMember(2) || 0;
                this.b = r.getMember(3) || 0;
                this.a = r.getMember(4) || 255;
            }
        } else {
            this.r = r || 0;
            this.g = g || 0;
            this.b = b || 0;
            this.a = a || 255;
        }
        //this.as_string = (this.r << 16 | this.g << 8 | this.b).toString(16);
        this.as_string = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }

    return Color;
})();