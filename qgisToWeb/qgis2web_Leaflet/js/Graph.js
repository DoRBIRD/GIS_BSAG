var Graph = function() {
    this.vertices = {};
};

Graph.prototype.add = function(name, edges) {
    edges = edges || null;
    this.vertices[name] = edges;
};

Graph.prototype.findShortestPath = function(source, end) {

    var remainingNodes = this.vertices;

    var distanceOfNodes = {};
    var previousNodes = {};

    for (var vertex in this.vertices) {
        distanceOfNodes[vertex] = Infinity;
        previousNodes[vertex] = undefined;
    }

    distanceOfNodes[source] = 0;

    while (Object.keys(remainingNodes).length !== 0) {

        var currentNode = getNodeWithMinimumDistance(remainingNodes, distanceOfNodes);

        for (var neighborNode in this.vertices[currentNode]) {
            var alternateDistance = distanceOfNodes[currentNode]
                + distanceBetweenNodes(this.vertices, currentNode, neighborNode);

            if (alternateDistance < distanceOfNodes[neighborNode]) {
                distanceOfNodes[neighborNode] = alternateDistance;
                previousNodes[neighborNode] = currentNode;
            }
        }

        delete remainingNodes[currentNode];
    }

    var path = [];
    var currentNode = end;
    while (distanceOfNodes[currentNode] !== 0) {
        path.push(currentNode);
        currentNode = previousNodes[currentNode];
    }
    path.push(source);

    return path.reverse();
};

function distanceBetweenNodes(vertices, currentNode, targetNode) {
    return (vertices[currentNode][targetNode]);
};

function getNodeWithMinimumDistance(Q, dist) {
    var minimumDistance = Infinity;
    var nodeWithMinimumDistance;

    for (var node in Q) {
        if (dist[node] <= minimumDistance) {
            minimumDistance = dist[node];
            nodeWithMinimumDistance = node;
        }
    }
    return nodeWithMinimumDistance;
}


var G = new Graph();
G.add('A', { B: 1, C: 4 });
G.add('C', { D: 3 });
G.add('B', { C: 2, D: 6 });
G.add('D');

console.log(G.findShortestPath('A', 'D'));