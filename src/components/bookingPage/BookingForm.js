import "./BookingForm.css";
import { useEffect, useState, useRef } from "react";
import ConfirmBooking from "./ConfirmBooking";
import { useLocation } from "react-router-dom";

const BookingForm = (props) => {
  const nameRef = useRef();
  const availableTimes = props.availableTimes;
  const updateTimes = props.updateTimes;
  
  
  const [disable1, setDisable1] = useState("");
  const [disable2, setDisable2] = useState(" disable");
  const [form, setForm] = useState({
    id: 0,
    date: new Date().toISOString().split("T")[0],
    time: "",
    diners: "",
    occasion: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const location = useLocation();
  const { editForm } = location.state || {};
  useEffect(() => {
    if (editForm) {
      setForm(editForm);
    }
  }, [editForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formErrorValidate();
    if (
      formErrors.date ||
      formErrors.time ||
      formErrors.diners ||
      formErrors.occasion ||
      formErrors.name ||
      formErrors.email ||
      formErrors.phone
    ) {
      nameRef.current.scrollIntoView();
      return;
    }
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    const submitted = props.onSubmit(form);
    setIsConfirmed(submitted);
    const reservations = props.reservations;
    if (reservations.find((res) => res.id === form.id)) {
      const updatedReservations = reservations.map((res) =>
        res.id === form.id ? form : res
      );
      props.setReservations(updatedReservations);
    } else {
      form.id = reservations.length + 101;
      props.setReservations([...props.reservations, form]);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    updateTimes(new Date(form.date));
  }, [form.date]);

  const [formErrors, setFormErrors] = useState({
    date: false,
    time: false,
    diners: false,
    occasion: false,
    name: false,
    email: false,
    phone: false,
  });

  const formErrorValidate = () => {
    setFormErrors({
      date: form.date === "",
      time: form.time === "",
      diners: form.diners === "" || form.diners > 12,
      occasion: form.occasion === "",

      name: form.name === "",
      email:
        form.email === "" ||
        !form.email.includes("@") ||
        !form.email.includes("."),
      phone: form.phone === "" || form.phone.length < 10,
    });
  };

  const formErrorValidateFirstPage = () => {
    setFormErrors({
      date: form.date === "",
      time: form.time === "",
      diners: form.diners === "" || form.diners > 12,
      occasion: form.occasion === "",
    });
  };

  const labelRef = useRef();

  return (
    <>
      <h1 id="form-title">Reserve a table</h1>
      <h3
        style={{
          width: "75%",
          margin: "auto auto",
          textAlign: "center",
          padding: "20px",
          color: "#333333",
        }}
      >
        This reservation form consists of two steps. Theese two steps include
        your reservation details and your contact information. Please fill in
        the form to make a reservation. Feel free to contact us if you have any
        questions. You can edit your reservation details later on by clicking on
        the edit button on the reservation card on reservations page.
      </h3>
      <section className="form" role="form">
        <form
          onSubmit={(e) => {
            if (
              form.date === "" ||
              form.time === "" ||
              form.diners === "" ||
              form.occasion === ""
            ) {
              formErrorValidateFirstPage();
              e.preventDefault();
              labelRef.current.scrollIntoView();
            } else {
              e.preventDefault();
              setDisable1(" disable");
              setDisable2("");
              setTimeout(() => {
                nameRef.current.focus();
              }, 1);
            }
          }}
          className={"form-page-1" + disable1}
        >
          <label htmlFor="reservation-date" ref={labelRef}>
            Reservation date:
            <input
              name="reservation-date"
              id="reservation-date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.date}
              onChange={(e) => {
                setForm({ ...form, date: e.target.value });
                setFormErrors({ ...formErrors, date: e.target.value === "" });
              }}
              required
            />
            {formErrors.date && (
              <p role="alert" className="error">
                Please select a date
              </p>
            )}
          </label>
          <div className="form-row" role="row">
            <label htmlFor="reservation-time">
              Reservation time:
              <select
                name="reservation-time"
                id="reservation-time"
                value={form.time}
                onChange={(e) => {
                  setForm({ ...form, time: e.target.value });
                  setFormErrors({ ...formErrors, time: e.target.value === "" });
                }}
                required
              >
                <option value="">Select a time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {formErrors.time && (
                <p role="alert" className="error">
                  Please select a time
                </p>
              )}
            </label>
            <label htmlFor="number-of-diners">
              Number of diners:
              <input
                name="number-of-diners"
                id="number-of-diners"
                placeholder="Select the number of diners (max 12)"
                type="number"
                min="1"
                max="12"
                value={form.diners}
                onChange={(e) => {
                  setForm({ ...form, diners: e.target.value });
                  setFormErrors({
                    ...formErrors,
                    diners: e.target.value === "" || e.target.value > 12,
                  });
                }}
                required
              />
              {formErrors.diners && (
                <p role="alert" className="error">
                  Please select the number of diners (max 12)
                </p>
              )}
            </label>
          </div>
          <label htmlFor="Occasion">
            Occasion:
            <select
              name="Occasion"
              id="Occasion"
              value={form.occasion}
              onChange={(e) => {
                setForm({ ...form, occasion: e.target.value });
                setFormErrors({
                  ...formErrors,
                  occasion: e.target.value === "",
                });
              }}
              required
            >
              <option value="">Select an occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Wedding">Wedding</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.occasion && (
              <p role="alert" className="error">
                Please select an occasion
              </p>
            )}
          </label>
          <button
            className="nav"
            type="submit"
            disabled={
              form.date === "" ||
              form.time === "" ||
              form.diners === "" ||
              form.occasion === "" 
            }
          >
            <h4>Next Step</h4>
          </button>
        </form>

        <form onSubmit={handleSubmit} className={"form-page-2" + disable2}>
          <label htmlFor="name" ref={nameRef}>
            Name:
            <input
              name="name"
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setFormErrors({ ...formErrors, name: e.target.value === "" });
              }}
              required
              minLength={2}
            />
            {formErrors.name && (
              <p role="alert" className="error">
                Please enter your name
              </p>
            )}
          </label>
          <label htmlFor="email">
            {"Email:"}
            <input
              name="email"
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setFormErrors({
                  ...formErrors,
                  email:
                    e.target.value === "" ||
                    !e.target.value.includes("@") ||
                    !e.target.value.includes("."),
                });
              }}
              required
            />
            {formErrors.email && (
              <p role="alert" className="error">
                Please enter a valid email
              </p>
            )}
          </label>
          <label htmlFor="phone">
            Phone:
            <input
              name="phone"
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                setFormErrors({
                  ...formErrors,
                  phone: e.target.value === "" || e.target.value.length < 10,
                });
              }}
              minLength={10}
              maxLength={16}
              required
            />
          </label>
          {formErrors.phone && (
            <p role="alert" className="error">
              Please enter a valid phone number
            </p>
          )}
          <label htmlFor="special-requests">
            Special requests:
            <textarea
              name="special-requests"
              id="special-requests"
              placeholder="Please fill this field if you have any special requests"
              value={form.specialRequests}
              onChange={(e) => {
                setForm({ ...form, specialRequests: e.target.value });
              }}
            />
          </label>
          <button
            className="nav"
            type="nav"
            onClick={(e) => {
              e.preventDefault();
              setDisable1("");
              setDisable2(" disable");
            }}
          >
            <h4>Previuos Step</h4>
          </button>
          <button type="submit">
            <h4>Submit</h4>
          </button>
        </form>
      </section>
      {isModalOpen && (
        <ConfirmBooking
          form={form}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isConfirmed={isConfirmed}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default BookingForm;
