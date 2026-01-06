export interface IFetchResponse {
  json: () => Promise<any>;
  status: number;
  ok: boolean;
}
