import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const BadgesComponent = ({chooseHashTag, state}) => {

  const chosenHashtag = state.hashtag;
  const uniqHashTagsForConsumer = state.uniqHashTagsForConsumer;
  const uniqHashTagsForPro = state.uniqHashTagsForPro;

  const consumer_chkbox = state.consumer_chkbox;
  const pro_chkbox = state.pro_chkbox;

  const consumer_hashTags_exist = uniqHashTagsForConsumer && uniqHashTagsForConsumer.length;
  const consumer =  consumer_hashTags_exist && consumer_chkbox && pro_chkbox === false;

  const pro_hashTags_exist = uniqHashTagsForPro && uniqHashTagsForPro.length;
  const pro =  pro_hashTags_exist && consumer_chkbox === false && pro_chkbox;

  const handleChooseHashtag = (e) => {
    let chosenHashtag = e.target.innerText;
    return chooseHashTag(chosenHashtag)();
  };

  return (
    <Row className="bottom-margin">
      <Col sm="12" md={{size: 8, offset: 2}}>

        {
          consumer ? (
            uniqHashTagsForConsumer.map(hashtag => {
              return (
                <h5 className="badge-mod" key={hashtag}>
                  <Badge onClick={handleChooseHashtag}
                         color={hashtag === chosenHashtag ? "success" : "warning"}
                  >{hashtag}
                  </Badge>
                </h5>

              )
            })
          ) : pro ? (
            uniqHashTagsForPro.map(hashtag => {
              return (
                <h5 className="badge-mod" key={hashtag}>
                  <Badge onClick={handleChooseHashtag}
                         color={hashtag === chosenHashtag ? "success" : "warning"}
                  >{hashtag}
                  </Badge>
                </h5>
              )
            })
          ): null
        }

      </Col>
    </Row>
  );
};

export default BadgesComponent;