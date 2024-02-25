import { ArrowDropDown, Search, Settings } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="h-[15vh] grid grid-cols-12 items-center">
      <div className="col-span-3 font-bold text-[24px]">Dua Page</div>

      <form className="col-span-6 p-3 border-[1.5px] border-[#E2E2E2] rounded-lg h-mx ms-auto bg-white shadow">
        <input
          type="text"
          placeholder="Search by Dua Name"
          className="bg-transparent px-2 focus:outline-none font-medium"
        />
        <Search sx={{ color: "#868686" }} />
      </form>

      <div className="col-span-3 ms-auto flex items-center">
        <details class="dropdown mr-3">
          <summary className="p-0 btn bg-transparent border-0 hover:bg-inherit shadow-none ">
            <Image
              src="/profile_icon.png"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-lg object-cover"
            />
            <ArrowDropDown />
          </summary>
        </details>

        <Settings sx={{ color: "#868686" }} />
      </div>
    </div>
  );
};

export default Header;
