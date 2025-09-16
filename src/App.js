import React, { useEffect, useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";

import withTabbar from "./components/withTabbar";
import Index from "./pages/Index";
import Leaderboard from "./pages/Leaderboard";
import Friends from "./pages/Friends";
import Welcome from "./pages/WelcomeWizard";

// ✅ 创建一个全局 Context
export const AppContext = createContext(null);

// ✅ 错误边界组件（捕获未处理的 React 渲染错误）
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("❌ React 渲染错误:", error);
    console.error("组件堆栈:", info.componentStack);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red", fontFamily: "monospace" }}>
          <h2>⚠️ 页面出错了</h2>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.info?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [data, setData] = useState({
    user: {},
    credit: 0,
  });

  useEffect(() => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();

        const tgUser = tg.initDataUnsafe?.user || {};
        const tgCredit = tg.initDataUnsafe?.credit ?? 0;

        setData({
          user: tgUser,
          credit: tgCredit,
        });

        console.log("✅ Telegram 数据:", tg.initDataUnsafe);
      } else {
        console.log("⚠️ 不在 Telegram 内部，使用 mock 用户");
        setData({
          user: { id: 999999, first_name: "Mock" },
          credit: 1000, // mock credit
        });
      }
    } catch (err) {
      console.error("初始化 Telegram WebApp 出错:", err);
    }
  }, []);

  return (
    <ErrorBoundary>
      <AppContext.Provider value={data}>
        {/* 顶部提示用户信息 */}
        <div
          style={{
            padding: "8px",
            background: "#f5f5f5",
            fontSize: "14px",
            borderBottom: "1px solid #ccc",
          }}
        >
          {data.user?.first_name ? (
            <>
              你好，{data.user.first_name} (id: {data.user.id || "?"}) <br />
              Credit: {data.credit ?? 0}
            </>
          ) : (
            "⏳ 正在加载用户信息..."
          )}
        </div>

        {/* 路由部分 */}
        <Routes>
          <Route path="/" Component={withTabbar(Index)} />
          <Route path="/leaderboard" Component={withTabbar(Leaderboard)} />
          <Route path="/friends" Component={withTabbar(Friends)} />
          <Route path="/welcome" Component={Welcome} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AppContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
