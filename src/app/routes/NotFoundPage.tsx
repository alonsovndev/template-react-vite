import { Link } from "react-router-dom";
import { Result } from "antd";

export default function NotFoundPage() {
  return <Result status="404" title="Page not found" extra={<Link to="/">Back to home</Link>} />;
}
