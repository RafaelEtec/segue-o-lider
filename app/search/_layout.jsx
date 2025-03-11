import React from 'react';
import {useGlobalContext} from "../../context/GlobalProvider";
import Loader from "../../components/Loader";

const SearchLayout = () => {
    const {loading} = useGlobalContext();

    return (
        <>
            <Loader isLoading={loading} />
        </>
    )
}
export default SearchLayout