import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Context } from '../..';
import { icons as categoryIcons } from '../../ui/Icons/CategoryIcons/CategoryIcons';
ChartJS.register(ArcElement, Tooltip);

const parseCategoriesIcons = (categories) =>
  categories.map(category => categoryIcons.find((icon) => icon.id === (category.iconId || 1)).backgroundColor);


const CategoriesChart = observer(() => {
  const { category } = useContext(Context)

  const options = {
    cutout: '85%'
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = 'bold 28px Poppins-Bold';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(data.datasets[0].data.reduce((acc, item) => acc + item, 0), chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
    }
  }


  const emptyDoughnut = {
    id: 'emptyDoughnut',
    afterDraw(chart, args, options) {
      const { datasets } = chart.data;
      let isEmpty = datasets[0].data.every((item) => item === 0);

      if (isEmpty) {
        const { chartArea: { left, top, right, bottom }, ctx } = chart;
        const r = Math.min(right - left, bottom - top) / 2;
        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.strokeStyle = '#909090';
        ctx.arc(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y, r - 10, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  const data = {
    labels: category.parsedCategories.map(category => `${category.name} spent`),
    datasets: [
      {
        data: category.parsedCategories.map((item) => item.spent),
        backgroundColor:
          parseCategoriesIcons(category.parsedCategories)
        ,
        borderWidth: 0,
        borderRadius: 10,
      },
    ],
  };


  return (<>
    {!!category.parsedCategories.length && <Doughnut data={data} options={options} plugins={[emptyDoughnut, textCenter]} />}
  </>)
});


export default CategoriesChart
