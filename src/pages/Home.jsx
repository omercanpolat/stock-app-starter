import { Typography } from "@mui/material";
import Charts from "../components/Charts";
import KpiCards from "../components/KpiCards";

const Home = () => {
  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Dashboard
      </Typography>
      <KpiCards/>
      <Charts/>
    </div>
  );
}

export default Home
