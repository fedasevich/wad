import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../ui/Icons/ControlIcons/ControlIcons';

function ArrowSelect({
  className,
  leftArrowShow = true,
  rightArrowShow = true,
  textToPrint,
  handleArrowLeftClick,
  handleTextClick = () => undefined,
  handleArrowRightClick
}) {
  return (
    <div className={`${className} d-flex fw-medium justify-content-evenly cursor-pointer align-items-center`}>
      {leftArrowShow && (
        <button type="button" onClick={handleArrowLeftClick}>
          <ArrowLeftIcon />
        </button>
      )}
      <button type="button" onClick={handleTextClick}>
        <h3>{textToPrint}</h3>
      </button>

      {rightArrowShow && (
        <button type="button" onClick={handleArrowRightClick}>
          <ArrowRightIcon />
        </button>
      )}
    </div>
  );
}

export default ArrowSelect;
