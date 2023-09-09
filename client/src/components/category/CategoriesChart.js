import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useStore } from '../../store';
import { parseCategoriesIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons';

ChartJS.register(ArcElement, Tooltip);

const CategoriesChart = observer(() => {
  const { category, userSettings } = useStore();

  const options = {
    cutout: '85%'
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, _args, _pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = 'bold 28px Segoe UI Variable';
      ctx.fillStyle = userSettings.isThemeDark() ? 'white' : 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        data.datasets[0].data.reduce((acc, item) => acc + item, 0),
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    }
  };

  const emptyDoughnut = {
    id: 'emptyDoughnut',
    afterDraw(chart, _args, _options) {
      const { datasets } = chart.data;
      const isEmpty = datasets[0].data.every((item) => item === 0);

      if (!isEmpty) {
        return;
      }
      const {
        chartArea: { left, top, right, bottom },
        ctx
      } = chart;
      const r = Math.min(right - left, bottom - top) / 2;
      ctx.beginPath();
      ctx.lineWidth = 20;
      ctx.strokeStyle = '#909090';
      ctx.arc(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y, r - 10, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const data = {
    labels: category.parsedCategories.map((category) => `${category.name} spent`),
    datasets: [
      {
        data: category.parsedCategories.map((item) => item.spent),
        backgroundColor: parseCategoriesIcons(category.parsedCategories),
        borderWidth: 0,
        borderRadius: 10
      }
    ]
  };

  return (
    <>
      {!!category.parsedCategories.length && (
        <Doughnut data={data} options={options} plugins={[emptyDoughnut, textCenter]} />
      )}
    </>
  );
});

export default CategoriesChart;
