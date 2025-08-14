export const fetcher = (url) => fetch(url).then((res) => res.json());

export const createEmployee = async (url, { arg }) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    });

    if (!res.ok) throw new Error('Failed to create employee');
    return res.json();
};

export const updateEmployeeRequest = async (url, { arg }, method = "PUT") => {
    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error("Failed to update employee");
    return res.json();
};

export const deleteEmployeeRequest = async (url) => {
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete employee");
  }
  return res.json();
};
