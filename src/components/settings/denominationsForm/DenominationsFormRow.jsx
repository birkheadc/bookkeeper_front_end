import React from 'react';

function DenominationsFormRow(props) {
    return(
        <div>
            <h3>{props.denomination.value}</h3>
        </div>
    );
}

export default DenominationsFormRow;