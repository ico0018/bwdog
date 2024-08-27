import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { useNavigate } from "react-router-dom";

export default () => {
  const tabs = [
    {
      key: "Home",
      title: "Home",
      icon: <HomeRoundedIcon />,
      path: "/",
    },
    {
      key: "Rank",
      title: "Leaderboard",
      icon: <LeaderboardRoundedIcon />,
      path: "/leaderboard",
    },
    {
      key: "Friend",
      title: "Friends",
      icon: <GroupRoundedIcon />,
      path: "/friends",
    },
  ];

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useNavigate();
  function navigateTo(path) {
    router(path);
  }

  return (
    <div className="fixed bottom-0 w-full backdrop-blur-sm text-white">
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        textColor="inherit"
      >
        {tabs.map((item, index) => (
          <Tab
            key={item.key}
            disableRipple
            disableFocusRipple
            disableTouchRipple
            sx={{
              color: value === index ? "" : "#A6A6A6",
              textTransform: "lowercase",
            }}
            icon={item.icon}
            label={item.title}
            onClick={() => navigateTo(item.path)}
          />
        ))}
      </Tabs>
    </div>
  );
};
