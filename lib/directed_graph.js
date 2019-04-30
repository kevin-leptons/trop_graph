const {error, Stack, Queue} = require('@trop/gear')

class DirectedGraph {
    // Description
    // * A way to build and retrieve directed graph
    //
    // Input
    // * vertexes / Array<any> / [] - List of vertexes
    // * edges / Array<Array<any>[2]> - List of edges
    //
    // Exception
    // * TypeError - Vertexes must be an array
    // * TypeError - Edges must be an array
    // * TypeError - Edges[i] must be an array with two elements
    constructor(vertexes=[], edges=[]) {
        this._verify_constructor_input(vertexes, edges)

        // Map<key, value>
        // * key / any - identity of vertex
        // * value / Object - vertex's information
        //  * id / any - identity of vertex, silimar like key
        //  * data / any - coresspond data of vertex
        this._vertexes = new Map()
        this._import_vertexes(vertexes)

        // Map<key, value>
        // * key / any - identity of vertex
        // * value / Set<any> - set of neighbour vertexes
        this._edges = new Map()
        this._import_edges(edges)
    }

    // See this._vertexes
    get vertexes() {
        return this._vertexes
    }

    // See this._edges
    get edges() {
        return this._edges
    }

    // Description
    // * Add a vertex to graph
    //
    // Input
    // * id / any - Vertex's identity
    // * data / any - Data corresponds with vertex
    //
    // Output - none
    //
    // Exception
    // * Conflict - Vertex is already existed
    add_vertex(id, data=null) {
        if (this._vertexes.has(id)) {
            throw new error.Conflict('Vertex is already existed')
        }
        this._vertexes.set(id, {
            id: id,
            data: data
        })
    }

    // Description
    // * Add an edge to graph
    //
    // Input
    // * begin / any - begin vertex
    // * end / any - end vertex
    //
    // Output - none
    //
    // Exception
    // * NotFound - Begin vertex does not exists
    // * NotFound - End vertex does not exists
    // * Conflict - Edge is already existed
    add_edge(begin, end) {
        if (!this._vertexes.has(begin)) {
            throw new error.NotFound('Begin vertex does not exists')
        }
        if (!this._vertexes.has(end)) {
            throw new error.NotFound('End vertex does not exists')
        }

        let neighbours = this._edges.get(begin)
        if (!neighbours) {
            neighbours = new Set()
            this._edges.set(begin, neighbours)
        }
        if (neighbours.has(end)) {
            throw new error.Conflict('Edge is already existed')
        }

        neighbours.add(end)
    }

    // Desciption
    // * Retrieve vertex's information by index
    //
    // Input
    // * index / any - Identity of vertex
    //
    // Output
    // * Object - Vertex's information
    //  * id / any - identity of vertex
    //  * data / any - coresspond data of vertex
    //  * and other attributes which is assigns by other agents
    //
    // Exception
    // * NotFound - Vertex does not exists
    vertex(index) {
        if (!this._vertexes.has(index)) {
            throw new error.NotFound('Vertex does not exists')
        }

        return this._vertexes.get(index)
    }

    // Desciption
    // * Retrieve set of neighbours from a vertex
    //
    // Input
    // * vertex / any - Identity of begin vertex
    //
    // Ouput
    // * Set<any> - Set of identity of neighbour vertexes
    //
    // Exception
    // * NotFound - Vertex does not exists
    neighbours(vertex) {
        if (!this._vertexes.has(vertex)) {
            throw new error.NotFound('Vertex does not exists')
        }

        return this._edges.get(vertex) || new Set()
    }

    // Desciption
    // * Check edge [begin, end] is existed
    //
    // Input
    // * begin / any - Identity of begin vertex
    // * end / any - Identity of end vertex
    //
    // Output
    // * Boolean - true on edge is existed, false on edge is not existed
    has_edge(begin, end) {
        let neighbours = this._edges.get(begin)

        return (!neighbours || !neighbours.has(end)) ? false : true
    }

	// Description
	// * Remove a vertex from graph
	//
	// Input
	// * index / any - Identity of vertex to remove
	//
	// Output - none
	//
	// Exception
	// * NotFound - Vertex does not exists
	// * Conflict - Vertex is in other edges
    delete_vertex(index) {
        if (!this._vertexes.has(index)) {
            throw new error.NotFound('Vertex does not exists')
        }

        let neighbours = this._edges.get(index)
        if (neighbours && neighbours.size > 0) {
            throw new error.Conflict('Vertex is in other edges')
        }

        this._vertexes.delete(index)
    }

	// Desciption
	// * Remove an edge from graph
	//
	// Input
	// * begin / any - Identity of begin vertex
	// * end / any - Identity of end vertex
	//
	// Output - none
	//
	// Exception
	// * NotFound - Edge does not exists
    delete_edge(begin, end) {
        let neighbours = this._edges.get(begin)
        if (!neighbours || !neighbours.has(end)) {
            throw new error.NotFound('Edge does not exists')
        }

        neighbours.delete(end)
    }

    // PRIVATE MEMBERS

    // Desciption
    // * Verify constructor arguments
    //
    // Input - It is similar like constructor arguments
    //
    // Output - None
    //
    // Exception
    // * TypeError - Vertexes must be an array
    // * TypeError -  Edges must be an array
    // * TypeError - Edges[i] must be an array with two elements
    _verify_constructor_input(vertexes, edges) {
        if (!Array.isArray(vertexes)) {
            throw TypeError('Vertexes must be an array')
        }
        if (!Array.isArray(edges)) {
            throw TypeError('Edges must be an array')
        }
        for (let edge of edges) {
            if (!Array.isArray(edge) || edge.length !== 2) {
                throw TypeError('Edges[i] must be an array with two elements')
            }
        }
    }

    // Desciption
    // * Import vertexes from an array
    // * Does not support for vertex's data
    //
    // Input
    // * vertexes - It is similar like argument vertexes from constructor()
    //
    // Output - none
    //
    // Exception - It is similar like add_vertex()
    _import_vertexes(vertexes) {
        for (let v of vertexes) {
            this.add_vertex(v)
        }
    }

    // Desciption
    // * Import edges from an array
    //
    // Input
    // * edges - It is similar like argument edges from constructor()
    //
    // Output - none
    //
    // Exception - It is similar like add_edge()
    _import_edges(edges) {
        for (let edge of edges) {
            this.add_edge(edge[0], edge[1])
        }
    }
}

module.exports = DirectedGraph
