"use client";
import NewCard from "@components/NewCard";
import Filters from "@components/Filters";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import AdminCards from "@components/AdminCards";
import RemovedCard from "@components/RemovedCard";
import { useFilterContext } from "@components/FilterContext";

const Home = () => {
  const {
    channels,
    handleSortByCpv,
    handleSortBySubs,
    handleSortByView,
    isCpvSorted,
    isSubSorted,
    isViewSorted,
    isCpvSortedDesc,
    isSubSortedDesc,
    isViewSortedDesc,
    showLoader,
    showNoChannel,
    removedChannels,
  } = useFilterContext();

  return (
    <section className="main lg:grid grid-cols-[20%_auto] lg:py-5 lg:px-20 lg:gap-5">
      <div className="hidden lg:block">
        <Filters />
      </div>
      <div className="content px-3">
        <div className="info lg:flex lg:mb-7 lg:justify-between" >
          <h2 className="my-3 text-center lg:text-start font-semibold text-lg lg:my-0 lg:mr-10 lg:text-2xl">Channels</h2>
          <div className="mb-4 text-center font-medium grid grid-cols-3 gap-4 text-sm lg:text-xl lg:block lg:text-start lg:mb-0">
            {/* <span className="filtrs-option">Рейтинг</span> */}
            <span className="filtrs-option lg:mr-10 cursor-pointer" onClick={handleSortBySubs}>
              Subscribers
              {isSubSorted ? (isSubSortedDesc ? "🔽" : "🔼") : ""}
            </span>
            <span className="filtrs-option lg:mr-10 cursor-pointer" onClick={handleSortByView}>
              Views
              {isViewSorted ? (isViewSortedDesc ? "🔽" : "🔼") : ""}
            </span>{" "}
            <span className="filtrs-option lg:mr-10 cursor-pointer" onClick={handleSortByCpv}>
              Price
              {isCpvSorted ? (isCpvSortedDesc ? "🔽" : "🔼") : ""}
            </span>
          </div>
        </div>
        <ul>
          <>
            <NewCard />
            {channels && channels.length > 0 ? (
              channels.map((channel) => (
                <AdminCards key={channel.id} channel={channel} />
              ))
            ) : (
              <>
                {showLoader && (
                  <div className="card flex justify-center items-center w-full">
                    <PulseLoader color="#315EEB" margin={10} />
                  </div>
                )}
                {showNoChannel && (
                  <div className="card lg:text-xl">
                    Список пуст
                  </div>
                )}
              </>
            )}

            {removedChannels && removedChannels.length > 0
              ? removedChannels.map((channel) => (
                  <RemovedCard key={channel.id} channel={channel} />
                ))
              : null}
          </>
        </ul>
      </div>
    </section>
  );
};

export default Home;
