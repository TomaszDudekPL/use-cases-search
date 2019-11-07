import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const BadgesComponent = ({chooseHashTag, state}) => {

  let hashtag = state.hashtag;

  return (
    <Row className="bottom-margin">
      <Col>
        <h5 className="badge-mod"><Badge onClick={chooseHashTag('Registration')} color={hashtag ==='Registration'? "danger": "success"}>#Registration</Badge></h5>
        <h5 className="badge-mod"><Badge onClick={chooseHashTag('Chat')} color={hashtag === 'Chat'? "danger": "success"}>#Chat</Badge></h5>
        <h5 className="badge-mod"><Badge onClick={chooseHashTag('Posting')} color={hashtag === 'Posting'? "danger": "success"}>#Posting</Badge></h5>
        <h5 className="badge-mod"><Badge onClick={chooseHashTag('Inviting')} color={hashtag ==='Inviting'? "danger": "success"}>#Inviting</Badge></h5>
      </Col>
    </Row>
  );
};

export default BadgesComponent;