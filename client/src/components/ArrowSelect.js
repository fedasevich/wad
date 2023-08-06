import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../ui/Icons/ControlIcons/ControlIcons';

const ArrowSelect = ({ className, leftArrowShow = true, rightArrowShow = true, textToPrint, handleArrowLeftClick, handleTextClick = () => { }, handleArrowRightClick }) => {
    return (
        <div className={`${className} d-flex fw-medium justify-content-evenly cursor-pointer align-items-center`}>
            {leftArrowShow && (
                <span onClick={handleArrowLeftClick}>
                    <ArrowLeftIcon />
                </span>
            )}

            <h3 onClick={handleTextClick}>{textToPrint}</h3>

            {rightArrowShow && (
                <span onClick={handleArrowRightClick}>
                    <ArrowRightIcon />
                </span>
            )}
        </div>
    );
};

export default ArrowSelect;