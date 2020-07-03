export function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}
  
export function isMobile () {
    if (this.windowWidth <= 768) {
        return true
    } else {
        return false
    }
}

export function roundToTwo(num) {
    return +(Math.round(num + 'e+2')  + 'e-2')
}