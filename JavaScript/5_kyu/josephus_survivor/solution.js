function listify(n, i = 1, start) {
  if (i === n) return { data: i, next: start};

  const obj = { data: i };
  start = start || obj;
  obj.next = listify(n, i + 1, start);
  return obj;
}


function josephusSurvivor(n,k){
  if (n === 1 || k === 1) return n;

  let node = listify(n);

  return logic(n, k, node);
}

function logic(n, k, node) {
  for (let i = 0; i < k - 2; i++) {
    node = node.next;
  }
  node.next = node.next.next;
  if (node.next === node) return node.data;
  return logic(n, k, node.next);
}
