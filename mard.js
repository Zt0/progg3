var LivingCreature = require("./liv_creat");
module.exports = class Mard extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 24);
        this.speed = 36;
        this.multiply = Math.round(Math.random() * 24);

    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        return super.yntrelVandak(ch);
    }

    sharjvel() {
        var zang = this.yntrelVandak(0);
        var vand = zang[Math.floor(Math.random() * zang.length)];
        if (vand ) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
        }
    }

    utel() {
        this.energy--;
        var zang = this.yntrelVandak(3);
        var vand = zang[Math.floor(Math.random() * zang.length)];
        cnvacMardkancQanak++;
        if (vand ) {
            this.energy += this.speed / 2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; 
            this.y = vand[1];
            matrix[this.y][this.x] = 4;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
        else this.sharjvel();
    }

    bazmanal() {
        var zang = this.yntrelVandak(0);
        var vand = zang[Math.floor(Math.random() * zang.length)];
        if (vand && this.energy >= this.speed) {
            this.energy = 1;
            var newmard = new Mard(vand[0], vand[1], 4);
            mardArr.push(newmard);
        }
    }

    mahanal() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in mardArr) {
                if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
                    mardArr.splice(i, 1);
                }
            }
        }
    }
}


