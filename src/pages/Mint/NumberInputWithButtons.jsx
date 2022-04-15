/* 
  This Component is an input field, which support number only and increase value and decrease value of field with "+" and "-" button 
*/

import React, {useEffect, useState} from 'react'
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";


const NumberInputWithButtons = ({
                                    rest,
                                    setValue = () => {
                                    },
                                }) => {
    const [fieldValue, setFieldValue] = useState(0);

    // This useEffect runs every times fieldValue state varaible changes
    // setting value to setValue callback function
    useEffect(() => {
        setValue(fieldValue);
    }, [fieldValue])


    // Setting fieldValue Handler
    const setFieldValueHandler = (e) => {
        const value = e.target.value;
        setFieldValue(value);
    }

    // Increase field value handler
    const increaseValue = () => {
        setFieldValue(prev => {
            if (!isNaN(prev)) {
                if (!prev) {
                    return 1;
                } else {
                    if (prev < 9) {
                        return parseInt(prev) + 1;
                    }
                    return 9;
                }
            }
        });
    }

    // Decrease field value handler
    const decreaseValue = () => {
        setFieldValue(prev => {
            if (prev >= 1) {
                return prev - 1
            } else {
                return 0;
            }
        });
    }

    return (
        <div className='number-field__buttons'>
            <div>
                <button onClick={decreaseValue} className='button'>
                    <AiOutlineMinus/>
                </button>
            </div>
            <input
                type="number"
                value={fieldValue}
                onChange={setFieldValueHandler}
            />
            <div>
                <button onClick={increaseValue} className='button'>
                    <AiOutlinePlus/>
                </button>
            </div>
        </div>
    )
}

export default NumberInputWithButtons;