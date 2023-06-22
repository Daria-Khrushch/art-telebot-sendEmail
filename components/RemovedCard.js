"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useFilterContext } from "./FilterContext";

const RemovedCard = ({ channel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [format, setFormat] = useState("1/24");
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(1);
  const [channelName, setChannelName] = useState(channel.name);
  const [ava, setAva] = useState(channel.avatar);
  const [theme, setTheme] = useState(channel.theme);
  const [language, setLanguage] = useState(channel.language);
  const [description, setDescription] = useState(channel.description);
  const [subscribers, setSubscribers] = useState(channel.subscribers);
  const [views, setViews] = useState(channel.views);
  const [cpv, setCpv] = useState(channel.cpv);
  const [shown, setShown] = useState(0);
  const [geo, setGeo] = useState(channel.geolocation);
  const [type, setType] = useState(channel.type);
  const [errors, setErrors] = useState({});

  const { themes, lang, types, geos } = useFilterContext();

  useEffect(() => {
    setPrice(channel.cpv);
  }, [channel]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!channelName) {
      validationErrors.channelName = "Пожалуйста, введите название канала";
    }
    if (!ava) {
      validationErrors.ava = "Пожалуйста, введите URL картинки";
    }
    if (!theme) {
      validationErrors.theme = "Пожалуйста, введите тему канала";
    }
    if (!geo) {
      validationErrors.geo = "Пожалуйста, выберите геолокацию канала";
    }
    if (!type) {
      validationErrors.type = "Пожалуйста, выберите тип канала";
    }
    if (geo === "Выберите геолокацию канала") {
      validationErrors.geo = "Пожалуйста, выберите геолокацию канала";
    }

    if (type === "Выберите тип канала") {
      validationErrors.type = "Пожалуйста, выберите тип канала";
    }
    if (!language) {
      validationErrors.language = "Пожалуйста, введите язык канала";
    }
    if (theme === "Введите тему канала") {
      validationErrors.theme = "Пожалуйста, введите тему канала";
    }

    if (language === "Введите язык канала") {
      validationErrors.language = "Пожалуйста, введите язык канала";
    }
    if (!description) {
      validationErrors.description = "Пожалуйста, введите описание канала";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const res = await fetch("/api/cards/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: channel.id,
          avatar: ava,
          name: channelName,
          theme: theme,
          language: language,
          description: description,
          subscribers: subscribers,
          views: views,
          cpv: cpv,
          is_shown: shown,
          type: type,
          geolocation: geo,
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
    setErrors({});
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const valueToNum = parseInt(event.target.value);
    setValue(valueToNum);
    setPrice(channel.cpv * valueToNum);
  };

  const handleFormatChange = (event) => {
    const value = event.target.value;
    setFormat(value);
  };

  const handleShow = (event) => {
    event.preventDefault();
    const valueToNum = parseInt(event.target.value);
    setShown(valueToNum);
  };
  return (
    <>
      <div className="card grid text-xs p-2 mb-2 grid-rows-[1fr_auto] gap-2 bg-slate-100 lg:text-xl lg:mb-5 lg:p-5 lg:grid-rows-1">
        <div className=" grid grid-cols-[20%_30%_30%_10%] gap-2 md:gap-3 lg:gap:5 lg:grid-cols-[10%_20%_30%_25%_5%]">
          <div>
            <div className="border-slate-300 border-r lg:justify-center lg:flex">
              <Image
                className="rounded-lg removed-logo"
                src={channel.avatar}
                alt=""
                width={80}
                height={80}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <h3 className="font-semibold">{channel.name}</h3>
            <span className="desc">{channel.description}</span>
          </div>

          <div className="meta border-slate-300 border-r lg:justify-between">
            <div className="lg:flex flex-col">
              {channel.type === "группа" ? <h3 className="lg:mr-2 lg:font-semibold">Подписчики</h3> : <h3 className="lg:mr-2 lg:font-semibold">Участники</h3>}
              <span>{channel.subscribers}</span>
            </div>

            <div className="lg:flex flex-col">
              <h3 className="lg:mr-2 lg:font-semibold">Просмотры</h3>
              <span>{channel.views}</span>
            </div>
          </div>

          <div className="setting border-slate-300 border-r">
            <div className="mb-2">
              <span className="mr-1">Формат</span>
              <select
                name=""
                id=""
                value={format}
                onChange={handleFormatChange}
                className="w-12 focus:outline-slate-300 border lg:w-20 lg:ml-2"
              >
                <option value="1/24">1/24</option>
                <option value="2/48">2/48</option>
                <option value="3/72">3/72</option>
                <option value="Нативный">Нативный</option>
                <option value="Без удаления">Без удаления</option>
                <option value="Репост">Репост</option>
              </select>
            </div>
            <div>
              <span className="mr-1">Количество</span>
              <input
                type="number"
                name=""
                id=""
                min={0}
                value={value}
                onInput={handleChange}
                className="w-12 focus:outline-slate-300 border lg:w-20 lg:ml-2"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="adding" onClick={openModal}>
              <Image
                src="/assets/images/edit.png"
                className="cursor-pointer"
                alt="cart"
                width={25}
                height={25}
                onClick={openModal}
              />
            </div>

            <span className="text-right font-semibold mt-3">{price}$</span>
          </div>
        </div>
        <div className="grid grid-cols-[20%_auto] gap-2 md:gap-6 lg:hidden">
          <h3 className="font-semibold">{channel.name}</h3>
          <span className="desc">{channel.description}</span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          id="admin-modal-form"
          onSubmit={handleSubmit}
          className="modal-form text-xs"
        >
          <label className="modal-label">
            Название:
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
            Аватар:
            <input
              className="modal-input"
              type="text"
              value={ava}
              onChange={(e) => setAva(e.target.value)}
            />
            {errors.ava && <span className="error">{errors.ava}</span>}
          </label>

          <label className="modal-label">
            Тип канала:
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
                <option value="Выберите тип канала">Свой вариант</option>
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
            Гео канала:
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
                <option value="Выберите геолокацию канала">Свой вариант</option>
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
            Тема:
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
                <option value="Введите тему канала">Свой вариант</option>
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
            Язык канала:
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
                <option value="Введите язык канала">Свой вариант</option>
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
            Количество просмотров:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={views}
              onChange={(e) => setViews(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            Колличество подписчиков:
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
            Описание:
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
              <option value="0">Скрыть</option>
              <option value="1">Показать</option>
            </select>
          </label>

          <button type="submit">Отправить</button>
        </form>
      </Modal>
    </>
  );
};

export default RemovedCard;
