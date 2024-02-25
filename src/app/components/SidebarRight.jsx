import Image from "next/image";
import React from "react";

const SidebarRight = () => {
  const SettingItem = ({ setting_name, src }) => {
    return (
      <div className="setting_item flex items-center mb-5">
        <div className="setting_icon mr-3 bg-[#E8F0F5] w-[38px] h-[38px] flex items-center justify-center rounded-full">
          <Image src={src} height={22} width={22} />
        </div>
        <h1 className="text-[#868686]">{setting_name}</h1>
      </div>
    );
  };

  return (
    <div className="settings col-span-3 bg-white p-4">
      <h1 className="text-center font-bold text-[20px] mb-5">Settings</h1>
      <div className="setting_items">
        <SettingItem setting_name="Language Settings" src="/language.svg" />
        <SettingItem setting_name="General Settings" src="/general.svg" />
        <SettingItem setting_name="Font Settings" src="/font.svg" />
        <SettingItem setting_name="Appearance Settings" src="/font.svg" />
      </div>
    </div>
  );
};

export default SidebarRight;
