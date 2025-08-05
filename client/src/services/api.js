const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

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


export const createAppointment = async (appointmentData, token) => {
  try {
    const res = await fetch(`${API_URL}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error al crear turno:", err);
    return { error: true, msg: "Error al crear el turno" };
  }
};

