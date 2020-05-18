import React from 'react';
import {Button} from 'reactstrap';

const SearchButtonComponent = ({visibility, color, executeFunc, name}) => {

    return (
      !visibility ? (
        <Button color={color} className="form-button_mod"
                onClick={executeFunc}>{name}
        </Button>
      ) : null
    )

}

export default SearchButtonComponent;