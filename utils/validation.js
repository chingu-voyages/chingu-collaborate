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
    } else if (title.length < 5 || title.length > 21) {
        return 'Title parameter length should be between 5 to 20 characters'
    } else if (technologies.length < 1) {
        return 'At least one technology should be selected'
    } else if (details.length < 250 || details.length > 800) {
        return 'Description should be between 250 to 800 characters'
    } else {
        return true
    }
}
