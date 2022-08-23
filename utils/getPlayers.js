const getPlayers = async () => {
    try {
        //use your IP ADDRESS for JSON-SERVER to work
        const response = await fetch('http://192.168.0.13:3000/players');
        return response.json();
    } catch (error) {
        return { errorMessage: 'error fetching players' }
    }
}

export default getPlayers;