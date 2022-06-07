class SnowFlower {
    constructor () {
        this._img = document.createElement('img')
        this._img.src = 'assets/snow.png'
        this._img.width = '30'
        this.moveBingThis = this.move.bind(this)
        this.moveBingThis()
        this.x = 0
        this.y = 0
        this.speedX = 1
        this.speedY = 1
    }
    get img() {
        return this._img
    }
    move () {
        this.x += this.speedX
        this.y += this.speedY
        this._img.style.transform = `translate(${this.x}px, ${this.y}px)`
        requestAnimationFrame(this.moveBingThis)
    }
}

module.exports = SnowFlower