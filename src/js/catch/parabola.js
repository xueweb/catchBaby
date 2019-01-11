function Parabola(t) {
    var i, e, s, n, o, h, f, l, a = 0,
        c = 15,
        g = null;
    this.config = t || {}, this.origin = $(this.config.origin) || null, this.target = $(this.config.target) || null, this.element = $(this.config.element) || null, this.a = this.config.a || .002, this.scale = this.config.scale || 1, this.time = this.config.time || 1e3, this.init = function() {
        return i = this.origin.offset().left, e = this.origin.offset().top, s = this.target.offset().left + this.target.offset().width / 2, n = this.target.offset().top + this.target.offset().height / 2, this.scale > 1 ? (s -= .5 * this.origin.offset().width * (1 - 1 / this.scale), n -= .5 * this.origin.offset().height * (1 - 1 / this.scale)) : this.scale || (s -= .5 * this.origin.offset().width, n -= .5 * this.origin.offset().height), o = i, h = e, f = s - i, l = n - e, speedx = f / this.time, a = (l - this.a * f * f) / f, this.element.css({ left: i, top: e }), this
    }, this.moveStyle = function() {
        var t = "position";
        return t
    }, this.move = function() {
        var t = (new Date).getTime(),
            i = this.moveStyle(),
            e = this;
        return g = setInterval(function() {
            return (new Date).getTime() - t > e.time ? (clearInterval(g), e.element.css({ left: s, top: n }), void("function" == typeof e.config.callback && e.config.callback(e.element))) : (x = speedx * ((new Date).getTime() - t), y = e.a * x * x + a * x, void("position" === i && e.element.css({ left: x + o, top: y + h })))
        }, c), this
    }, this.init()
}
