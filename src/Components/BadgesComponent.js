import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const BadgesComponent = ({chooseHashTag, state}) => {

  let hashtag = state.hashtag;

  return (
    <Row className="bottom-margin">
      <Col>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Registration')}
                 color={hashtag === 'Registration' ? "danger" : "success"}
          >#Registration
          </Badge>
        </h5>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Chat')}
                 color={hashtag === 'Chat' ? "danger" : "success"}
          >#Chat
          </Badge>
        </h5>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Post')}
                 color={hashtag === 'Post' ? "danger" : "success"}
          >#Post
          </Badge>
        </h5>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Invite')}
                 color={hashtag === 'Invite' ? "danger" : "success"}
          >#Invite
          </Badge>
        </h5>

      </Col>
    </Row>
  );
};

export default BadgesComponent;