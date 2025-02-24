import {useEffect, useState} from "react";
import {Alert} from "react-native";
import TabsLayout from "../app/(tabs)/_layout";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fn();

                setData(response);
            } catch (error) {
                Alert.alert('Opa!', error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return {data}
}

export default useAppwrite;