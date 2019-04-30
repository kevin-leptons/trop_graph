const {Stack} = require('@trop/gear')

const DirectedGraph = require('./directed_graph')
const tarjan = require('./tarjan')

// Description
// * Find out all of cycles on directed graph
//
// Input
// * graph / DirectedGraph
//
// Output
// * Set<Set<any>> - Set of cycles, where a cycle is set of vertexes
//
// Exception
// * TypeError - Graph is not an instance of DirectedGraph
function find_cycles(graph) {
    let strong_connected_components = tarjan(graph)

    return _remove_no_loop_components(graph, strong_connected_components)
}

// PRIVATE MEMBERS

function _remove_no_loop_components(graph, components) {
    let cycles = new Set()

    for (let com of components) {
        if (_is_cycle_component(graph, com)) {
            cycles.add(com)
        }
    }

    return cycles
}

function _is_cycle_component(graph, component) {
    if (component.size === 0) {
        return false
    } else if (component.size === 1) {
        let it = component.values()
        let v = it.next().value

        return graph.has_edge(v, v)
    }

    return true
}

module.exports = find_cycles
