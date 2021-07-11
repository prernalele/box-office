import React from 'react';
import IMG_PLACEHOLDER from '../../images/not-found.png'
import { Star } from '../styled';
import { Headline, MainDataWrapper, TagList } from './ShowMainData.styled';

const ShowMainData = ({image, name, rating, summary, tags}) => {
  return (
  <MainDataWrapper>
    
   <img src={image ? image.original : IMG_PLACEHOLDER} alt='show-cover'/> 
   <Headline>
     <div className="text-side">
       <h1>{name}</h1>
       <div>
         <Star active/>
         <span>{rating.average || 'N/A' }</span>
       </div>
     </div>
     <div className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
    <TagList>
      Tags:{' '}
      <div>
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </TagList>
    </Headline>
  </MainDataWrapper>);
};

export default ShowMainData;
