import { Outlet } from "react-router-dom";
import Menu from "@components/Menu";

export default function PrivateLayout() {
  return (
    <div>
      <Menu />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
