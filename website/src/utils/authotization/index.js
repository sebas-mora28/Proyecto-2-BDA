

export const reset = () => {
    localStorage.setItem("functionalitiesEnabled", false)
}

export const enableFunctionalities = () => {
    localStorage.setItem("functionalitiesEnabled", true)
}

export const areFunctionalitiesEnabled = () => {
    console.log("xd: ", !!localStorage.getItem("functionalitiesEnabled") === 'true')
    return localStorage.getItem("functionalitiesEnabled") === 'true'
}

