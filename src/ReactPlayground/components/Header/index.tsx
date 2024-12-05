import styles from "./index.module.scss";

import logoSvg from "./icons/logo.svg";
import { MoonOutlined, ShareAltOutlined, SunOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { PlaygroundContext } from "../../PlaygroundContext";
import copy from "copy-to-clipboard";
import { message } from "antd";
export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === "light" && (
          <MoonOutlined
            title="dark"
            className={styles.theme}
            onClick={() => setTheme("dark")}
          ></MoonOutlined>
        )}
        {theme === "dark" && (
          <SunOutlined
            title="light"
            className={styles.theme}
            onClick={() => setTheme("light")}
          ></SunOutlined>
        )}
        <ShareAltOutlined
          style={{ marginLeft: "10px" }}
          onClick={() => {
            copy(window.location.href);
            message.success("分享链接已复制。");
          }}
        />
      </div>
    </div>
  );
}
