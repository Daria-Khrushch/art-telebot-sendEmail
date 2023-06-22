"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
// import useQueryParams from "@utils/useQueryParams";

const FilterContext = createContext();

export function FilterContextProvider({ children }) {
  const [channels, setChannels] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTheme, setSearchTheme] = useState("");
  const [searchLang, setSearchLang] = useState("");
  const [searchGeo, setSearchGeo] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [showNoChannel, setShowNoChannel] = useState(false);
  // const { queryParams, setQueryParams } = useQueryParams();
  const [isViewSorted, setIsViewSorted] = useState(false);
  const [isViewSortedDesc, setIsViewSortedDesc] = useState(false);
  const [isSubSorted, setIsSubSorted] = useState(false);
  const [isSubSortedDesc, setIsSubSortedDesc] = useState(false);
  const [isCpvSorted, setIsCpvSorted] = useState(false);
  const [isCpvSortedDesc, setIsCpvSortedDesc] = useState(false);
  const [removedChannels, setRemovedChannels] = useState([]);
  const [themes, setThemes] = useState([]);
  const [lang, setLang] = useState([]);
  const [types, setTypes] = useState([]);
  const [geos, setGeos] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `/api/search/?theme=${searchTheme}&language=${searchLang}&title=${searchQuery}&type=${searchType}&geo=${searchGeo}`
        );
        const data = await res.json();
        const filteredChannels = data.filter(
          (channel) => channel.is_shown === 1
        );
        const otherChannels = data.filter((channel) => channel.is_shown === 0);
        const uniqueThemes = Array.from(
          new Set(data.map((channel) => channel.theme))
        );
        const uniqueLang = Array.from(
          new Set(data.map((channel) => channel.language))
        );

        const uniqueTypes = Array.from(
          new Set(data.map((channel) => channel.type))
        );

        const uniqueGeos = Array.from(
          new Set(data.map((channel) => channel.geolocation))
        );
        setThemes(uniqueThemes);
        setLang(uniqueLang);
        setGeos(uniqueGeos);
        setTypes(uniqueTypes);
        setChannels(filteredChannels);
        setRemovedChannels(otherChannels);

        const timer = setTimeout(() => {
          setShowLoader(false);
          setShowNoChannel(true);
        }, 5000);

        return () => {
          clearTimeout(timer);
        };
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [searchTitle, searchTheme, searchLang, searchGeo, searchType]);

  const onSearch = async (event) => {
    event.preventDefault();
    setSearchTitle(searchQuery);
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowNoChannel(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  };

  const onThemeFilter = (event) => {
    event.preventDefault();
    setSearchTheme(event.target.value);
  };

  const onLangFilter = (event) => {
    event.preventDefault();
    setSearchLang(event.target.value);
  };

  const onGeoFilter = (event) => {
    event.preventDefault();
    setSearchGeo(event.target.value);
  };

  const onTypeFilter = (event) => {
    event.preventDefault();
    setSearchType(event.target.value);
  };

  const handleSortByView = () => {
    const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isViewSorted && !isViewSortedDesc) {
        setIsViewSortedDesc(true);
        setIsViewSorted(true);
        return b.views - a.views; // От большего к меньшему
      } else if (isViewSorted && isViewSortedDesc) {
        setIsViewSortedDesc(false);
        return a.views - b.views; // От меньшего к большему
      } else if (isViewSorted && !isViewSortedDesc) {
        setIsViewSorted(false);
      }
    });
    const filteredChannels = sortedList.filter(
      (channel) => channel.is_shown === 1
    );
    setChannels(filteredChannels);
  };

  const handleSortBySubs = () => {
    const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isSubSorted && !isSubSortedDesc) {
        setIsSubSortedDesc(true);
        setIsSubSorted(true);
        return b.subscribers - a.subscribers; // От большего к меньшему
      } else if (isSubSorted && isSubSortedDesc) {
        setIsSubSortedDesc(false);
        return a.subscribers - b.subscribers; // От меньшего к большему
      } else if (isSubSorted && !isSubSortedDesc) {
        setIsSubSorted(false);
      }
    });

    const filteredChannels = sortedList.filter(
      (channel) => channel.is_shown === 1
    );
    setChannels(filteredChannels);
  };

  const handleSortByCpv = () => {
    const sortedList = channels.slice();
    sortedList.sort((a, b) => {
      if (!isCpvSorted && !isCpvSortedDesc) {
        setIsCpvSortedDesc(true);
        setIsCpvSorted(true);
        return b.cpv - a.cpv; // От большего к меньшему
      } else if (isCpvSorted && isCpvSortedDesc) {
        setIsCpvSortedDesc(false);
        return a.cpv - b.cpv; // От меньшего к большему
      } else if (isCpvSorted && !isCpvSortedDesc) {
        setIsCpvSorted(false);
      }
    });

    const filteredChannels = sortedList.filter(
      (channel) => channel.is_shown === 1
    );
    setChannels(filteredChannels);
  };

  const contextValue = {
    channels,
    setChannels,
    searchQuery,
    setSearchQuery,
    onSearch,
    onThemeFilter,
    onLangFilter,
    toggleMenu,
    isMenuOpen,
    isSubSorted,
    handleSortByCpv,
    handleSortBySubs,
    handleSortByView,
    isViewSorted,
    isCpvSorted,
    isCpvSortedDesc,
    isSubSortedDesc,
    isViewSortedDesc,
    showLoader,
    showNoChannel,
    removedChannels,
    themes,
    lang,
    types,
    geos,
    onTypeFilter,
    onGeoFilter,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}
