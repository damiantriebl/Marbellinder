const getMatches = async () => {
    try {
        //use your IP ADDRESS for JSON-SERVER to work
        const response = await fetch('http://192.168.0.13:3000/players?isMatch=true');
        return response.json();
    } catch (error) {
        return { errorMessage: 'error fetching matches' }
    }
}

export default getMatches;