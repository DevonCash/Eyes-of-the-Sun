

export const pt = {
  eq: (p1, p2) => p1[0] === p2[0] && p1[1] === p2[1]
}

const topoSortHelper = (nodes, node, explored, s) => {
  explored.add(node);

  nodes.forEach(n => {
    if (
      explored.has(n)
      || (!n.after || !n.after.includes(node.name))
    ) return

    topoSortHelper(nodes, n, explored, s);
  })

  s.push(node);

}

export const topoSort = (nodes) => {
  const s = new Array();
  const explored = new Set();

  nodes.forEach((n) => {
    if (!explored.has(n)) topoSortHelper(nodes, n, explored, s)
  })

  return s.reverse();
}