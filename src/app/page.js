import Image from "next/image";
import Link from "next/link";
import SidebarLeft from "./components/SidebarLeft";
import DuaPage from "./components/DuaPage";
import SidebarRight from "./components/SidebarRight";
import Header from "./components/Header";
export default function Home() {
  return (
    <div className="md:container mx-auto px-4">
      <div className="grid grid-cols-12 gap-4 h-[100vh] overflow-hidden">
        <SidebarLeft />

        <div className="col-span-11 h-[100vh]">
          <Header />

          <div className="h-[85vh]">
            <DuaPage />

            {/* <SidebarRight /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
