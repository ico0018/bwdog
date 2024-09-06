import React, { useEffect, useMemo } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setTabIndex, setTabIndexByPath } from "../store";

const ReduxConnect = connect((state) => {
  return {
    tabIndex: state.tab.tabIndex,
  };
});

export default ReduxConnect(CowTabbar);

function CowTabbar(props) {
  const tabs = useMemo(() => [
    {
      key: "Home",
      title: "Home",
      icon: <HomeRoundedIcon />,
      inactiveIcon: <HomeRoundedIcon sx={{ color: "#6b7280" }} />,
      path: "/",
    },
    {
      key: "Rank",
      title: "Leaderboard",
      icon: <LeaderboardRoundedIcon />,
      inactiveIcon: <LeaderboardRoundedIcon sx={{ color: "#6b7280" }} />,
      path: "/leaderboard",
    },
    {
      key: "Friend",
      title: "Friends",
      icon: <GroupRoundedIcon />,
      inactiveIcon: <GroupRoundedIcon sx={{ color: "#6b7280" }} />,
      path: "/friends",
    },
  ]);

  useEffect(() => {
    props.dispatch(setTabIndexByPath(window.location.pathname));
  }, [props.tabIndex]);

  const router = useNavigate();
  function navigateTo(path, tabIndex) {
    router(path);
  }

  return (
    <div className="fixed bottom-0 w-full backdrop-blur-sm text-white">
      <div className="flex w-full bg-transparent">
        {tabs.map((item, index) => (
          <div
            key={item.key}
            className="flex-1 flex flex-col items-center p-2"
            onClick={() => navigateTo(item.path, index)}
          >
            {props.tabIndex === index ? item.icon : item.inactiveIcon}
            <span
              className={`text-xs ${
                props.tabIndex === index ? "" : "text-gray-500"
              }`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
