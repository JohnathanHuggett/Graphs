/**
 * Edge
 */
export class Edge {
    constructor(destination) {
        this.destination = destination;
        // implement weight
    }
}

/**
 * Vertex
 */
export class Vertex {
    constructor(value = "default", pos = { x: -1, y: -1 }) {
        this.edges = [];
        this.value = value;
        this.pos = pos;
        this.color = "white";
    }
}

/**
 * Graph
 */
export class Graph {
    constructor() {
        this.vertexes = [];
    }

    // debugCreateTestData() {
    //     // console.log('called debugCreateTestData()');
    //     let debugVertex1 = new Vertex("t1", { x: 40, y: 40 });
    //     let debugVertex2 = new Vertex("t2", { x: 80, y: 80 });
    //     let debugVertex3 = new Vertex("t3", { x: 40, y: 80 });
    //     // debugVertex1.pos.x = 50;
    //     // debugVertex1.pos.y = 60;

    //     let debugEdge1 = new Edge(debugVertex2); // 1 to 2
    //     let debugEdge2 = new Edge(debugVertex3); // 2 to 3

    //     this.vertexes.push(debugVertex1, debugVertex2, debugVertex3);

    //     debugVertex1.edges.push(debugEdge1);
    //     debugVertex2.edges.push(debugEdge2);
    // }

    /**
     * Create a random graph
     */
    randomize(width, height, pxBox, probability = 0.6) {
        // Helper function to set up two-way edges
        function connectVerts(v0, v1) {
            v0.edges.push(new Edge(v1));
            v1.edges.push(new Edge(v0));
        }

        let count = 0;

        // Build a grid of verts
        let grid = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                let v = new Vertex();
                v.value = "v" + x + "," + y;
                v.value = "v" + count++;
                row.push(v);
            }
            grid.push(row);
        }

        // Go through the grid randomly hooking up edges
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Connect down
                if (y < height - 1) {
                    if (Math.random() < probability) {
                        connectVerts(grid[y][x], grid[y + 1][x]);
                    }
                }

                // Connect right
                if (x < width - 1) {
                    if (Math.random() < probability) {
                        connectVerts(grid[y][x], grid[y][x + 1]);
                    }
                }
            }
        }

        // Last pass, set the x and y coordinates for drawing
        const boxBuffer = 0.8;
        const boxInner = pxBox * boxBuffer;
        const boxInnerOffset = (pxBox - boxInner) / 2;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                grid[y][x].pos = {
                    x: (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
                    y: (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
                };
            }
        }

        // Finally, add everything in our grid to the vertexes in this Graph
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.vertexes.push(grid[y][x]);
            }
        }
    }

    /**
     * Dump graph data to the console
     */
    dump() {
        let s;

        for (let v of this.vertexes) {
            if (v.pos) {
                s = v.value + " (" + v.pos.x + "," + v.pos.y + "):";
            } else {
                s = v.value + ":";
            }

            for (let e of v.edges) {
                s += ` ${e.destination.value}`;
            }
            console.log(s);
        }
    }

    // generates a random RGB color for each vertex
    randomColorGen() {
        const randomNum = () => {
            return Math.floor(Math.random() * 256);
        };

        const [red, green, blue] = [randomNum(), randomNum(), randomNum()];
        return `rgb(${red}, ${green}, ${blue})`;
    }

    /**
     * BFS
     */

    bfs(start) {
        const found = [];
        const queue = [start];
        const color = this.randomColorGen();

        start.color = color;

        while (queue.length > 0) {
            const vertex = queue[0];

            for (let edge of vertex.edges) {
                if (!found.includes(edge.destination)) {
                    found.push(edge.destination);
                    queue.push(edge.destination);
                    // add color
                    edge.destination.color = color;
                }
            }

            queue.shift(); // de-queue
            // vertex.color = "black";
            found.push(vertex);
        }
        return found;
    }

    /**
     * Get the connected components
     */
    getConnectedComponents() {
        let searched = [];

        for (let vertex of this.vertexes) {
            if (!searched.includes(vertex)) {
                searched = searched.concat(this.bfs(vertex));
            }
        }
    }
}
