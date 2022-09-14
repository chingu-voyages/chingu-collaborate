export function getNumberOfProjectsRequested(projects, session) {
    const requestedMembers = projects?.map(
        (project) => project?.requestedMembers
    )

    let counter = 0

    for (let i = 0; i < requestedMembers.length; i++) {
        for (let j = 0; j < requestedMembers[i].length; j++) {
            if (requestedMembers[i][j]._id === session?.dbUser._id) {
                counter++
            }
        }
    }

    return counter
}
