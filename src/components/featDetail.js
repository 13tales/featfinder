import React, { Component } from "react";

const FeatDetail = props => {
  return (
    <div>
      <h2>{props.feat.name}</h2>
      <h3>Pre-requisites</h3>
      <p>{props.feat.prerequisites || "None"}</p>
      <h3>Description</h3>
      <p>{props.feat.description}</p>
      <h3>Benefit</h3>
      <p>{props.feat.benefit}</p>
    </div>
  );
};

export { FeatDetail };
