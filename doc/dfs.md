# Depth First Search

```js
const {dfs} = require('@trop/graph')
```

## dfs(graph, begin, callback)

* Description
    * Apply Depth First Search on graph
    * No guarantee for visiting all of vertexes, it's depend
      start vertex and graph's structure
* Input
    * `start` / `any` - Vertex to start visiting
    * `callback` / `Function(id)` - It will be call on each vertex which is
       visited. A vertex called visited if all it's neighbours is visited.
  Input
     * `id` / `any` - identity of vertex which is pass through
  Output
     * `Boolean` - true on need to be exit searching; not true
       on no need to be exit searching
* Output
    * `Boolean` - true on searching is terminates by callback; false on
      normal exiting
* Exception
    * `NotFound` - Start vertex does not exists
    * `TypeError` - Callback is not callable

## Example

```js
const {dfs, DirectedGraph} = require('@trop/graph')

let g = new DirectedGraph()

g.add_vertex(1)
g.add_vertex(2)
g.add_vertex(3)
g.add_vertex(4)
g.add_vertex(5)

g.add_edge(1, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)

dfs(g, 1, (v) => {
    console.log('Visited', v)
})
```
