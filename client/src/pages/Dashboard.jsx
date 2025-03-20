import useAuthStore from "@/store/authStore";

const Dashboard = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    // Redirect to login page
  };
  
  return (
    <>
      <h2>Dashboard Page</h2>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default Dashboard;
