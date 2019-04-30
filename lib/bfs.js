const {error, Queue} = require('@trop/gear')

const {
    verify_search_input,
    get_unvisited_neighbours
} = require('./util')

// Description
// * Apply Breadth First Search on graph
// * Input, output and exception like dfs()
function bfs(graph, start, callback) {
    verify_search_input(graph, start, callback)

    let queue = new Queue([start])
    let visited = new Set([start])
    let terminate = callback(start)

    for (; queue.size > 0 && !terminate;) {
        terminate = _visit_vertex(graph, queue, visited, callback)
    }
    return terminate
}

module.exports = bfs

// PRIVATE MEMBERS

// Desciption
// * Visit a vertex
// * Push unvisited neighbours to queue
// * Remove vertex from queue and execute callback if it is visited
//
// Input
// * queue / Queue<any>
// * visited / Set<any>
// * callback / Function(id) - It is similar like callback of bfs()
function _visit_vertex(graph, queue, visited, callback) {
    let front = queue.pop()

    let neighbours = graph.neighbours(front)
    let unvisited = get_unvisited_neighbours(visited, neighbours)

    for (let v of unvisited) {
        visited.add(v)
        queue.push(v)
        if (callback(v)) {
            return true
        }
    }
}
