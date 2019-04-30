const assert = require('assert')

const {DirectedGraph} = require('../lib')

describe('DirectedGraph.constructor()', () => {
    it('with default arguments', () => {
        new DirectedGraph()
    })

    it('with list of vertexes', () => {
        let vertexes = [1, 2, 3]
        let g = new DirectedGraph(vertexes)

        assert.equal(g.vertexes.size, vertexes.length)
        assert(g.vertexes.has(1))
        assert(g.vertexes.has(2))
        assert(g.vertexes.has(3))
    })

    it('with list of vertexes and edges', () => {
        let vertexes = [1, 2, 3]
        let edges = [
            [1, 2],
            [1, 3],
            [2, 3]
        ]
        let g = new DirectedGraph(vertexes, edges)

        assert.equal(g.vertexes.size, vertexes.length)
        assert.equal(g.edges.size, 2)
    })

    it('edges contains not existed vertexes at begin', () => {
        let vertexes = [1, 2, 3]
        let edges = [
            [1, 2],
            [1, 3],
            [2, 3],
            [4, 3]
        ]

        assert.throws(() => {
            new DirectedGraph(vertexes, edges)
        }, {
            name: 'NotFound',
            message: 'Begin vertex does not exists'
        })
    })

    it('edges contains not existed vertexes at end', () => {
        let vertexes = [1, 2, 3]
        let edges = [
            [1, 2],
            [1, 3],
            [2, 3],
            [3, 4]
        ]

        assert.throws(() => {
            new DirectedGraph(vertexes, edges)
        }, {
            name: 'NotFound',
            message: 'End vertex does not exists'
        })
    })


    it('with vertexes is number', () => {
        assert.throws(() => {
            new DirectedGraph(1)
        }, {
            name: 'TypeError',
            message: 'Vertexes must be an array'
        })
    })

    it('with edges is number', () => {
        assert.throws(() => {
            new DirectedGraph([], 1)
        }, {
            name: 'TypeError',
            message: 'Edges must be an array'
        })
    })

    it('with edges[i] is number', () => {
        assert.throws(() => {
            new DirectedGraph([], [1])
        }, {
            name: 'TypeError',
            message: 'Edges[i] must be an array with two elements'
        })
    })

    it('with edges[i] is array[1]', () => {
        assert.throws(() => {
            new DirectedGraph([], [
                [1]
            ])
        }, {
            name: 'TypeError',
            message: 'Edges[i] must be an array with two elements'
        })
    })

    it('with edges[i] is array[3]', () => {
        assert.throws(() => {
            new DirectedGraph([], [
                [1, 2, 3]
            ])
        }, {
            name: 'TypeError',
            message: 'Edges[i] must be an array with two elements'
        })
    })
})

describe('DirectedGraph.add_vertex()', () => {
    it('with id is a number', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
    })

    it('with id is string', () => {
        let g = new DirectedGraph()

        g.add_vertex('this is string')
    })

    it('with id is boolean', () => {
        let g = new DirectedGraph()

        g.add_vertex(true)
        g.add_vertex(false)
    })

    it('with id is array', () => {
        let g = new DirectedGraph()

        g.add_vertex([1, 2, 3])
    })

    it('with id is object', () => {
        let g = new DirectedGraph()

        g.add_vertex({})
    })

    it('with id is class', () => {
        let g = new DirectedGraph()
        class A {}

        g.add_vertex(A)
    })

    it('with existed id', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)

        assert.throws(() => {
            g.add_vertex(1)
        }, {
            name: 'Conflict',
            message: 'Vertex is already existed'
        })
    })
})

describe('DirectedGraph.add_edge()', () => {
    it('with [1, 2]', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)

        g.add_edge(1, 2)
    })

    it('with [1, 2], 1 does not exists', () => {
        let g = new DirectedGraph()

        g.add_vertex(2)

        assert.throws(() => {
            g.add_edge(1, 2)
        }, {
            name: 'NotFound',
            message: 'Begin vertex does not exists'
        })
    })

    it('with [1, 2], 2 does not exists', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)

        assert.throws(() => {
            g.add_edge(1, 2)
        }, {
            name: 'NotFound',
            message: 'End vertex does not exists'
        })
    })

    it('with existed edge', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)

        g.add_edge(1, 2)

        assert.throws(() => {
            g.add_edge(1, 2)
        }, {
            name: 'Conflict',
            message: 'Edge is already existed'
        })
    })
})

describe('DirectedGraph.vertexes', () => {
    it('wit empty graph', () => {
        let g = new DirectedGraph()

        assert.equal(g.vertexes.constructor, Map)
        assert.equal(g.vertexes.size, 0)
    })
    it('with non-empty graph', () => {
        let g = new DirectedGraph()

        g.add_vertex(1, {
            message: 'one'
        })

        let vertexes = g.vertexes
        assert.equal(vertexes.constructor, Map)
        assert.equal(vertexes.size, 1)

        let v1 = vertexes.get(1)
        assert.equal(v1.id, 1)
        assert.equal(v1.data.message, 'one')
    })
})

describe('DirectedGraph.edges()', () => {
    it('with empty edges graph', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)

        assert.equal(g.edges.constructor, Map)
        assert.equal(g.edges.size, 0)
    })

    it('with non-empty edges graph', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)
        g.add_vertex(3)

        g.add_edge(1, 2)
        g.add_edge(1, 3)

        assert.equal(g.edges.constructor, Map)
        assert.equal(g.edges.size, 1)

        let neighbours = g.edges.get(1)
        assert.equal(neighbours.constructor, Set)
        assert.equal(neighbours.size, 2)
        assert(neighbours.has(2))
        assert(neighbours.has(3))
    })
})

describe('DirectedGraph.vertex()', () => {
    it('with existed vertex', () => {
        let g = new DirectedGraph()

        g.add_vertex(1, {
            message: 'one'
        })

        let v1 = g.vertex(1)

        assert.equal(v1.id, 1)
        assert.equal(v1.data.message, 'one')
    })

    it('with not existed vertex', () => {
        let g = new DirectedGraph()

        g.add_vertex(1, {
            message: 'one'
        })

        assert.throws(() => {
            g.vertex(2)
        }, {
            name: 'NotFound',
            message: 'Vertex does not exists'
        })
    })
})

describe('DirectedGraph.neighbours()', () => {
    it('vertex is existed, there are few neighbours', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)
        g.add_vertex(3)

        g.add_edge(1, 2)
        g.add_edge(1, 3)

        let neighbours = g.neighbours(1)
        assert.equal(neighbours.constructor, Set)
        assert.equal(neighbours.size, 2)
    })

    it('vertex is existed, there are no neighbours', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)

        let neighbours = g.neighbours(1)
        assert.equal(neighbours.constructor, Set)
        assert.equal(neighbours.size, 0)
    })

    it('vertex does not exists', () => {
        let g = new DirectedGraph()

        assert.throws(() => {
            g.neighbours(1)
        }, {
            name: 'NotFound',
            message: 'Vertex does not exists'
        })
    })
})

describe('DirectedGraph.has_edge()', () => {
    it('with existed edge', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)

        g.add_edge(1, 2)

        let existed = g.has_edge(1, 2)
        assert.equal(existed, true)
    })

    it('with not existed edges', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)

        let existed = g.has_edge(1, 2)
        assert.equal(existed, false)
    })
})

describe('DirectedGraph.delete_vertex()', () => {
    it('with existed vertex', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.delete_vertex(1)
    })

    it('with not existed vertex', () => {
        let g = new DirectedGraph()

        assert.throws(() => {
            g.delete_vertex(1)
        }, {
            name: 'NotFound',
            message: 'Vertex does not exists'
        })
    })

    it('vertex is in other edges', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)
        g.add_vertex(3)

        g.add_edge(1, 2)
        g.add_edge(1, 3)

        assert.throws(() => {
            g.delete_vertex(1)
        }, {
            name: 'Conflict',
            message: 'Vertex is in other edges'
        })
    })
})

describe('DirectedGraph.delete_edge()', () => {
    it('with existed edge', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)
        g.add_edge(1, 2)

        g.delete_edge(1, 2)
    })

    it('with not existed edge', () => {
        let g = new DirectedGraph()

        g.add_vertex(1)
        g.add_vertex(2)

        assert.throws(() => {
            g.delete_edge(1, 2)
        }, {
            name: 'NotFound',
            message: 'Edge does not exists'
        })
    })
})
