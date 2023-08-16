import { observer } from 'mobx-react-lite';
import { ShowMoreIcon } from '../../../ui/Icons/ControlIcons/ControlIcons';
import { AnalyticsPercentageItem } from './AnalyticsPercentageItem';

export const AnalyticsShowMore = observer(({ spent, percentage, onClick }) => {
  const showMoreItem = { name: 'Show more', spent, iconId: 2 };
  return (
    <AnalyticsPercentageItem
      onClick={onClick}
      categoryItem={showMoreItem}
      progressBarPercentage={percentage}
      icon={<ShowMoreIcon />}
    />
  );
});
