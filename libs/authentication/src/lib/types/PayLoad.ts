export type Payload = {
  sub: string;
  email: string;
};

export interface PayLoadWithToken extends Payload {
  refreshToken: string;
}
