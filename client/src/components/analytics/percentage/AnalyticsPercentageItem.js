import { observer } from 'mobx-react-lite';
import { Icons } from '../../../ui/Icons/CategoryIcons/CategoryIcons';
import { AnalyticsProgressBar } from './AnalyticsProgressBar';


export const AnalyticsPercentageItem = observer(({ categoryItem, icon, progressBarPercentage, onClick }) => {
    return (
        <div className="mt-2 d-flex flex-row align-items-center justify-content-center" onClick={onClick}>
            <div className=" position-relative categoryIcon me-3">
                {!icon && <Icons iconId={categoryItem.iconId} />}
                {icon}
            </div>
            <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between">
                    <p className="fs-4 mb-0 fw-medium">{categoryItem.name}</p>
                    <p className="fs-4 mb-0 fw-bold ">{categoryItem.spent}</p>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <AnalyticsProgressBar className="mt-1 me-4" max={100} value={progressBarPercentage} iconId={categoryItem.iconId} />
                    <p>{progressBarPercentage}%</p>
                </div>
            </div>
        </div>
    );
})