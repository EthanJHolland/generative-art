function setup() {
    createCanvas(629, 629);
    background(100);
    rectMode(CENTER);
}

const shapes = [];
let size = width / 4;

const CIR = 'C'; // x, y, r
const SQU = 'S';
const TRI = 'T';

function draw() {
    if (size < 5) {
        noLoop();
        return;
    }

    const x = random(0, width);
    const y = random(0, height);

    const shape = undefined;

    shapes.forEach(existing_shape => {
        if (intersect(shape, existing_shape)) {
            size -= 5;
            return;
        }
    });

    shapes.append(shape);
    shape.draw();
}

function draw_circle() {

}

function draw_square() {

}

function draw_triangle() {
    
}

function intersect(a, b) {
    if (a.type === CIR) {
        if (b.type === CIR) {
            return intersect_circle_circle(a, b);
        } else {
            return intersect_circle_st(a, b);
        }
    }

    if (b.type === CIR) {
        return intersect(b, a);
    }

    return intersect_st_st(a, b);
}

function intersect_circle_circle(a, b) {
    return dist(a.x, a.y, b.x, b.y) < a.r + b.r;
}

function intersect_circle_st(a, b) {
    for (let b1 = 0; b1 < b.pts.length; b1++) {
        for (let b2 = b1 + 1; b2 < b.pts.length; b2++) {
            if (intersect_circle_segment(a, b.pts[b1], b.pts[b2])) {
                return true;
            }
        }
    }
}

function intersect_st_st(a, b) {
    for (let a1 = 0; a1 < a.pts.length; a1++) {
        for (let a2 = a1 + 1; a2 < a.pts.length; a2++) {
            for (let b1 = 0; b1 < b.pts.length; b1++) {
                for (let b2 = b1 + 1; b2 < b.pts.length; b2++) {
                    if (intersect_segment_segment(a.pts[a1], a.pts[a2], b.pts[b1], b.pts[b2])) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

// ===== based on https://stackoverflow.com/a/1501725 =====
function intersect_circle_segment(c, v, w) {
    let t = ((c.x - v.x) * (w.x - v.x) + (c.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    const distance = dist(c.x, c.y, v.x + t * (w.x - v.x), v.y + t * (w.y - v.y));
    return distance < c.r;
}

// ===== Based on https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/ =====
COLLINEAR = 0;
CLOCKWISE = 1;
COUNTERCLOCKWISE = 2;

function intersect_segment_segment(p1, q1, p2, q2) {
    // Find the four orientations needed for general and
    // special cases
    const o1 = points_orientation(p1, q1, p2);
    const o2 = points_orientation(p1, q1, q2);
    const o3 = points_orientation(p2, q2, p1);
    const o4 = points_orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4)
        return true;

    // Special Cases
    // p1, q1 and p2 are collinear and p2 lies on segment p1q1
    if (o1 == COLLINEAR && onSegment(p1, p2, q1)) return true;

    // p1, q1 and q2 are collinear and q2 lies on segment p1q1
    if (o2 == COLLINEAR && onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are collinear and p1 lies on segment p2q2
    if (o3 == COLLINEAR && onSegment(p2, p1, q2)) return true;

    // p2, q2 and q1 are collinear and q1 lies on segment p2q2
    if (o4 == COLLINEAR && onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
}

// To find orientation of ordered triplet (p, q, r).
function points_orientation(p, q, r) {
    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/ for details of below formula.
    const val = (q.y - p.y) * (r.x - q.x) -
        (q.x - p.x) * (r.y - q.y);

    if (val == 0) return COLLINEAR;  // collinear

    return (val > 0) ? CLOCKWISE : COUNTERCLOCKWISE; // clock or counterclockwise
}
