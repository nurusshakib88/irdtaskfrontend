import Image from "next/image";
import React from "react";

const SidebarLeft = () => {
  const Icon = ({ src }) => {
    return (
      <div className="icon bg-[#E8F0F5] w-[38px] h-[38px] flex items-center justify-center rounded-full mb-[27px]">
        <Image
          src={src}
          width={20}
          height={20}
          className="w-[20px] h-[20px] object-cover hover:scale-105"
        />
      </div>
    );
  };
  return (
    <div className="col-span-1 h-[90vh] bg-white my-auto rounded-lg overflow-auto">
      <div className="sidebarLeft flex justify-between items-center py-4 flex flex-col  h-full">
        <div className="logo mb-20">
          <Image
            src="/logo.png"
            width={73}
            height={73}
            className="w-[73px] h-[73px] object-cover"
          />
        </div>

        <div className="sidebar_menu">
          <Icon src="./home.svg" />
          <Icon src="./alldua.svg" />
          <Icon src="./memorize.svg" />
          <Icon src="./bookmark.svg" />
          <Icon src="./ruqyah.svg" />
          <Icon src="./dua-info.svg" />
          <Icon src="./books.svg" />
        </div>

        <div className="mt-20">
          <Image
            src="/logo.png"
            width={57}
            height={57}
            className="w-[57px] h-[57px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
