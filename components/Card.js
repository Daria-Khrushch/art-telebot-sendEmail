"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Card = ({ channel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(1);
  const [buyer, setBuyer] = useState("user");
  const [telegram, setTelegram] = useState("@user");
  const [format, setFormat] = useState("1/24");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setPrice(channel.cpv);
  }, [channel]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!buyer) {
      validationErrors.buyer = "Please enter your name";
    }

    if (!telegram) {
      validationErrors.buyer = "Please enter your Telegram login";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer_name: buyer,
          buyer_telegram: telegram,
          ads_format: format,
          ads_quantity: value,
          ads_sum: price,
          channel_name: channel.name,
          channel_id: channel.id,
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

      const sendEmail = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          buyer_name: buyer,
          buyer_telegram: telegram,
          ads_format: format,
          ads_quantity: value,
          ads_sum: price,
          channel_name: channel.name,
          channel_id: channel.id,
        }),
      });
    }

    setBuyer("");
    setTelegram("");
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

  return (
    <>
      <div className="card grid text-xs p-2 mb-2 grid-rows-[1fr_auto] gap-2 lg:text-xl lg:mb-5 lg:p-5 lg:grid-rows-1">
        <div className=" grid grid-cols-[20%_30%_30%_10%] gap-2 md:gap-3 lg:gap:5 lg:grid-cols-[10%_20%_30%_25%_5%]">
          <div>
            <div className="border-slate-300 border-r lg:justify-center lg:flex">
              <img
                className="rounded-lg"
                src={channel.avatar}
                alt=""
                width="100"
                height="100"
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <h3 className="font-semibold">{channel.name}</h3>
            <span className="desc">{channel.description}</span>
          </div>

          <div className="meta border-slate-300 border-r lg:justify-between">
            <div className="lg:flex flex-col">
              {channel.type === "группа" ? (
                <h3 className="lg:mr-2 lg:font-semibold">Subscribers</h3>
              ) : (
                <h3 className="lg:mr-2 lg:font-semibold">Subscribers</h3>
              )}

              <span>{channel.subscribers}</span>
            </div>

            <div className="lg:flex flex-col">
              <h3 className="lg:mr-2 lg:font-semibold">Views</h3>
              <span>{channel.views}</span>
            </div>
          </div>

          <div className="setting border-slate-300 border-r">
            <div className="mb-2">
              <span className="mr-1">Format</span>
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
              <span className="mr-1">Quantity</span>
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
                src="/assets/images/add-to-cart.png"
                className="cursor-pointer"
                alt="cart"
                width={35}
                height={35}
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
        <h3 className="modal-form title-form">
         Please leave your data below and we will contact you as soon as possible:
        </h3>
        <form
          id="buyer-modal-form "
          onSubmit={handleSubmit}
          className="modal-form pb-4"
        >
          <label className="modal-label">
            Name:
            <input
              className="modal-input"
              type="text"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
            />
            {errors.buyer && <span className="error">{errors.buyer}</span>}
          </label>

          <label className="modal-label">
            Your Telegram login:
            <input
              className="modal-input mb-5"
              type="tel"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            {errors.telegram && (
              <span className="error">{errors.telegram}</span>
            )}
          </label>

          <button type="submit">
            Send
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Card;
