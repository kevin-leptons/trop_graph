const {error} = require('@trop/gear')

// Desciption
// * Check arguments is valid or not
//
// Input
// * graph / DirectedGraph - Graph to check on
// * Rest of arguments are similar like input of dfs()
//
// Output - none
//
// Exception
// * NotFound - Start vertex does not exists
// * TypeError - Callback is not callable
function verify_search_input(graph, start, callback) {
    if (!graph.vertexes.has(start)) {
        throw new error.NotFound('Vertex does not exists')
    }
    if (typeof callback !== 'function') {
        throw new TypeError('Callback is not callable')
    }
}

// Desciption
// * Find out unvisited neighbours
//
// Input
// * visited / Set<any> - Contains current visited vertexes
// * neighbours / Set<any> - Contains neighbour vertexes
//
// Output
// * Array<any> - List of vertexes which is not in visited
function get_unvisited_neighbours(visited, neighbours) {
    let unvisited = []

    for (let vertex of neighbours) {
        if (!visited.has(vertex)) {
            unvisited.push(vertex)
        }
    }
    return unvisited
}

module.exports = {
    verify_search_input,
    get_unvisited_neighbours
}
