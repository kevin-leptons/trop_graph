const {Stack} = require('@trop/gear')

const {
    verify_search_input,
    get_unvisited_neighbours
} = require('./util')

// Description
// * Apply Depth First Search on graph
// * No guarantee for visiting all of vertexes, it's depend
//   start vertex and graph's structure
//
// Input
// * start / any - Vertex to start visiting
// * callback / Function(id) - It will be call on each vertex which is visited.
//   A vertex called visited if all it's neighbours is visited.
//
//   Input
//      * id / any - identity of vertex which is pass through
//   Output
//      * Boolean - true on need to be exit searching; not true
//        on no need to be exit searching
//
// Output
// * Boolean - true on searching is terminates by callback; false on
//   normal exiting
//
// Exception
// * NotFound - Start vertex does not exists
// * TypeError - Callback is not callable
function dfs(graph, start, callback) {
    verify_search_input(graph, start, callback)

    let stack = new Stack([start])
    let visited = new Set()
    let terminate = false

    for (; stack.size > 0 && !terminate;) {
        terminate = _visit_vertex(graph, stack, visited, callback)
    }
    return terminate
}

module.exports = dfs

// PRIVATE MEMBERS

// Desciption
// * Visit a vertex
// * Push unvisited neighbours to stack
// * Remove vertex from stack and execute callback if it is visited
//
// Input
// * graph / DirectedGraph
// * stack / Stack<any>
// * visited / Set<any>
// * callback / Function(id) - It is similar like callback of dfs()
function _visit_vertex(graph, stack, visited, callback) {
    let top = stack.top()
    let neighbours = graph.neighbours(top)
    let unvisited = get_unvisited_neighbours(visited, neighbours)

    if (unvisited.length === 0) {
        visited.add(top)
        stack.pop()
        return callback(top)
    }

    for (let vertex of unvisited) {
        stack.push(vertex)
    }
}
