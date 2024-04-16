import React, { createContext, useState, useContext } from 'react';

const ItineraryContext = createContext();

export const useItinerary = () => {
    return useContext(ItineraryContext);
};

export const ItineraryProvider = ({ children }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [city, setCity] = useState('');
    const [cityId, setCityId] = useState('');
    const [itineraryId, setItineraryId] = useState('');
    const [isReadOnly, setIsReadOnly] = useState('');

    const values = {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        city,
        setCity,
        cityId,
        setCityId,
        itineraryId,
        setItineraryId,
        isReadOnly, 
        setIsReadOnly
    };

    return (
        <ItineraryContext.Provider value={values}>
            {children}
        </ItineraryContext.Provider>
    );
};

export default ItineraryContext;
