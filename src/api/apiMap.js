const apiMap = () => {
    const getCoordinatesFromAddress = async (street, postcode, city, country = '') => {
        const query = `${street.replace(' ', '+')},+${postcode.replace(/\s/g, '')},+${city.replace(' ', '+')},+${country.replace(' ', '+')}`

        const res = await fetch('https://nominatim.openstreetmap.org/search?q='+query+'&format=json&polygon_geojson=1&addressdetails=1', {
            type: "GET"
        });
        
        return await res.json();
    };

    return {
        getCoordinatesFromAddress
    }
}
export default apiMap;
