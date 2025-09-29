import { initialInsights } from '../data/initialData';

const INSIGHTS_STORAGE_KEY = 'ai-platform-insights';

const getRandomValue = (min, max, isPercent = false) => {
  const value = (Math.random() * (max - min) + min).toFixed(0);
  return isPercent ? `${value}%` : value;
};

const generateNewInsights = () => {
  const newChartData = initialInsights.chartData.map(item => ({
      ...item,
      value: getRandomValue(60, 95)
  }));

  return {
    kpis: [
      { name: 'Response Quality', value: getRandomValue(80, 98, true) },
      { name: 'Customer Satisfaction', value: getRandomValue(85, 99, true) },
      { name: 'Learning Efficiency', value: getRandomValue(70, 95, true) },
    ],
    chartData: newChartData,
    lastUpdated: new Date().toISOString(),
  };
};

export const fetchInsights = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedInsights = localStorage.getItem(INSIGHTS_STORAGE_KEY);
      if (storedInsights) {
        resolve(JSON.parse(storedInsights));
      } else {
        localStorage.setItem(INSIGHTS_STORAGE_KEY, JSON.stringify(initialInsights));
        resolve(initialInsights);
      }
    }, 300);
  });
};

export const runAiAnalysis = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newInsights = generateNewInsights();
      localStorage.setItem(INSIGHTS_STORAGE_KEY, JSON.stringify(newInsights));
      resolve(newInsights);
    }, 500);
  });
};