export async function getProjects(context) {
    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'GET',
            headers: {
                Cookie: context.req.headers.cookie,
            },
        })
        return await response.json()
    } catch (err) {
        return err
    }
}

export async function getProjectById(context) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/projects/${context.params.id}`,
            {
                method: 'GET',
                headers: {
                    Cookie: context.req.headers.cookie,
                },
            }
        )
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

export async function patchProject(id, formDataProject) {
    try {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataProject),
        })

        console.log(response)

        if (!response.ok) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}
