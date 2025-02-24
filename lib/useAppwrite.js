import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fn();
                setData(res);
            } catch (error) {
                Alert.alert("Error", error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return {data}
};

export default useAppwrite;