import React from 'react'

function Title({ text = "" }) {
    return (
        <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-gray-500 font-bold'>{text} </p>
        </div>
    )
}

export default Title