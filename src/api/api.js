export async function fetchAll(db) {
  const results = await db.run(
    `match (f :Feat)
       return f`
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
    `match (g :Feat)-[:REQUIRES]->(h :Feat) where h.id in $bookmarks
return g.name as name`,
    { bookmarks }
  );

  return results.records.map(r => r.toObject().name);
}
