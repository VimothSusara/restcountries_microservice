import DailyUsageChart from "@/components/dashboard/DailyUsageChart";
import EachKeyUsageChart from "@/components/dashboard/EachKeyUsageChart";
import FailedRequestCard from "@/components/dashboard/FailedRequestCard";
import SuccessRateCard from "@/components/dashboard/SuccessRateCard";
import TotalRequestCard from "@/components/dashboard/TotalRequestCard";
import UserCard from "@/components/dashboard/UserCard";
import useDashboardStats from "@/hooks/useDashboardStats";

const Dashboard = () => {

  const { data, loading, error } = useDashboardStats();

  return (
    <>
      <div className="dashboard-main-container">
        <div className="row justify-content-center p-2 gap-2 my-2">
          <UserCard />
          <TotalRequestCard total={data?.get_stats?.total} />
          <SuccessRateCard success_rate={data?.get_stats?.success_rate} />
          <FailedRequestCard failed={data?.get_stats?.failed} />
        </div>
        <div className="row justify-content-center my-3">
          <div className="col-md-6" style={{ width: '600px', height: '400px' }}>
            <DailyUsageChart data={data?.daily_usage} />
          </div>
          <div className="col-md-6" style={{ width: '350px', height: '300px' }}>
            <EachKeyUsageChart data={data?.each_key_usage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
