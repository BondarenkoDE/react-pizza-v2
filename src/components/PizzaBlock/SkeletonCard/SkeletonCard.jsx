import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCard = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={5}
      width={280}
      height={470}
      viewBox="0 0 280 470"
      backgroundColor="#e0e0e0"
      foregroundColor="#bababa">
      <circle cx="136" cy="125" r="120" />
      <rect x="3" y="268" rx="10" ry="10" width="278" height="28" />
      <rect x="3" y="314" rx="10" ry="10" width="278" height="85" />
      <rect x="3" y="431" rx="10" ry="10" width="94" height="29" />
      <rect x="131" y="422" rx="10" ry="10" width="149" height="44" />
    </ContentLoader>
  </div>
);

export default SkeletonCard;
