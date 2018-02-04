import React from "react";
import { PageSpinner } from "../components/spinner.js";
import { Checkbox, Icon, Form, Segment } from "semantic-ui-react";
import { ResultList } from "../components/resultlist.js";
import { SearchBox } from "../components/searchbox.js";
import { Route } from "react-router-dom";

const SearchTab = ({
  pending,
  subset,
  handleFeatClick,
  toggleSidebar,
  handleInput,
  searchOption,
  handleSelectOption,
  cache,
  results,
  setSearchPending
}) => (
  <div>
    <SearchBox handleInput={handleInput} setSearchPending={setSearchPending} />
    <Segment>
      <Form>
        <Form.Field content="Show in search results:" />
        <Form.Field>
          <Checkbox
            radio
            label="Feats with zero requirements"
            value="zero_reqs"
            checked={searchOption === "zero_reqs"}
            onChange={(event, data) => handleSelectOption(data.value)}
          />
          <Checkbox
            radio
            label="Feats with no prerequisite feats"
            value="no_req_feats"
            checked={searchOption === "no_req_feats"}
            onChange={(event, data) => handleSelectOption(data.value)}
          />
          <Checkbox
            radio
            label="Feats with requirements met by my bookmarked feats"
            value="bookmarked"
            checked={searchOption === "bookmarked"}
            onChange={(event, data) => handleSelectOption(data.value)}
          />
          <Checkbox
            radio
            onChange={(event, data) => handleSelectOption(data.value)}
            label="All feats"
            checked={searchOption === "all"}
            value="all"
          />
        </Form.Field>
      </Form>
    </Segment>
    {pending.searchResults || pending.searchSubset ? (
      <PageSpinner size="6x" />
    ) : (
      <Segment style={{ maxHeight: "97%", overflowY: "scroll" }}>
        <Route
          path="/feat/:name"
          children={({ match }) => (
            <ResultList
              selected={match && match.params.name}
              subset={results}
              handleClick={handleFeatClick}
              cache={cache}
            />
          )}
        />
      </Segment>
    )}
  </div>
);

export default SearchTab;
