# DirectedGraph

Build a directed graph.

```js
const {DirectedGraph} = require('@trop/std/graph')
```

## constructor(vertexes=[], edges=[])

* Description
    * A way to build and retrieve directed graph
* Input
    * vertexes / Array<any> / [] - List of vertexes
    * edges / Array<Array<any>[2]> - List of edges
* Exception
    * TypeError - Vertexes must be an array
    * TypeError - Edges must be an array
    * TypeError - Edge must be an array with two elements

## get vertexes()

* Map<key, value>
    * key / any - identity of vertex
    * value / Object - vertex's information
     * id / any - Identity of vertex, similar like key
     * data / any - Data corresponds with vertex

## get edges()

* Map<key, value>
    * key / any - identity of vertex
    * value / Set<any> - set of neighbours vertexes

## add_vertex(id, data=null)

* Description
    * Add a vertex to graph
* Input
    * id / any - Vertex's identity
    * data / any - Data corresponds with vertex
* Output - none
* Exception
    * Conflict - Vertex is already existed

## add_edge(begin, end)

* Description
    * Add an edge to graph
* Input
    * begin / any - begin vertex
    * end / any - end vertex
* Output - none
* Exception
    * NotFound - Begin vertex does not exists
    * NotFound - End vertex does not exists
    * Conflict - Edge is already existed

## vertex(index)

* Description
    * Retrieve vertex's information by index
* Input
    * index / any - Identity of vertex
* Output
    * Object - Vertex's information
     * id / any - identity of vertex
     * data / any - corresponds data of vertex
     * and other attributes which is assigns by other agents
* Exception
    * NotFound - Vertex does not exists


## neighbours(vertex)

* Description
    * Retrieve set of neighbours from a vertex
* Input
    * vertex / any - Identity of begin vertex
* Output
    * Set<any> - Set of identity of neighbour vertexes
* Exception
    * NotFound - Vertex does not exists


## has_edge(begin, end)

* Description
    * Check edge [begin, end] is existed
* Input
    * begin / any - Identity of begin vertex
    * end / any - Identity of end vertex
* Output
    * Boolean - true on edge is existed, false on edge is not existed

## del_vertex(index)

* Description
    * Remove a vertex from graph
* Input
    * index / any - Identity of vertex to remove
* Output - none
* Exception
    * NotFound - Vertex does not exists
    * Conflict - Vertex is in other edges

## del_edge(begin, end)

* Description
    * Remove an edge from graph
* Input
    * begin / any - Identity of begin vertex
    * end / any - Identity of end vertex
* Output - none
* Exception
    * NotFound - Edge does not exists

## Example    

```js
const {DirectedGraph} = require('@trop/graph')

let g = new DirectedGraph()

g.add_vertex(1)
g.add_vertex(2)
g.add_vertex(3)

g.add_edge(1, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)
```
