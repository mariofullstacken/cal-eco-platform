export const normalizeAuthResponse = (data: any) => {
  if (!data) {
    return { access_token: "" };
  }
  return {
    ...data,
    access_token: data.access_token || data.authToken || data.auth_token || "",
  };
};
