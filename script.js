function drawBackground() {

    let canvas = document.querySelector('#background');
    let c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    class Circle {
        constructor(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.opacity = Math.random();
            this.time = 1;
        }

        draw() {
            c.beginPath();
            c.globalAlpha = this.opacity;
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = 'white';
            c.fill();
        }

        update() {
            if (this.x + this.radius > canvas.width || this.x + this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > canvas.height || this.y + this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.time += 1;


            this.draw();
        }
    }

    class Text {
        constructor(x, y, dx, dy, content) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.content = content;
            this.opacity = Math.random();
            this.time = 1;
        }

        draw() {
            c.font = 'Montserrat';
            c.textAlign = 'center';
            c.textBaseline = 'middle';
            c.fillStyle = 'white';  // a color name or by using rgb/rgba/hex values
            c.fillText(this.content, this.x, this.y) // text and position愀
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.dx = -this.dx;
            }

            if (this.y > canvas.height || this.y < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.time += 1;


            this.draw();
        }
    }

    let circleArray = []
    for (i = 0; i < 30; i++) {
        let radius = Math.random() * 7;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dx = 0.3 * (Math.random() - 0.5);
        let dy = 0.3 * (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }


    function animate() {

        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height)

        for (i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }

    }

    // let textArray = []
    // let option = ["java", 'python', 'django']
    // for (i = 0; i < 30; i++) {
    //     let content = option[Math.floor(Math.random() * option.length)];
    //     let x = Math.random() * (canvas.width);
    //     let y = Math.random() * (canvas.height);
    //     let dx = 0.3 * (Math.random() - 0.5);
    //     let dy = 0.3 * (Math.random() - 0.5);
    //     textArray.push(new Text(x, y, dx, dy, content));
    // }


    // function animate() {

    //     requestAnimationFrame(animate);
    //     c.clearRect(0, 0, canvas.width, canvas.height)

    //     for (i = 0; i < textArray.length; i++) {
    //         textArray[i].update();
    //     }

    // }

    animate()
}
drawBackground();