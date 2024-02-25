"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "@mui/icons-material";
import SidebarRight from "./SidebarRight";

const DuaPage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [duas, setDuas] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch categories from backend when component mounts
    fetch("http://localhost:3000/category", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        // Set a default category and fetch its subcategories and duas
        if (data.length > 0) {
          const defaultCategoryId = data[0].cat_id; // Assuming the first category is the default one
          setSelectedCategoryId(defaultCategoryId);
          fetchSubcategories(defaultCategoryId);
          fetchDuas(defaultCategoryId);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.cat_name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch subcategories based on selected category
  const fetchSubcategories = (categoryId) => {
    fetch(`http://localhost:3000/subcategory/${categoryId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSubcategories(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Fetch duas based on selected category
  const fetchDuas = (categoryId) => {
    fetch(`http://localhost:3000/dua/${categoryId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDuas(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to handle category click
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    fetchSubcategories(categoryId);
    fetchDuas(categoryId);
  };

  // Function to handle subcategory click
  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="col-span-10 h-full">
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-3 h-full overflow-hidden rounded-lg">
          <div className="category rounded-lg h-full pb-10 bg-white">
            <h1 className="text-md font-semibold text-center bg-[#1FA45B] text-white py-3">
              Categories
            </h1>

            {/* Search input */}
            <form className="p-3 m-3 border-[1.5px] border-[#E2E2E2] rounded-lg">
              <Search sx={{ color: "#868686" }} />
              <input
                type="text"
                placeholder="Search by Catagories"
                className="bg-transparent px-2 focus:outline-none font-medium"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </form>

            <div className="categories p-2 overflow-auto h-full bg-white">
              {filteredCategories.map((category, index) => (
                <div
                  key={category.cat_id}
                  className={`collapse hover:bg-[#E8F0F5] rounded-lg my-2 ${
                    selectedCategoryId === category.cat_id && "bg-[#E8F0F5]"
                  }`}
                  onClick={() => handleCategoryClick(category.cat_id)}
                >
                  <input
                    type="radio"
                    name="my-accordion-1"
                    className="min-h-max"
                    defaultChecked={category.cat_id === selectedCategoryId}
                  />
                  <div className="collapse-title p-2 flex items-center min-h-max">
                    <Image
                      src="/cat_icon.png"
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] bg-[#CFE0E5] rounded-lg mr-3 object-cover p-2"
                      alt={category.cat_icon}
                    />
                    <div className="me-auto">
                      <h1
                        className={`text-[16px] font-[600] ${
                          selectedCategoryId === category.cat_id &&
                          "text-[#1FA45B]"
                        }`}
                      >
                        {category.cat_name_en}
                      </h1>
                      <span className="text-[14px] text-[#7E7E7E]">
                        Subcategory: {category.no_of_subcat}
                      </span>
                    </div>
                    <div className="text-center">
                      <h1 className="text-[16px] font-[600]">
                        {category.no_of_dua}
                      </h1>
                      <span className="text-[14px] text-[#7E7E7E]">Duas</span>
                    </div>
                  </div>
                  <div className="collapse-content">
                    <div className="subcategories">
                      {subcategories.map((subcategory) => (
                        <div
                          key={subcategory.subcat_id}
                          className="collapse subcategory border-l-2 relative border-dotted border-[#1FA45B] rounded-none ml-5"
                          onClick={() =>
                            handleSubcategoryClick(subcategory.subcat_id)
                          }
                        >
                          <input
                            type="radio"
                            name="my-accordion-2"
                            defaultChecked={
                              subcategory.subcat_id === selectedSubcategoryId
                            }
                            className="min-h-max"
                          />
                          <div className="collapse-title py-3 pe-0 text-left min-h-max text-[#1FA45B]">
                            {subcategory.subcat_name_en}
                          </div>
                          <div className="collapse-content ml-6">
                            <div className="duas">
                              {duas
                                .filter(
                                  (dua) =>
                                    dua.subcat_id === selectedSubcategoryId
                                )
                                .map((dua) => (
                                  <div key={dua.dua_id} className="flex">
                                    {dua.dua_name_en && (
                                      <>
                                        <div className="icon">
                                          <Image
                                            src="/duaarrow.svg"
                                            width={15}
                                            height={15}
                                            className="rounded-lg mr-3 object-cover "
                                            alt={category.cat_icon}
                                          />
                                        </div>
                                        <a
                                          href={`#${dua.dua_id}`}
                                          className="text-[14px] mb-2"
                                        >
                                          {dua.dua_name_en}
                                        </a>
                                      </>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="allduas col-span-6 overflow-auto px-1">
          {subcategories.map((subcategory) => {
            return (
              <>
                <div
                  key={subcategory.subcat_id}
                  className="section_name px-5 py-4 bg-white mb-5 rounded-lg"
                  id={subcategory.subcat_id}
                >
                  <span className="text-[#1FA45B]">Section: </span>
                  {subcategory.subcat_name_en}
                </div>
                {duas
                  .filter((dua) => dua.cat_id === selectedCategoryId)
                  .map((dua) => (
                    <div
                      key={dua.dua_id}
                      className="allduas bg-white p-5 rounded-lg mb-5"
                      id={dua.dua_id}
                    >
                      <div className="dua_name mb-5 text-[#1FA45B] font-semibold flex items-center">
                        <div>
                          <Image
                            src="/duacard.svg"
                            width={35}
                            height={35}
                            className="w-[35px] h-[35px] rounded-lg mr-3 object-cover"
                          />
                        </div>{" "}
                        {dua.dua_name_en && (
                          <>
                            {dua.id}. {dua.dua_name_en}
                          </>
                        )}
                      </div>
                      <div className="dua">{dua.top_en}</div>
                      {dua.dua_arabic && (
                        <div className="dua_arabic mt-5 text-[24px] text-right">
                          {dua.dua_arabic}
                        </div>
                      )}
                      {dua.transliteration_en && (
                        <div className="translation mt-5 italic">
                          <span className="font-semibold">
                            Transliteration:{" "}
                          </span>
                          {dua.transliteration_en}
                        </div>
                      )}
                      {dua.translation_en && (
                        <div className="translation mt-5">
                          <span className="font-semibold">Translation: </span>
                          {dua.translation_en}
                        </div>
                      )}
                    </div>
                  ))}
              </>
            );
          })}
        </div>

        <SidebarRight />
      </div>
    </div>
  );
};

export default DuaPage;
