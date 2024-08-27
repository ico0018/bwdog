import React, { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

export default () => {
  const [activeKey, setActiveKey] = useState("Home");

  const tabs = [
    {
      key: "Home",
      title: "Home",
      icon: <HomeRoundedIcon />,
    },
    {
      key: "Rank",
      title: "Leaderboard",
      icon: <LeaderboardRoundedIcon />,
    },
    {
      key: "Friend",
      title: "Friends",
      icon: <GroupRoundedIcon />,
    },
  ];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            sx={{
              color: value === index ? "" : "#A6A6A6",
              textTransform: "lowercase",
            }}
            icon={item.icon}
            label={item.title}
          />
        ))}
      </Tabs>
    </div>
  );
};
