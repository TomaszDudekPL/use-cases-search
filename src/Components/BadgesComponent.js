import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const BadgesComponent = ({chooseHashTag, state}) => {

  let hashtag = state.hashtag;

  return (
    <Row className="bottom-margin">
      <Col>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Registration')}
                 color={hashtag === 'Registration' ? "success" : "warning"}
          >#Registration
          </Badge>
        </h5>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Chat')}
                 color={hashtag === 'Chat' ? "success" : "warning"}
          >#Chat
          </Badge>
        </h5>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Post')}
                 color={hashtag === 'Post' ? "success" : "warning"}
          >#Post
          </Badge>
        </h5>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Group-Alerts')}
                 color={hashtag === 'Group-Alerts' ? "success" : "warning"}
          >#Group-Alerts
          </Badge>
        </h5>

        <h5 className="badge-mod">
          <Badge onClick={chooseHashTag('Invite')}
                 color={hashtag === 'Invite' ? "success" : "warning"}
          >#Invite
          </Badge>
        </h5>

      </Col>
    </Row>
  );
};

export default BadgesComponent;