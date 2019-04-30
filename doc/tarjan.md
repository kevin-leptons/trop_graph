# Tarjan

```js
const {tarjan} = require('@trop/graph')
```

## tarjan(graph)

* Description
    * Find strongly connected components in a directed graph
* Input
    * `graph` / `DirectedGraph`
* Output
    * `Set<Set<any>>` - Set of strongly connected components, where a component
      is set of vertexes
* Exception
    * `TypeError` - Graph is not an instance of `DirectedGraph`

## Example

```js
const {tarjan, DirectedGraph} = require('@trop/graph')

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
```
