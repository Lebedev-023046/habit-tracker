export type GoogleAuthPayload = {
  accessToken: string;
  timezone?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
};
