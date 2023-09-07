"use client";
import Card from "@components/Card";
import Filters from "@components/Filters";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PulseLoader from "react-spinners/PulseLoader";

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [showNoChannel, setShowNoChannel] = useState(false);
  const [channels, setChannels] = useState([]);
  const search = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTheme, setSearchTheme] = useState(
    search ? search.get("theme") : ""
  );
  const [searchLang, setSearchLang] = useState(
    search ? search.get("language") : ""
  );

  const [isViewSorted, setIsViewSorted] = useState(false);
  const [isViewSortedDesc, setIsViewSortedDesc] = useState(false);
  const [isSubSorted, setIsSubSorted] = useState(false);
  const [isSubSortedDesc, setIsSubSortedDesc] = useState(false);
  const [isCpvSorted, setIsCpvSorted] = useState(false);
  const [isCpvSortedDesc, setIsCpvSortedDesc] = useState(false);

    useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/cards`);
      const data = await res.json();
      setChannels(data);
      } catch (error) {
        console.log(error)
      }
    };
    getData();
  }, []);

  const onSearch = async (event) => {
    event.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  const onThemeFilter = async (event) => {
    event.preventDefault();
    setSearchTheme(event.target.value);
    router.push(`/?theme=${event.target.value}`,undefined, { shallow: true });
    const res = await fetch(`/api/search/?theme=${event.target.value}`);
    const data = await res.json();
    setChannels(data);
  };

  const onLangFilter = async (event) => {
    event.preventDefault();
    setSearchLang(event.target.value);
    router.push(`/?language=${event.target.value}`, undefined, { shallow: true });
    const res = await fetch(`/api/search/?language=${event.target.value}`);
    const data = await res.json();
    setChannels(data);
  };

  const handleSortByView = () => {
    const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isViewSorted && !isViewSortedDesc) {
        setIsViewSortedDesc(true)
        setIsViewSorted(true)
        return b.views - a.views; // От большего к меньшему
      } else if (isViewSorted && isViewSortedDesc) {
        setIsViewSortedDesc(false)
        return a.views - b.views; // От меньшего к большему
      } else if (isViewSorted && !isViewSortedDesc) {
         setIsViewSorted(false)
      }
    });

    setChannels(sortedList);
  };

  const handleSortBySubs = () => {
   const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isSubSorted && !isSubSortedDesc) {
        setIsSubSortedDesc(true)
        setIsSubSorted(true)
        return b.views - a.views; // От большего к меньшему
      } else if (isSubSorted && isSubSortedDesc) {
        setIsSubSortedDesc(false)
        return a.views - b.views; // От меньшего к большему
      } else if (isSubSorted && !isSubSortedDesc) {
         setIsSubSorted(false)
      }
    });

    setChannels(sortedList);
  };

  const handleSortByCpv = () => {
  const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isCpvSorted && !isCpvSortedDesc) {
        setIsCpvSortedDesc(true)
        setIsCpvSorted(true)
        return b.views - a.views; // От большего к меньшему
      } else if (isCpvSorted && isCpvSortedDesc) {
        setIsCpvSortedDesc(false)
        return a.views - b.views; // От меньшего к большему
      } else if (isCpvSorted && !isCpvSortedDesc) {
         setIsCpvSorted(false)
      }
    });

    setChannels(sortedList);
  };

  return (
    <section className="main">
      <Filters
        channels={channels}
        onSearch={onSearch}
        onThemeFilter={onThemeFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLangFilter={onLangFilter}
      />
      <div className="content">
        <div className="info">
          <h2>Channels</h2>
          <div className="filtrs">
            {/* <span className="filtrs-option">Рейтинг</span> */}
            <span className="filtrs-option" onClick={handleSortByView}>
              Views
              {isViewSorted ? (isViewSortedDesc ? "🔽" : "🔼") : ""}
            </span>{" "}
            <span className="filtrs-option" onClick={handleSortBySubs}>
              Subscribers
              {isSubSorted ? (isSubSortedDesc ? "🔽" : "🔼") : ""}
            </span>
            <span className="filtrs-option" onClick={handleSortByCpv}>
              Price
              {isCpvSorted ? (isCpvSortedDesc ? "🔽" : "🔼") : ""}
            </span>
          </div>
        </div>
        <ul>
          <>
            {channels && channels.length > 0 ? (
              channels.map((channel) => (
                <Card key={channel.id} channel={channel} />
              ))
            ) : (
              <>
                {showLoader && (
                  <div className="card">
                    <PulseLoader color="#315EEB" margin={10} />
                  </div>
                )}
                {showNoChannel && (
                  <div className="card">Канал с таким названием не найден</div>
                )}
              </>
            )}
          </>
        </ul>
      </div>
    </section>
  );
};

export default Home;
