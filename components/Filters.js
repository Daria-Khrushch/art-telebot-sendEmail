"use client";
import Image from "next/image";
import { useFilterContext } from "./FilterContext";

export default function Filters() {

  const { themes,lang, setSearchQuery, onSearch, searchQuery, onThemeFilter,onLangFilter, geos, types, onTypeFilter, onGeoFilter } = useFilterContext()



  return (
    <div className="filters lg:text-2xl">
      <h2 className="hidden lg:block lg:mb-7 font-semibold">Filters</h2>
      <form id="search" onSubmit={onSearch} className="relative">
        <input
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search..."
          className="focus:outline-none placeholder:text-slate-800 overflow-hidden my-2 p-1 w-full border-solid border-2 border-slate-300 rounded-md"
        />
        <button className="filtres-btn hidden absolute inset-y-0 right-0 lg:flex items-center pr-2" onSubmit={onSearch}>
          <Image
            className="filtres-img"
            src="/assets/images/search_icon.png"
            alt="avatar"
            width={25}
            height={25}
          />
        </button>
         <button className="filtres-btn lg:hidden absolute inset-y-0 right-0 flex items-center pr-2" onSubmit={onSearch}>
          <Image
            className="filtres-img"
            src="/assets/images/search_icon.png"
            alt="avatar"
            width={15}
            height={15}
          />
        </button>
      </form>
      <div className="">
        <p className="hidden lg:block">Subjects:</p>
        <select className="focus:outline-none my-2 relative p-1 w-full border-solid border-2 border-slate-300 rounded-md" onChange={(event) =>  onThemeFilter(event)}>
          <option className="" value="">
            All
          </option>
          {themes && themes.length > 0
            ? themes.map((item) => (
                <option key={item} className="" value={item}>
                  {item}
                </option>
              ))
            : null}
        </select>
      </div>
      <div className="">
        <p className=" hidden lg:block">Language:</p>
        <select className="focus:outline-none my-2 relative p-1 w-full border-solid border-2 border-slate-300 rounded-md" onChange={(event) => onLangFilter(event)}>
          <option className="filters-option" value="">
            All
          </option>
          {lang && lang.length > 0
            ? lang.map((items) => (
                <option key={items} className="filters-option" value={items}>
                  {items}
                </option>
              ))
            : null}
        </select>
      </div>

      <div className="">
        <p className=" hidden lg:block">Geolocation:</p>
        <select className="focus:outline-none my-2 relative p-1 w-full border-solid border-2 border-slate-300 rounded-md" onChange={(event) => onGeoFilter(event)}>
          <option className="filters-option" value="">
            All
          </option>
          {geos && geos.length > 0
            ? geos.map((items) => (
                <option key={items} className="filters-option" value={items}>
                  {items}
                </option>
              ))
            : null}
        </select>
      </div>

      <div className="">
        <p className=" hidden lg:block">Type:</p>
        <select className="focus:outline-none my-2 relative p-1 w-full border-solid border-2 border-slate-300 rounded-md" onChange={(event) => onTypeFilter(event)}>
          <option className="filters-option" value="">
            All
          </option>
          {types && types.length > 0
            ? types.map((items) => (
                <option key={items} className="filters-option" value={items}>
                  {items}
                </option>
              ))
            : null}
        </select>
      </div>
    </div>
  );
}
