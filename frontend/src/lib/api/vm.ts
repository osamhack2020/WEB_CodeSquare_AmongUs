import { VmStatus } from "../../modules/vm";
import apiClient from "./apiClient";
import { ApiResponse } from "./auth";

export const getVm = async (): Promise<VmStatus> => {
  const {
    data: { data },
  } = await apiClient.get<ApiResponse<VmStatus>>("/vm");

  return data;
};
