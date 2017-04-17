import React from 'react';

export default function ErrorMessage({error, className}) {
    return (
        <span className={`${className}__error`}>
            {error}
        </span>
    )
}
