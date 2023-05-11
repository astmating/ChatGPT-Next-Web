import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./home.module.scss";

export function UserQycode() {
  const [code, setCode] = useState("");
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (code === "123") {
      history.push("/"); // 清除样式后返回主页
    }
  };

  return (
    <div className={`${styles["user-qycode"]} ${styles.overlay}`}>
      <form className={styles["qycode-form"]} onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="输入邀请码"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// 在 WideScreen 组件中添加 UserQycode 组件
function WideScreen() {
  const config = useAppConfig();

  return (
    <div
      className={`${
        config.tightBorder ? styles["tight-container"] : styles.container
      }`}
    >
      <SideBar />

      <div className={styles["window-content"]}>
        <Routes>
          <Route path={Path.Home} element={<Chat />} />
          <Route path={Path.Chat} element={<Chat />} />
          <Route path={Path.Settings} element={<Settings />} />
        </Routes>
        <UserQycode /> {/* 添加 UserQycode 组件 */}
      </div>
    </div>
  );
}

// 在 MobileScreen 组件中添加 UserQycode 组件
function MobileScreen() {
  const location = useLocation();
  const isHome = location.pathname === Path.Home;

  return (
    <div className={styles.container}>
      <SideBar className={isHome ? styles["sidebar-show"] : ""} />

      <div className={styles["window-content"]}>
        <Routes>
          <Route path={Path.Home} element={null} />
          <Route path={Path.Chat} element={<Chat />} />
          <Route path={Path.Settings} element={<Settings />} />
        </Routes>
        <UserQycode /> {/* 添加 UserQycode 组件 */}
      </div>
    </div>
  );
}

// 将整合后的 Home 组件返回
export function Home() {
  const isMobileScreen = useMobileScreen();
  useSwitchTheme();

  if (!useHasHydrated()) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Router>{isMobileScreen ? <MobileScreen /> : <WideScreen />}</Router>
    </ErrorBoundary>
  );
}
