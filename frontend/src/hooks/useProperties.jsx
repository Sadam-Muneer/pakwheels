import { useQuery } from "react-query";
import { getAllCars } from "../utils/Api";
const useProperties = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    "allProperties",
    getAllCars,
    {
      refetchOnWindowFocus: false,
    }
  );
  return { data, isError, isLoading, refetch };
};
export default useProperties;
