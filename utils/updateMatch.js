import { IP_ADDRESS } from '@env'

const updateMatch = async (id, updateMatch) => {
    try {
        //use your IP ADDRESS for JSON-SERVER to work
        const response = await fetch(`http://${IP_ADDRESS}:3000/players/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isMatch: updateMatch })
        });
        return response.json();
    } catch (error) {
        return { errorMessage: 'error updating match' }
    }
}

export default updateMatch;