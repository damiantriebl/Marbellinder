import { IP_ADDRESS } from '@env'

const getPlayers = async () => {
    try {
        //use your IP ADDRESS for JSON-SERVER to work
        const response = await fetch(`http://${IP_ADDRESS}:3000/players?isMatch=false`);
        return response.json();
    } catch (error) {
        return { errorMessage: 'error fetching players' }
    }
}

export default getPlayers;