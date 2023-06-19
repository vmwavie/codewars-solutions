function createGraph(n) {
  const { sqrt, min } = Math;

  const sqrs = [];
  const graph = [];

  const numSqrs = Math.floor(sqrt(n + n));

  for (let i = 2; i <= numSqrs; i++) {
    sqrs.push(i * i);
  }

  for (let i = 1; i <= n; i++) {
    const peers = [];

    const start = Math.floor(sqrt(i)) - 1;
    const end = min(Math.floor(sqrt(n + i)) - 1, numSqrs);

    for (let j = start; j < end; j++) {
      const peer = sqrs[j] - i;

      if (peer !== i) {
        peers.push(peer);
      }
    }

    graph[i] = peers;
  }

  return graph;
}

function square_sums_row(n) {
  if (n < 25 && ![1, 15, 16, 17, 23].includes(n)) {
    return false;
  }

  const graph = createGraph(n);
  const path = [];

  function dfs(vertices) {
    if (path.length === n) {
      return path;
    }

    vertices.sort((a, b) => graph[a].length - graph[b].length);

    for (const vertex of vertices) {
      path.push(vertex);

      graph[vertex].forEach((adj) =>
        graph[adj].splice(graph[adj].indexOf(vertex), 1)
      );

      if (dfs(graph[vertex])) {
        return path;
      }

      path.pop();

      graph[vertex].forEach((adj) => graph[adj].push(vertex));
    }

    return false;
  }

  return dfs(Array.from({ length: n }, (_, i) => i + 1));
}