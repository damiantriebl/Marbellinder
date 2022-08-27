import { IP_ADDRESS } from '@env'

const getMatches = async () => {
    try {
        //use your IP ADDRESS for JSON-SERVER to work
        const response = await fetch(`http://${IP_ADDRESS}:3000/players?isMatch=true`);
        return response.json();
    } catch (error) {
        return { errorMessage: 'error fetching matches' }
    }
}

export default getMatches;