import { forwardRef } from "react";
import { NavItem } from "../shared";
import { useUser } from "../../../store";

const Sidebar = forwardRef(({ showNav }, ref) => {
  const { role } = useUser();
  const links = [
    {
      path: "/dashboard",
      title: "Alertas",
      roles: ["ADMIN", "USER"],
    },
    {
      path: "/domicilio",
      title: "Mi domicilio",
      roles: ["ADMIN", "USER"],
    },
    {
      path: "/vehiculos",
      title: "Mis vehículos",
      roles: ["ADMIN", "USER"],
    },
    {
      path: "/visitas",
      title: "Visitas",
      roles: ["ADMIN", "USER"],
    },
    {
      path: "/patentes",
      title: "Lector de patentes",
      roles: ["ADMIN", "USER"],
    },
    {
      path: "/admin/domicilios",
      title: "[Admin] domicilios",
      roles: ["ADMIN"],
    },
    {
      path: "/admin/alertas",
      title: "[Admin] alertas",
      roles: ["ADMIN"],
    },
  ];

  return (
    <aside ref={ref} className="fixed w-56 h-full bg-slate-900 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <h1 className="text-2xl font-bold text-white">ComuAlert</h1>
      </div>
      <div className="flex flex-col">
        {links.map(
          (item) =>
            item.roles.includes(role) && (
              <NavItem key={item.path} path={item.path} title={item.title} />
            )
        )}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
