import React, { useEffect, useState, useRef } from "react";
import {
  useGetItineraryMutation,
  useEditItineraryMutation,
} from "../features/itinerariesAPI";
import InputFormItinerary from "./InputFormItinerary";
import { useSelector, useDispatch } from "react-redux";
import "../styles/EditItinerary.css";
import { change } from "../features/modalSlice";
import toast from "react-hot-toast";
import { reload } from "../features/reloadSlice";
export default function PatchItinerary() {
  const [itinerary, setItinerary] = useState({});
  const [price, setPrice] = useState({});
  const [duration, setDuration] = useState({});
  const [editItinerary] = useEditItineraryMutation();
  const formRef = useRef();
  const id = useSelector((state) => state.edit.id);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalState);
  const [getItinerary] = useGetItineraryMutation();
  const formData = [
    {
      nameForm: "Itinerary",
      name: "name",
      type: "text",
      min: "4",
      max: "50",
    },
    {
      nameForm: "Price",
      name: "price",
      type: "number",
      min: "1",
      max: "5",
    },
    {
      nameForm: "Duration",
      name: "duration",
      type: "number",
      min: "1",
      max: "6",
    },
  ];
  let array = [itinerary, price, duration];
  async function getOneItinerary() {
    try {
      let res = await getItinerary(id);
      if (res.data?.success) {
        setItinerary(res.data?.response.name);
        setPrice(res.data?.response.price);
        setDuration(res.data?.response.duration);
      } else {
        console.log(res.error);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getOneItinerary();
  }, [modal]);

  const showForm = (obj, i) => (
    <fieldset className="NewCitiesPage-fieldset" key={obj.name}>
      <legend>{obj.nameForm}</legend>
      <InputFormItinerary
        type={obj.type}
        name={obj.name}
        value={array[i]}
        min={obj.min}
        max={obj.max}
        fnc={(e) => {
          if (obj.nameForm === "Itinerary") {
            return setItinerary(e.target.value);
          } else if (obj.nameForm === "Price") {
            return setPrice(e.target.value);
          } else {
            return setDuration(e.target.value);
          }
        }}
      />
    </fieldset>
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const body = Object.fromEntries(form);
    editItinerary({
      ...body,
      id: id,
    })
      .then((response) => {
        dispatch(reload());
        if (response.data?.success) {
          toast(`${response.data.message}`, {
            icon: "😃",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          });
        } else {
          toast("Could't be modified", {
            icon: "😥",
            style: {
              borderRadius: ".5rem",
              background: "#3f3d56",
              color: "aliceblue",
            },
          });
        }
      })
      .catch((error) => console.log(error));
    dispatch(change());
  };

  const setOpenModal = () => {
    dispatch(change());
  };

  return (
    <div className="EditItinerary-container">
      <h3>Edit Itinerary</h3>
      <form className="NewCitiesPage-form" ref={formRef}>
        {formData.map(showForm)}
        <div className="btns-container">
          <button className="cancel-btn" onClick={setOpenModal}>
            Cancel
          </button>
          <button className="edit-btn" onClick={handleSubmit} type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
