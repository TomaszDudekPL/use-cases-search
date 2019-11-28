import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const BadgesComponent = ({chooseHashTag, state}) => {

  let chosenHashtag = state.hashtag;
  let uniqHashTagsForConsumer = state.uniqHashTagsForConsumer;

  const handleChooseHashtag = (e) => {
    let chosenHashtag = e.target.innerText;
    return chooseHashTag(chosenHashtag)();
  };

  return (
    <Row className="bottom-margin">
      <Col sm="12" md={{size: 8, offset: 2}}>

        {
          (uniqHashTagsForConsumer && uniqHashTagsForConsumer.length) ? (
            uniqHashTagsForConsumer.map(hashtag => {
              return (
                <h5 className="badge-mod" key={hashtag}>
                  <Badge onClick={handleChooseHashtag}
                         color={hashtag === chosenHashtag ? "success" : "warning"}
                  >{hashtag}
                  </Badge>
                </h5>
              )
            })) : null
        }

      </Col>
    </Row>
  );
};

export default BadgesComponent;