

export const reset = () => {
    localStorage.setItem("functionalitiesEnabled", false)
}

export const enableFunctionalities = () => {
    localStorage.setItem("functionalitiesEnabled", true)
}

export const areFunctionalitiesEnabled = () => {
    return localStorage.getItem("enafunctionalitiesEnabledble")
}

