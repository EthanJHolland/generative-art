function setup() {
    createCanvas(629, 629);
    background(255);
}

let triangles = [];
const lines = [];
let center_x, center_y;

const palette = ["#abcd5e", "#29ac9f", "#14976b", "#2b67af", "#62b6de", "#b3dce0", "#f589a3", "#ef562f", "#fc8405", "#f9d531", 'white'];

function draw() {
    stroke(225);
    center_x = random(width);
    center_y = random(height);
    const center_pt = { x: center_x, y: center_y }
    const center_r = random(width / 15, width / 10);

    strokeWeight(7);
    // 	const aves = [];
    // for (let ave = 0; ave < random(5, 10); ave++) {
    // const direction = random(0, TWO_PI);
    // 			aves.push(direction);
    // // line(center_x, center_y, center_x + width * cos(direction), center_y + height * sin(direction))
    // }
    // aves.sort();

    let angle = 0;
    let last_pt, pt;
    const pts = [];
    while (angle < TWO_PI) {
        last_angle = angle;
        angle += random(0, PI / 4);

        pt = { x: center_x + (width + height) * cos(angle), y: center_y + (width + height) * sin(angle) };
        pts.push(pt);
        lines.push([center_pt, pt]);
        drawLine([center_pt, pt]);
        if (last_pt) {
            //             const tri = [
            //                 center_pt,
            //                 last_pt,
            //                 pt
            //             ];
            //             triangles.push(tri);
            //             drawTriangle(...tri);
            // console.log(last_pt);
            // 					console.log(center_pt);
            // console.log(pt);
            for (let k = 0; k < 10; k++) {
                const r = random();
                const lin = [
                    randPointOnLine(center_pt, last_pt, r),
                    randPointOnLine(center_pt, pt, r)
                ];


                lines.push(lin);
                drawLine(lin);
            }

        }

        last_pt = pt;
    }

    for (let i = 0; i < 100; i++) {
        const lin = [
            randPointOnLine(...random(lines)),
            randPointOnLine(...random(lines)),
        ];
        // console.log(lineLength(lin));
        if (lineLength(lin) < 100000 && lineLength(lin) > 10000) {
            lines.push(lin);
            drawLine(lin);
        }
    }

    // for (let road = 0; road < random(aves.length, pow(aves.length, 2)); road++) {
    // 	strokeWeight(random(0, 10));
    // 	line(
    // 		...randPointOnSegment(center_x, center_y, random(aves)),
    // 		...randPointOnSegment(center_x, center_y, random(aves))
    // 	);
    // }

    // for (let i = 0; i < 3; i++) {
    // 	let length = triangles.length;
    // 	for (let j= 0; j< length; j++) {
    // 					fill(random(palette))
    // 	strokeWeight(random(3))
    // 	splitTriangle(...triangles[j]);
    // 	}
    // }

    // pts.forEach(pt => {
    // 				strokeWeight(random(5,7))
    // 	line(center_x, center_y, pt.x, pt.y);
    // });
    fill(255);
    circle(center_x, center_y, center_r);

    stroke(255);
    noFill();
    circle(center_x, center_y, center_r * 2);


    noLoop();
}



function randPointOnSegment(center_x, center_y, direction) {
    const d = random(0, width);
    return [center_x + d * cos(direction), center_y + d * sin(direction)];
}

// function splitTriangle(a, b, c) {
//     const tri = [
//         randPointOnLine(a, b),
//         randPointOnLine(b, c),
//         randPointOnLine(a, c)
//     ];

//     triangles.push(tri);
//     drawTriangle(...tri);
// }

function randPointOnLine(a, b, r) {
    // if (a.x !== center_x && a.y !== center_y && random() < 0.5) {
    // 	return a;
    // }
    r = r ? r + random(0.05) : random();
    return {
        x: a.x * r + b.x * (1 - r),
        y: a.y * r + b.y * (1 - r)
    };
}

// function drawTriangle(a, b, c) {
// 	fill(random(palette));
//     triangle(a.x, a.y, b.x, b.y, c.x, c.y);
// }

function lineLength(lin) {
    return pow(lin[0].x - lin[1].x, 2) + pow(lin[0].y - lin[1].y, 2)
}

function drawLine(lin) {
    line(lin[0].x, lin[0].y, lin[1].x, lin[1].y);
}