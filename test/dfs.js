const assert = require('assert')

const {dfs, DirectedGraph} = require('../lib')

describe('dfs()', () => {
    it('start with vertex which has no edge', () => {
        let g = new DirectedGraph([1, 2, 3, 4], [
            [2, 3],
            [2, 4]
        ])

        let visited_arr = []
        dfs(g, 1, (v) => {
            visited_arr.push(v)
        })
        let visited = new Set(visited_arr)

        assert.equal(visited.size, visited_arr.length)
        assert(visited.has(1))
        assert(!visited.has(2))
        assert(!visited.has(3))
        assert(!visited.has(4))
    })

    it('start with vertex in a insland', () => {
        let g = new DirectedGraph([1, 2, 3, 4, 5], [
            [1, 2],
            [1, 3],
            [2, 3]
        ])

        let visited_arr = []
        dfs(g, 1, (v) => {
            visited_arr.push(v)
        })
        let visited = new Set(visited_arr)

        assert.equal(visited.size, visited_arr.length)
        assert(visited.has(1))
        assert(visited.has(2))
        assert(visited.has(3))
        assert(!visited.has(4))
        assert(!visited.has(5))
    })

    it('start with vertex and visit to all of others vertexes', () => {
        let g = new DirectedGraph([1, 2, 3, 4, 5], [
            [1, 2],
            [1, 3],
            [2, 3],
            [3, 4],
            [4, 5]
        ])

        let visited_arr = []
        dfs(g, 1, (v) => {
            visited_arr.push(v)
        })
        let visited = new Set(visited_arr)

        assert(visited.has(1))
        assert(visited.has(2))
        assert(visited.has(3))
        assert(visited.has(4))
        assert(visited.has(5))
    })

    it('start with vertex does not exists', () => {
        let g = new DirectedGraph([1, 2, 3], [
            [1, 2],
            [2, 3]
        ])

        assert.throws(() => {
            dfs(g, 4, () => {})
        }, {
            name: 'NotFound',
            message: 'Vertex does not exists'
        })
    })

    it('with empty graph', () => {
        let g = new DirectedGraph()

        assert.throws(() => {
            dfs(g, 1, () => {})
        }, {
            name: 'NotFound',
            message: 'Vertex does not exists'
        })
    })
})
