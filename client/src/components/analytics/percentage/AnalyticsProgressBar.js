import { observer } from 'mobx-react-lite';
import { getCategoryBackgroundColorByIconId } from '../../../ui/Icons/CategoryIcons/CategoryIcons';

export const AnalyticsProgressBar = observer(({ className, max = 100, value = 0, iconId }) => {
  return (
    <div className={`progress w-100 ${className}`}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${value}%`, backgroundColor: getCategoryBackgroundColorByIconId(iconId) }}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-label="progressBar"
        aria-valuemax={max}
      />
    </div>
  );
});
