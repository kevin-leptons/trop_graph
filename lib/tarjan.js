const {Stack} = require('@trop/gear')

const DirectedGraph = require('./directed_graph')

// Description
// * Find strongly connected components in a directed graph
//
// Input
// * graph / DirectedGraph
//
// Output
// * Set<Set<any>> - Set of strongly connected components, where a component
//   is set of vertexes
//
// Exception
// * TypeError - Graph is not an instance of DirectedGraph
function tarjan(graph) {
    _verify_input(graph)

    let context = {
        index: 0,
        stack: new Stack(),
        components: new Set()
    }
    for (let v of graph.vertexes.values()) {
        if (v.index === undefined) {
            _visit_vertex(graph, v, context)
        }
    }

    return context.components
}

// PRIVATE MEMBERS

// Desciption
// * Verify arguments of tarjan()
//
// Input - It is similar like input of tarjan()
//
// Output - none
//
// Exception
// * TypeError - Graph must be an instance of DirectedGraph
function _verify_input(graph) {
    if (!graph instanceof DirectedGraph) {
        throw TypeError('Graph must be an instance of DirectedGraph')
    }
}

// Desciption
// * Visit vertex
// * Mark vindex and v.lowlink
// * If v.index = v.lowlink then collect Strong Connected Components
//
// Input
// * graph / DirectedGraph
// * v / any - Vertex to visit
// * context / Object - Maintain information
//      * index / Number - Non-negative integer
//      * stack / Stack - Current stack
//      * components / Set<Set<any>> - Set of current Strong Connected
//        Components
//
// Output - none
function _visit_vertex(graph, v, context) {
    v.index = context.index
    v.lowlink = context.index
    context.index += 1
    context.stack.push(v)
    v.on_stack = true

    for (let w_id of graph.neighbours(v.id)) {
        let w = graph.vertex(w_id)

        if (w.index === undefined) {
            _visit_vertex(graph, w, context)
            v.lowlink = Math.min(v.lowlink, w.lowlink)
        } else if (w.on_stack) {
            v.lowlink = Math.min(v.lowlink, w.index)
        }
    }

    if (v.lowlink === v.index) {
        _build_strong_connected_components(v, context)
    }
}

// Desciption
// * Build Strong Connected Components from stack and vertex
// * New Strong Connected Components is add to context.components
//
// Input
// * v / Number - Non-negative integer, vertex
// * context / Object - It is similar like argument context
//   from _visit_vertex()
//
// Output - none
function _build_strong_connected_components(v, context) {
    let cycle = new Set()

    for (;;) {
        let w = context.stack.pop()

        w.on_stack = false
        cycle.add(w.id)

        if (w === v) {
            break
        }
    }

    context.components.add(cycle)
}

module.exports = tarjan
