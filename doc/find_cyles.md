# Find Cycle

```js
const {find_cycles} = require('@trop/graph')
```

## find_cycles(graph)

* Description
    * Find out all of cycles on directed graph
* Input
    * `graph` / `DirectedGraph`
* Output
    * Set<Set<any>> - Set of cycles, where a cycle is set of vertexes
* Exception
    * `TypeError` - Graph is not an instance of `DirectedGraph`

## Example

```js
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
```
