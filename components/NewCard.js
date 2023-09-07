"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useFilterContext } from "./FilterContext";

const NewCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("channel");
  const [ava, setAva] = useState(
    "https://avatars.githubusercontent.com/u/85594221?s=80&v=4"
  );
  const [theme, setTheme] = useState("погода");
  const [language, setLanguage] = useState("english");
  const [description, setDescription] = useState("Channel about weather");
  const [subscribers, setSubscribers] = useState(0);
  const [views, setViews] = useState(0);
  const [cpv, setCpv] = useState(0);
  const [geo, setGeo] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});
  const [shown, setShown] = useState(1);

  const { themes, lang, geos, types } = useFilterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!channelName) {
      validationErrors.channelName = "Please enter the channel name";
    }
    if (!ava) {
      validationErrors.ava = "Please enter the image URL";
    }
    if (!theme) {
      validationErrors.theme = "Please enter the channel topic";
    }
    if (theme === "Введите тему канала") {
      validationErrors.theme = "Please enter the channel topic";
    }
    if (!language) {
      validationErrors.language = "Please enter the language";
    }
    if (language === "Введите Language") {
      validationErrors.language = "Please enter the language";
    }
    if (!description) {
      validationErrors.description = "Please enter channel description ";
    }

    if (!geo) {
      validationErrors.geo = "Please enter the channel geo";
    }
    if (!type) {
      validationErrors.type = "Please enter the channel type";
    }
    if (geo === "Выберите геолокацию канала") {
      validationErrors.geo = "Please enter the channel geo";
    }

    if (type === "Выберите Channel type") {
      validationErrors.type = "Please enter the channel type";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      console.log("Send data");
      const res = await fetch("/api/cards/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: ava,
          name: channelName,
          // name: channelName.charAt(0).toLowerCase() + channelName.slice(1),
          theme: theme,
          language: language,
          description: description,
          subscribers: subscribers,
          views: views,
          is_shown: shown,
          type: type,
          geolocation: geo,
          cpv: cpv,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Обработка успешного ответа
          // console.log(result);
        })
        .catch((error) => {
          // Обработка ошибок
          console.error(error);
        });
    }

    setChannelName("");
    setAva("");
    setTheme("");
    setDescription("");
    setLanguage("");
    setCpv(0);
    setSubscribers(0);
    setViews(0);
    setErrors({});
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="card admin-card cursor-pointer text-l text-center border-solid border border-slate-300 rounded-md p-2 mb-2 lg:text-xl hover:bg-slate-200"
        onClick={openModal}
      >
       Add new channel
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          id="buyer-modal-form"
          onSubmit={handleSubmit}
          className="modal-form text-xs"
        >
          <label className="modal-label">
            Channel name:
            <input
              className="modal-input"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            {errors.channelName && (
              <span className="error">{errors.channelName}</span>
            )}
          </label>

          <label className="modal-label">
            Avatar:
            <input
              className="modal-input"
              type="text"
              value={ava}
              onChange={(e) => setAva(e.target.value)}
            />
            {errors.ava && <span className="error">{errors.ava}</span>}
          </label>

          <label className="modal-label">
            Channel type:
            <div className="flex">
              <input
                className="modal-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <select
                className="modal-input "
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Выберите Channel type">other</option>
                {types && types.length > 0
                  ? types.map((item) => (
                      <option key={Math.random()} className="" value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.type && <span className="error">{errors.type}</span>}
          </label>
          <label className="modal-label">
            Channel geo:
            <div className="flex">
              <input
                className="modal-input"
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
              />
              <select
                className="modal-input "
                onChange={(e) => setGeo(e.target.value)}
              >
                <option value="Выберите геолокацию канала">other</option>
                {geos && geos.length > 0
                  ? geos.map((item) => (
                      <option key={Math.random()} className="" value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.geo && <span className="error">{errors.geo}</span>}
          </label>

          <label className="modal-label">
            Topic:
            <div className="flex">
              <input
                className="modal-input"
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <select
                className="modal-input "
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="Введите тему канала">other</option>
                {themes && themes.length > 0
                  ? themes.map((item) => (
                      <option key={item} className="" value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.theme && <span className="error">{errors.theme}</span>}
          </label>

          <label className="modal-label">
            Language:
            <div className="flex">
              <input
                className="modal-input"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <select
                className="modal-input "
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Введите Language">other</option>
                {lang && lang.length > 0
                  ? lang.map((item) => (
                      <option key={item} className="" value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.language && (
              <span className="error">{errors.language}</span>
            )}
          </label>

          <label className="modal-label">
            Number of views:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={views}
              onChange={(e) => setViews(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            Number of subscribers:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={subscribers}
              onChange={(e) => setSubscribers(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            CPV:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={cpv}
              onChange={(e) => setCpv(parseInt(e.target.value))}
            ></input>
          </label>

          <label className="modal-label">
            Description:
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

           <label className="modal-label">
            <select
              className="modal-input"
              onChange={(event) => handleShow(event)}
            >
              <option value="1">Show</option>
              <option value="0">Hide</option>
            </select>
          </label>

          <button type="submit">Send</button>
        </form>
      </Modal>
    </>
  );
};

export default NewCard;
