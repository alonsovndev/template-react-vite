import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Typography } from "antd";
import { LoadingState } from "@/shared/components/LoadingState";

export function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <Typography.Text strong style={{ color: "#fff", fontSize: 18 }}>
            React Vite Template
          </Typography.Text>
        </Link>
      </Layout.Header>
      <Layout.Content style={{ padding: 24, maxWidth: 960, width: "100%", margin: "0 auto" }}>
        <Suspense fallback={<LoadingState />}>
          <Outlet />
        </Suspense>
      </Layout.Content>
    </Layout>
  );
}
