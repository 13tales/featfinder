export async function fetchAll(db) {
  const results = await db.run(
    `match (f :Feat)
     with f
     optional match (successor :Feat)-[:REQUIRES]->(f)-[:REQUIRES]->(req :Feat)
    return f { .*, req_count: toString( count(req) ), succ_count: toString( count(successor) )}`
  );

  return results;
}

export async function getSuccessors(db, id) {
  const results = await db.run(
    `match (f :Feat)<-[:REQUIRES*..]-(o :Feat) where f.id = $id
    return distinct o.name as name`,
    { id }
  );

  return results;
}

export async function getZeroReqFeatNames(db) {
  const results = await db.run(
    `match (f :Feat) where not exists(f.prerequisites)
    return f.name as name`
  );

  return results.records.map(r => r.toObject().name);
}

export async function getNoFeatReqFeatNames(db) {
  const results = await db.run(
    `match (f :Feat) where not (f)-[:REQUIRES]->(:Feat)
    return f.name as name`
  );

  return results.records.map(r => r.toObject().name);
}

export async function getReqBookmarkedFeatNames(db, bookmarks) {
  const results = await db.run(
    `match (g :Feat)-[:REQUIRES]->(h :Feat)
    with g, collect(h) as nodes where all (n in nodes where n.id in $bookmarks)
    return g.name as name`,
    { bookmarks }
  );

  return results.records.map(r => r.toObject().name);
}

export async function expandSuccessors(db, id) {
  const results = await db.run(
    `match (f :Feat)<-[:REQUIRES*..]-(o :Feat) where f.id = $id
    return distinct o.name as namematch (f :Feat {name: "Combat Reflexes"})
    with f
    call apoc.path.expand(f, "<REQUIRES", "+Feat", 2,6)
    yield path as pp
    return head(pp)`,
    { id }
  );

  return results.records.map(r => r.toObject().name);
}
