import User from '../models/user'
import Project from '../models/project'

export function validateProjectBody(
    title,
    technologies,
    details,
    admin,
    timezone
) {
    if (title == undefined || title == '') {
        return 'Title parameter is required'
    } else if (technologies == undefined || technologies == '') {
        return 'Technologies parameter is required'
    } else if (details == undefined || details == '') {
        return 'Details parameter is required'
    } else if (admin == undefined || admin == '') {
        return 'admin parameter is required'
    } else if (timezone == undefined || timezone == '') {
        return 'timezone parameter is required'
    } else if (typeof title !== 'string') {
        return 'Title parameter should be string'
    } else if (title.length < 5 || title.length > 51) {
        return 'Title parameter length should be between 5 to 20 characters'
    } else if (technologies.length < 1) {
        return 'At least one technology should be selected'
    } else if (details.length < 250 || details.length > 800) {
        return 'Description should be between 250 to 800 characters'
    } else {
        return true
    }
}

export function validateUserBody(
    username,
    location,
    email,
    authenticatedDiscordId,
    discordUsername,
    preferredMethodOfContact,
    githubLink
) {
    if (location == undefined) {
        location = ''
    }
    if (githubLink == undefined) {
        githubLink = ''
    }
    if (username == undefined || username == '') {
        return 'username parameter is required'
    } else if (typeof username !== 'string') {
        return 'username parameter should be string'
    } else if (username.length < 4 || username.length > 17) {
        return 'username parameter length should be between 4 to 17'
    } else if (email == undefined || email == '') {
        return 'email parameter is required'
    } else if (!email.includes('@')) {
        return 'email format is invalid'
    } else if (
        authenticatedDiscordId == undefined ||
        authenticatedDiscordId == ''
    ) {
        return 'authenticatedDiscordId is required'
    } else if (discordUsername == undefined || discordUsername == '') {
        return 'discordUsername is required'
    } else if (!discordUsername.includes('#')) {
        return 'discordUsername format is invalid'
    } else if (
        preferredMethodOfContact == undefined ||
        preferredMethodOfContact == ''
    ) {
        return 'preferredMethodOfContact parameter is required'
    } else {
        if (location != '') {
            if (!location.includes(',')) {
                return 'location format is invalid'
            }
        }
        if (githubLink != '') {
            if (!githubLink.includes('https://github.com/')) {
                return 'Github link format is invalid'
            }
        }
        return true
    }
}

export async function existingUser(username, email) {
    const existingUsername = await User.findOne({
        username: username,
    })
    const existingEmail = await User.findOne({ email: email })
    if (existingUsername != null) {
        return 'Username is already taken'
    } else if (existingEmail != null) {
        return 'This email is already link to another account'
    } else {
        return true
    }
}

export async function existingProjectTitle(title) {
    const existingProjectTitle = await Project.findOne({
        title: title,
    })
    if (existingProjectTitle != null) {
        return 'Project Title is already taken'
    } else {
        return true
    }
}
