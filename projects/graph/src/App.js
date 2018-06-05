import React, { Component } from "react";
import { Graph } from "./graph";
import "./App.css";

// !!! IMPLEMENT ME
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

/**
 * GraphView
 */
class GraphView extends Component {
    /**
     * On mount
     */
    componentDidMount() {
        this.updateCanvas();
    }

    /**
     * On state update
     */
    componentDidUpdate() {
        this.updateCanvas();
    }

    /**
     * Render the canvas
     */
    updateCanvas() {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");

        // Clear it
        // boxes
        // ctx.fillStyle = "black";
        // ctx.fillRect(100, 100, 100, 100);
        // ctx.fillRect(400, 100, 100, 100);
        // ctx.fillRect(300, 300, 100, 100);

        // draw many objects

        // arcs
        // for (let i = 0; i < 50; i++) {
        //     const xSquare = Math.random() * canvasWidth;
        //     const ySquare = Math.random() * canvasHeight;

        //     ctx.rect(xSquare, ySquare, 100, 100);
        //     ctx.strokeStyle = "black";
        //     ctx.stroke();
        // }

        // square
        // for (let i = 0; i < 50; i++) {
        //     const x = Math.random() * canvasWidth;
        //     const y = Math.random() * canvasHeight;

        //     ctx.beginPath();
        //     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
        //     ctx.strokeStyle = "red";
        //     ctx.stroke();
        // }

        // window resize
        // window.addEventListener("resize", () => {
        //     const canvasWidth = window.innerWidth;
        //     const canvasHeight = window.innerHeight;
        //     init();
        // });

        // mouse event
        const mouse = {
            x: null,
            y: null,
        };

        window.addEventListener("mousemove", event => {
            // console.log(event);
            mouse.x = event.x;
            mouse.y = event.y;
            // console.log(mouse);
        });

        // circle creator below
        function Circle(x, y, xV, yV, radius) {
            this.x = x;
            this.y = y;
            this.xV = xV;
            this.yV = yV;
            this.radius = radius;
            this.maxRadius = 80;
            this.minRadius = radius;
            this.colorArr = ["#CFC291", "#CFC291", "#A1E8D9", "#FF712C", "#695D46"];
            this.color = this.colorArr[Math.floor(Math.random() * this.colorArr.length)];

            this.draw = function() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.stroke();
            };

            this.update = function() {
                if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
                    this.xV = -this.xV;
                }

                if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
                    this.yV = -this.yV;
                }

                this.x += this.xV;
                this.y += this.yV;

                // mouse interactivity
                if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                    // controls max size
                    if (this.radius < this.maxRadius) this.radius += 1;
                }
                // returns radius to original size
                else if (this.radius > this.minRadius) this.radius -= 1;

                this.draw();
            };
        }

        const circleArr = [];

        const circleNum = 1000;

        for (let i = 0; i < circleNum; i++) {
            let cirRadius = Math.random() * 3 + 1;
            let x = Math.random() * (canvasWidth - cirRadius * 2) + cirRadius;
            let y = Math.random() * (canvasHeight - cirRadius * 2) + cirRadius;
            let xV = (Math.random() - 0.5) * 4;
            let yV = (Math.random() - 0.5) * 4;
            circleArr.push(new Circle(x, y, xV, yV, cirRadius));
        }

        // animation
        function animate() {
            requestAnimationFrame(animate);

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            for (let i = 0; i < circleArr.length; i++) {
                circleArr[i].update();
            }
        }
        animate();

        // !!! IMPLEMENT ME
        // compute connected components
        // draw edges
        // draw verts
        // draw vert values (labels)
    }

    /**
     * Render
     */
    render() {
        return <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />;
    }
}

/**
 * App
 */
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graph: new Graph(),
        };

        // !!! IMPLEMENT ME
        // use the graph randomize() method
    }

    render() {
        return (
            <div className="App">
                <GraphView graph={this.state.graph} />
            </div>
        );
    }
}

export default App;
