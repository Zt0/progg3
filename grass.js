var LivingCreature = require("./liv_creat");
module.exports = class Grass extends LivingCreature{
    mul() {
        this.multiply++;
        var zang = this.yntrelVandak(0);
        var a = zang[Math.floor(Math.random() * zang.length)];
        cnvacXoteriQanak++;
        if (this.multiply >= this.speed && a) {
            var newGrass = new Grass(a[0], a[1], this.index);
            newGrass.parentX = this.x;
            newGrass.parentY = this.y;
            grassArr.push(newGrass);
            matrix[a[1]][a[0]] = this.index;
            this.multiply = 0;
        }
    }
}
