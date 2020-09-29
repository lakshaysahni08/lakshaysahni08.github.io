function initBackgroundShapes() {
	var maxBackgroundShapes = 30;
	var shapeColor = "#5c70b3";
	var shapeSize = 16;
	var shapeLineWidth = 3;
	var shapeMaxSpeed = .2;
	var shapeBounds = 50;
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	setTimeout(function () {
		canvas.style.opacity = 1
	}, 1);
	canvas.id = "shape-canvas";

	function resizeShapeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.strokeStyle = shapeColor;
		ctx.lineJoin = "round";
		ctx.lineWidth = shapeLineWidth;
		backgroundShapes.forEach(function (shape) {
			shape.animate()
		});
	}
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.addEventListener("resize", resizeShapeCanvas);
	var ctx = canvas.getContext("2d");
	var backgroundShapes = ['<>', '#', 'print()'];
	var sMouse = {};
	var shapeTypes = {
		square: function (x, y, size) {
			ctx.lineTo(x, y);
			ctx.lineTo(x + size, y);
			ctx.lineTo(x + size, y + size);
			ctx.lineTo(x, y + size);
		},
		circle: function (x, y, size) {
			ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
		},
		triangle: function (x, y, size) {
			ctx.lineTo(x, y);
			ctx.lineTo(x + size, y);
			ctx.lineTo(x, y + size);
		}
	};
	ctx.strokeStyle = shapeColor;
	ctx.lineJoin = "round";
	ctx.lineWidth = shapeLineWidth;

	function Shape(startX, startY, size, shapeType, speed) {
		this.x = startX;
		this.y = startY;
		this.size = 0;
		this.originalSize = size;
		this.speed = speed;
		this.shapeType = shapeType;
		this.alpha = speed * 3;
		this.originalAlpha = this.alpha;
		this.yD = Math.floor(Math.random() * 2);
		this.xD = Math.floor(Math.random() * 2);
		this.destroy = function () {
			var shapeIndex = backgroundShapes.indexOf(this);
			backgroundShapes.splice(shapeIndex, 1);
		};
		this.animate = function () {
			this.y += this.yD ? this.speed : -this.speed;
			this.x += this.xD ? this.speed : -this.speed;
			if (this.x <= this.size || this.x >= canvas.width - this.size) {
				this.xD = !this.xD;
			}
			if (this.y <= this.size || this.y >= canvas.height - this.size) {
				this.yD = !this.yD;
			}
			if (sMouse.x > this.x - shapeBounds && sMouse.x < this.x + (shapeBounds + this.size) && sMouse.y > this.y - shapeBounds && sMouse.y < this.y + (shapeBounds + this.size)) {
				if (this.alpha <= 0.1) {
					this.destroy();
				} else {
					this.size += 2;
					this.alpha -= .1;
				}
			} else {
				if (this.size > this.originalSize) {
					this.size--
				} else if (this.size < this.originalSize) {
					this.size++;
				}
				if (this.alpha < this.originalAlpha) this.alpha += .1;
			}
			ctx.globalAlpha = this.alpha;
			ctx.beginPath();
			shapeTypes[this.shapeType](this.x, this.y, this.size);
			ctx.closePath();
			ctx.stroke();
		}
	}

	function shapeCanvasLoop() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (backgroundShapes.length < maxBackgroundShapes) {
			var startX = Math.random() * window.innerWidth;
			var startY = Math.random() * window.innerHeight;
			var speed = Math.random() * shapeMaxSpeed;
			// backgroundShapes.push(new Shape(startX, startY, shapeSize, Object.keys(shapeTypes)[Math.floor(Math.random() * Object.keys(shapeTypes).length)], speed));
		}
		// backgroundShapes.forEach(function (shape) {
		// 	shape.animate()
		// });
		requestAnimationFrame(shapeCanvasLoop);
	}
	shapeCanvasLoop();
	window.addEventListener("mousemove", function (e) {
		sMouse.x = e.clientX;
		sMouse.y = e.clientY;
	});
}

function initCustom() {
	var $ = function (target, alwaysArray) {
		var elements = document.querySelectorAll(target);
		return alwaysArray ? elements : elements.length > 1 ? elements : elements[0];
	};
	var navbar = $(".navbar");
	var navbarBackground = document.createElement("div");
	navbarBackground.classList.add("navbar-background");
	navbarBackground.style.display = "none";
	document.body.insertBefore(navbarBackground, navbar);
	var navbarToggle = $(".navbar .navbar-toggler");
	var navbarActive = false;

	function toggleNavBackground(e) {
		if (navbarActive) {
			if (e.target === navbarBackground) navbarToggle.click();
			navbarBackground.style.opacity = 0;
			setTimeout(function () {
				navbarBackground.style.display = "none"
			}, 500);
			navbarActive = false;
		} else {
			setTimeout(function () {
				navbarBackground.style.opacity = 1
			}, 1);
			navbarBackground.style.display = "block";
			navbarActive = true;
		}
	}
	// navbarToggle.addEventListener("click", toggleNavBackground);
	navbarBackground.addEventListener("click", toggleNavBackground);
	var serverInfoInputs = $(".copy-to-clipboard", true);
	if (serverInfoInputs) {
		for (var i = 0; i < serverInfoInputs.length; i++) {
			var serverInput = serverInfoInputs[i];
			serverInput.placeholder = "Copied to clipboard!";
			var clipboard = new ClipboardJS(serverInput, {
				target: function (trigger) {
					return trigger;
				}
			}).on("success", function (e, a) {
				if (!e.trigger.copying) {
					e.trigger.copying = true;
					e.trigger.value = "";
					setTimeout(function () {
						e.trigger.value = e.text;
						e.trigger.copying = false;
					}, 1000);
				}
			})
		}
	}
}
initBackgroundShapes();
initCustom();