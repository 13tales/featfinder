export async function fetchAll(db) {
  const results = await db.run(
    `match (f :Feat)
       return f`
  );

  return results;
}

export async function nameSearch(db, searchTerm) {
  const results = await db.run(
    `match (f :Feat) where f.name =~ $regex
       return f order by f.name asc limit 50`,
    { regex: `(?i).*${searchTerm}.*` }
  );

  return results;
}

export async function getSuccessors(db, id) {
  const results = await db.run(
    `match (f :Feat)<-[:REQUIRES*..]-(o :Feat) where f.id = $id
       return distinct o.name as name`,
    { id: id }
  );

  return results;
}
