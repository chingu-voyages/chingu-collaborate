import { DateTime } from 'luxon'

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

export function getRelativeProjectDates(project) {
    const currentDate = DateTime.now()

    const creationDate = DateTime.fromISO(project?.createdAt)
    const creationDifference = creationDate?.diff(currentDate, [
        'days',
        'hours',
        'minutes',
    ])

    const durationSinceCreation = creationDifference.values

    const expirationDate = DateTime.fromISO(project?.expiresIn)
    const expirationDifference = expirationDate?.diff(currentDate, [
        'days',
        'hours',
        'minutes',
    ])

    const durationTillExpiration = expirationDifference.values

    return { durationTillExpiration, durationSinceCreation }
}

export function formatRelativeProjectDates({
    durationTillExpiration: expiry,
    durationSinceCreation: create,
}) {
    console.log(expiry)

    let expiresMessage = ''
    let createdMessage = ''

    // Expiration
    if (expiry.days > 0) {
        const daysTill = Math.floor(Math.abs(expiry.days))
        expiresMessage = `Expires in ${daysTill} days`
    } else {
        if (expiry.hours === 0) {
            const minutesTill = Math.floor(Math.abs(expiry.minutes))
            expiresMessage = `Expires in ${minutesTill} minutes`
        } else {
            const hoursTill = Math.floor(Math.abs(expiry.hours))
            const minutesTill = Math.floor(Math.abs(expiry.minutes))
            expiresMessage = `Expires in ${hoursTill} hours and ${minutesTill} minutes`
        }
    }

    // Creation
    if (create.days === 0) {
        if (create.hours === 0) {
            const minutesAgo = Math.floor(Math.abs(create.minutes))
            createdMessage = `Posted ${minutesAgo} minutes ago`
        } else {
            const hoursAgo = Math.floor(Math.abs(create.hours))
            const minutesAgo = Math.floor(Math.abs(create.minutes))
            createdMessage = `Posted ${hoursAgo} hours and ${minutesAgo} minutes ago`
        }
    } else {
        const daysAgo = Math.floor(Math.abs(create.days))
        createdMessage = `Posted ${daysAgo} days ago`
    }

    return { expiresMessage, createdMessage }
}
