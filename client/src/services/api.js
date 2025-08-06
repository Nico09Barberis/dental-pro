const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);
import axios from "axios";

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const fetchMe = async (token) => {
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};



export const createAppointment = async (formData, token) => {
  try {
    const { specialty, date, time } = formData;

    const appointmentDate = new Date(`${date}T${time}`);

    const res = await axios.post(
      `${API_URL}/appointments`,
      {
        professional: "ID_DEL_PROFESIONAL_TEMPORAL", // Reemplazar
        date: appointmentDate,
        reason: specialty,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error creando turno", error);
    return { error: true };
  }
};

