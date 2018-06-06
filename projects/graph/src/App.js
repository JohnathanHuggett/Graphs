import React, { Component } from "react";
import { Graph } from "./graph";
import "./App.css";

// !!! IMPLEMENT ME
const canvasWidth = 750;
const canvasHeight = 600;

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
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "16px Arial";

        const vertexSize = 15;

        for (let vertex of this.props.graph.vertexes) {
            for (let edge of vertex.edges) {
                ctx.beginPath();
                ctx.moveTo(vertex.pos.x, vertex.pos.y);
                ctx.lineTo(edge.destination.pos.x, edge.destination.pos.y);
                ctx.stroke();
            }
        }

        for (let vertex of this.props.graph.vertexes) {
            ctx.beginPath();
            ctx.arc(vertex.pos.x, vertex.pos.y, vertexSize, 0, 2 * Math.PI);

            ctx.fillStyle = "white";
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.fillText(vertex.value, vertex.pos.x, vertex.pos.y);

            ctx.stroke();
        }
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
        this.state.graph.randomize(5, 4, 150, 0.06);
        this.state.graph.bfs();

        // this.state.graph.debugCreateTestData();
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
