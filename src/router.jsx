import { createBrowserRouter } from "react-router-dom";
import Fyp from "./pages/Fyp";
import Charts from "./pages/Charts"
import Charts from "./pages/Chart"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Fyp />,
  },
]);

export const TopChartsContainer = () => {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/charts')
      .then((response) => response.json())
      .then((data) => setCharts(data))
      .catch((error) => console.error('Error fetching charts:', error));
  }, []);

  return <Charts charts={charts} />;
}

export const ChartContainer = ({ match }) =>{
  const [chartName, setChartName] = useState(null);
  const [chartSongs, setChartSongs] = useState([]);
  const chartId = match.params.id || '0'; // Capture `id` from route params, or default to '0'

  useEffect(() => {
    // Fetch chart name
    fetch(`http://localhost:8081/api/charts/${chartId}`)
      .then((response) => response.json())
      .then((data) => setChartName(data))
      .catch((error) => console.error('Error fetching chart name:', error));

    // Fetch chart songs
    fetch(`http://localhost:8081/api/rankings/${chartId}`)
      .then((response) => response.json())
      .then((data) => setChartSongs(data))
      .catch((error) => console.error('Error fetching chart songs:', error));
  }, [chartId]);

  return (
    <div>
      <Chart chartName={chartName} chartSongs={chartSongs} />
    </div>
  );
}

