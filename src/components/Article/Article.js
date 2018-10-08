import React from 'react';

import classes from './Article.module.css';

const Article = ({ headline, snippet, type, pubDate, webURL }) => {
  // Sets the color based on the material type (ie. Op-Ed, News, Review)
  // This applies to the paragraph of the material type only.
  let color;
  switch (type) {
    case 'Op-Ed':
      color = 'orange';
      break;
    case 'News':
      color = 'blue'
      break;
    case 'Review':
      color = 'green';
      break;
    case 'Article':
      color = 'rgb(0, 117, 133)'
      break;
    case 'healthtopic':
      color = 'red';
      break;
    default:
      color = 'black';
  }
  const typeOfMaterialColor = {
    color: color
  }

  const formattedPubDate = pubDate ? pubDate.slice(0,10) : pubDate;

  return (
    <a href={webURL} target="_blank" rel="noopener noreferrer" className={classes.articleLink}>
      <div className={classes.Article}>
        <div className={classes.headline}>
          <h1>{headline}</h1>
          <p className={classes.snippet}>{snippet}</p>
        </div>
        <div className={classes.articleInfo}>
          <p style={typeOfMaterialColor} className={classes.typeOfMaterial}>{type}</p>
          <p className={classes.pubDate}>{formattedPubDate}</p>
        </div>
      </div>
    </a>
  );
};

export default Article;