export type UserData = {
  login: string;
  password: string;
};

export const getUserCookie = async () => {
  try {
    const response = await fetch("user");
    return response.json();
  } catch (error) {}
};

export const register = async ({ login, password }: UserData) => {
  const abortController = new AbortController();
  try {
    const response = await fetch("user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    // abortController.abort();
  }
};

export const login = async ({ login, password }: UserData) => {
  const abortController = new AbortController();
  try {
    const response = await fetch("user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    // abortController.abort();
  }
};
