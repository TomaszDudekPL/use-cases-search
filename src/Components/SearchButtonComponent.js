import React from 'react';
import {Button} from 'reactstrap';

const SearchButtonComponent = ({visibility, color, executeFunc, name, id}) => {

    return (
      !visibility ? (
        <Button color={color} id={id} className={name === "✕ reset all"? "form-button_mod x-button_mod": "form-button_mod"}
                onClick={executeFunc}>{name}
        </Button>
      ) : null
    )

}

export default SearchButtonComponent;