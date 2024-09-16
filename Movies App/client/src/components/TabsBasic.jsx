import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import TableComponent from "./TableComponent";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsBasic() {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getUsersHere();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { users, getUsersHere } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  if (isLoading || !users || users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <span className="border-2 p-2 rounded-md">No Users</span>
      </div>
    );
  }
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ borderBottom: 1, paddingLeft: "1%", borderColor: "divider" }}>
        
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="DashBoard" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <section className="text-xl w-[50%] md:w-[30%] bg-gradient-to-r from-yellow-500 to-black w-[10%] text-center p-2 rounded-md font-bold text-white">
          DashBoard
        </section>
        <div className="w-[100vw]  flex items-center justify-start p-5 gap-2 flex-wrap ">
          <div className="p-2 border-2 border-md w-[90%] md:w-[40%]  min-h-[30vh] rounded-md">
            <h3 className="bg-gray-200 rounded-md p-2 font-semibold">
              Ultimate Users
            </h3>
            {users.slice(-3).map((item, index) => (
              <div key={index} className="flex justify-around mt-1">
                <h2>{item.username}</h2>
                <h2>{item.email}</h2>
                <h2>{item.roll}</h2>
              </div>
            ))}
          </div>
        </div>
        <section>s</section>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <TableComponent />
      </CustomTabPanel>

    
    
    </Box>
  );
}
