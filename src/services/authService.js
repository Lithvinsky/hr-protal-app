export function findUserByUsername(username, data) {
  if (!username || !data || !Array.isArray(data)) {
    return null;
  }

  const normalizedUsername = username.toLowerCase().trim();

  const user = data.find((el) => {
    if (el.email && el.email.toLowerCase() === normalizedUsername) {
      return true;
    }
    if (el.name && el.surname) {
      const fullName = `${el.name.toLowerCase()}.${el.surname.toLowerCase()}`;
      return fullName === normalizedUsername;
    }
    return false;
  });

  return user || null;
}

export function authenticate(username, password, data) {
  if (!username || !password) {
    return { success: false, message: "Username and password are required" };
  }

  if (!data || !Array.isArray(data)) {
    return { success: false, message: "Invalid data" };
  }

  const user = findUserByUsername(username, data);

  if (!user) {
    return { success: false, message: "Invalid username or email" };
  }

  if (user.password !== password) {
    return { success: false, message: "Invalid password" };
  }

  const sessionUserId = user.id ?? user._id?.toString();
  sessionStorage.setItem("user", user.name);
  sessionStorage.setItem("userId", sessionUserId);
  sessionStorage.setItem("userRole", user.role);
  return { success: true, message: "Login successful" };
}

/** After successful POST /api/employees/login (id, name, role only). */
export function storeSessionFromLoginPayload(user) {
  if (!user?.name || !user?.id || !user?.role) return;
  sessionStorage.setItem("user", user.name);
  sessionStorage.setItem("userId", String(user.id));
  sessionStorage.setItem("userRole", user.role);
}

export function isAuthenticated() {
  return sessionStorage.getItem("user") !== null;
}

export function getCurrentUserRole() {
  return sessionStorage.getItem("userRole");
}

export function getCurrentUser() {
  return sessionStorage.getItem("user");
}

export function getCurrentUserId() {
  return sessionStorage.getItem("userId");
}

export function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userRole");
  sessionStorage.removeItem("isAdmin");
}
