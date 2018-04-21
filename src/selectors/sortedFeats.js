import { createSelector } from "reselect";

const getSortColumn = (_, props) => props.sortColumn;
const getSortDirection = (_, props) => props.sortDirection;
const getFeats = state => state.featCache;

export const sortedFeatSelector = createSelector(
  getSortColumn,
  getSortDirection,
  getFeats,
  (column, direction, feats) => {
    console.log(column, direction);
    const result = feats.valueSeq().sortBy(f => f[column]);

    return direction === "ascending" ? result : result.reverse();
  }
);
