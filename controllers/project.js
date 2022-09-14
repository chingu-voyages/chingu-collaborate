export async function getProjects() {
    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'GET',
        })
        return await response.json()
    } catch (err) {
        return err
    }
}

export async function deleteProjectIdea(id) {
    try {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}
