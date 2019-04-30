const assert = require('assert')

const {DirectedGraph, find_cycles} = require('../lib')

describe('find_cycles()', () => {
    it('has only one vertex', () => {
        let vertexes = [1]
        let g = new DirectedGraph(vertexes)
        let c = find_cycles(g)

        assert.equal(c.size, 0)
    })

    it('there are no cycles', () => {
        let vertexes = [1, 2, 3, 4]
        let edges = [
            [1, 2],
            [2, 3]
        ]
        let g = new DirectedGraph(vertexes, edges)
        let c = find_cycles(g)

        assert.equal(c.size, 0)
    })

    it('there are a cycle', () => {
        let vertexes =  [1, 2, 3, 4]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 1]
        ]
        let g = new DirectedGraph(vertexes, edges)
        let c = find_cycles(g)

        assert.equal(c.size, 1)
    })

    it('there are three cycles', () => {
        let vertexes = [1, 2, 3, 4, 5, 6, 7, 8]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 1],

            [4, 5],
            [5, 4],

            [7, 8],
            [8, 7]
        ]
        let g = new DirectedGraph(vertexes, edges)
        let c = find_cycles(g)

        assert.equal(c.size, 3)
    })

    it('there are 4 cycles, self link', () => {
        let vertexes = [1, 2, 3, 4, 5, 6, 7, 8]
        let edges = [
            [1, 2],
            [2, 3],
            [3, 1],

            [4, 5],
            [5, 4],

            [6, 7],
            [7, 6],

            [8, 8],

            [4, 3],
            [5, 6],
            [8, 7]
        ]
        let g = new DirectedGraph(vertexes, edges)
        let c = find_cycles(g)

        assert.equal(c.size, 4)
    })
})
