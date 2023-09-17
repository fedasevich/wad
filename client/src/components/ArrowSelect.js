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
    <div
      className={`${className} d-flex fw-medium justify-content-evenly cursor-pointer align-items-center arrow-select`}
    >
      {leftArrowShow && (
        <button type="button" className="px-1" onClick={handleArrowLeftClick}>
          <ArrowLeftIcon />
        </button>
      )}

      <button type="button" className="px-1" onClick={handleTextClick}>
        <h3>{textToPrint}</h3>
      </button>

      {rightArrowShow && (
        <button type="button" className="px-1" onClick={handleArrowRightClick}>
          <ArrowRightIcon />
        </button>
      )}
    </div>
  );
}

export default ArrowSelect;
