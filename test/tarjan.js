const assert = require('assert')

const {tarjan, DirectedGraph} = require('../lib')

describe('tarjan()', () => {
    it('with empty graph', () => {
        let g = new DirectedGraph()
        let sccs = tarjan(g)

        assert.equal(sccs.size, 0)
    })

    it('with graph has vertexes and no edges', () => {
        let vertexes = [1, 2, 3]
        let g = new DirectedGraph(vertexes)
        let sccs = tarjan(g)

        assert.equal(sccs.size, vertexes.length)
    })

    it('with graph has a strong connected component', () => {
        let vertexes = [1, 2, 3]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 1]
        ]
        let g = new DirectedGraph(vertexes, edges)

        let sccs = tarjan(g)
        assert.equal(sccs.size, 1)

        let scc = sccs.values().next().value
        assert(scc.has(1))
        assert(scc.has(2))
        assert(scc.has(3))
    })

    it('with graph has two strong connected components', () => {
        let vertexes = [1, 2, 3, 4, 5]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 1],
            [4, 5],
            [5, 4]
        ]
        let g = new DirectedGraph(vertexes, edges)

        let sccs = tarjan(g)
        assert.equal(sccs.size, 2)
    })

    it('with graph has three strong connected components', () => {
        let vertexes = [1, 2, 3, 4, 5, 6]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 1],
            [4, 5],
            [5, 4]
        ]
        let g = new DirectedGraph(vertexes, edges)

        let sccs = tarjan(g)
        assert.equal(sccs.size, 3)
    })

    it('with graph has four strong connected components', () => {
        let vertexes = [1, 2, 3, 4, 5, 6, 7]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 1],
            [4, 5],
            [5, 4]
        ]
        let g = new DirectedGraph(vertexes, edges)

        let sccs = tarjan(g)
        assert.equal(sccs.size, 4)
    })

    it('with graph has four strong connected components', () => {
        let vertexes = [1, 2, 3, 4, 5]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5]
        ]
        let g = new DirectedGraph(vertexes, edges)

        let sccs = tarjan(g)
        assert.equal(sccs.size, 5)
    })
})
