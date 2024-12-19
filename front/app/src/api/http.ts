const apiUrl = import.meta.env.API_URL;

function queryParameters(paramaters: any): string {
  return Object.keys(paramaters)
    .map((e: string) => `${e}=${paramaters[e]}`)
    .join("&");
}

export const get = async (
  endpoint: string,
  paramaters: any
): Promise<string | undefined> => {
  try {
    const params = queryParameters(paramaters);
    const response = await fetch(`${apiUrl}/${endpoint}?${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.text();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const get2 = async (endpoint: string) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const post = async (endpoint: string, data: string) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const patch = async (endpoint: string, data: string) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const borrar = async (endpoint: string, data: string) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};
