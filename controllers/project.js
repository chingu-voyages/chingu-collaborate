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
