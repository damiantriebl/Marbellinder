import { IP_ADDRESS } from '@env'

const updateMatch = async (id, updateElementMatch) => {
    try {
        //use your IP ADDRESS for JSON-SERVER to work
        const response = await fetch(`http://${IP_ADDRESS}:3000/players/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isMatch: updateElementMatch })
        });
        return response.json();
    } catch (error) {
        return { errorMessage: 'error updating match' }
    }
}

export default updateMatch;