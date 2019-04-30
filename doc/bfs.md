# Breadth First Search

```js
const {bfs} = require('@trop/graph')
```

## bfs(graph, begin, callback)

Input, output and exception is similar like [dfs](dfs.md)

## Example

```js
const {bfs, DirectedGraph} = require('@trop/graph')

let g = new DirectedGraph()

g.add_vertex(1)
g.add_vertex(2)
g.add_vertex(3)
g.add_vertex(4)
g.add_vertex(5)

g.add_edge(1, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)

bfs(g, 1, (v) => {
    console.log('Visited', v)
})
```
