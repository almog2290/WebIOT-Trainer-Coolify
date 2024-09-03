import axios from 'axios';

export const useGetFetch = () => {

    const fetchData = async (url , setData ,setIsPending , setError) => {

      setIsPending(true);

      try {

        const response = await axios.get(url);

        if (!response.data) {
          throw new Error("No data available");
        }

        setData(response.data);
        setError(null);
        
      } catch (err) {
        console.log(err);
        console.log(err.message);
        setError(err.message);
      }finally{
        setIsPending(false);
      }
      
    };

  return { fetchData };
};