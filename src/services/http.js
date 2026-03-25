import { QueryClient } from "@tanstack/react-query";
import { apiUrl } from "../config/api";

export const queryClient = new QueryClient();

const employeesPath = () => apiUrl("/api/employees");
const employeePath = (id) => apiUrl(`/api/employees/${id}`);
const loginPath = () => apiUrl("/api/employees/login");

export async function loginEmployee({ username, password }) {
  const response = await fetch(loginPath(), {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ username, password }),
  });

  let info = {};
  try {
    info = await response.json();
  } catch {
    /* non-JSON body */
  }

  if (!response.ok) {
    const error = new Error(info.message || "Login failed");
    error.code = response.status;
    error.info = info;
    throw error;
  }

  return info;
}

export async function fetchEmployees() {
  const response = await fetch(employeesPath());

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();

  return data;
}

export async function fetchSingleEmployee({ id, signal }) {
  const response = await fetch(employeePath(id), {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function requestNewHoliday({ id, holidays }) {
  const employeeResponse = await fetch(employeePath(id));

  if (!employeeResponse.ok) {
    const error = new Error("An error occurred while fetching employee data");
    error.code = employeeResponse.status;
    error.info = await employeeResponse.json();
    throw error;
  }

  const employeeData = await employeeResponse.json();
  const currentHolidays = Array.isArray(employeeData.holidays)
    ? employeeData.holidays
    : [];

  const newHoliday = { ...holidays, status: holidays.status || "requested" };
  const updatedHolidays = [...currentHolidays, newHoliday];

  const response = await fetch(employeePath(id), {
    method: "PATCH",
    body: JSON.stringify({
      holidays: updatedHolidays,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the holiday");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function updateHolidayStatus({
  employeeId,
  holidayIndex,
  status,
  declineReason,
}) {
  const employeeResponse = await fetch(employeePath(employeeId));

  if (!employeeResponse.ok) {
    const error = new Error("An error occurred while fetching employee data");
    error.code = employeeResponse.status;
    error.info = await employeeResponse.json();
    throw error;
  }

  const employeeData = await employeeResponse.json();
  const holidays = Array.isArray(employeeData.holidays)
    ? [...employeeData.holidays]
    : [];

  if (holidays[holidayIndex]) {
    holidays[holidayIndex] = {
      ...holidays[holidayIndex],
      status: status,
      ...(declineReason && { declineReason: declineReason }),
    };
  }

  const response = await fetch(employeePath(employeeId), {
    method: "PATCH",
    body: JSON.stringify({
      holidays: holidays,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating holiday status");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function updateEmployee({ employeeId, employeeData }) {
  const response = await fetch(employeePath(employeeId), {
    method: "PATCH",
    body: JSON.stringify(employeeData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating employee data");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}
