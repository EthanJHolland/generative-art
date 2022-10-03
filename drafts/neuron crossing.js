let hue;
function setup() {
    createCanvas(329 * 2, 329);
    background(0);

    colorMode(HSB, 360, 2, 2, 1);
	hue = random() * 360;
}

function draw() {
    add_layer(0);
    add_layer(1);
    add_boxes();
    noLoop();
}

const step = 60;
function add_layer(v) {
    hue = (hue + 180) % 360;
    const layer = createGraphics(width, height);

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
					const s = step * pow(0.5 - abs(j / height - 0.5), 5)
            const c = color(hue, 1 + noise(j / height * s, i / width * s), 1 + noise(i / width * s, j / height * s), abs(v - j / height));
            layer.set(i, j, c);
        }
    }
    layer.updatePixels();
    image(layer, 0, 0);
}

const num_channels = 25;
function add_boxes() {
    const channel_width = 3;
    const box_width = max(1, width / num_channels - channel_width);
    const box_height = height * 2 / 5;

    rectMode(CENTER);
	// noStroke();
		colorMode(RGB, 255, 255, 255, 1);
    fill(0, 0, 0, 0.89)
	stroke(0,0,0,20);
    for (let x = 0; x < width + box_width; x += box_width + channel_width) {
        rect(x, height / 2, box_width, box_height);
    }
}