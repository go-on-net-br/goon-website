export function buildMediaQPs(field: string) {
    return `populate[${field}][fields][0]=width&populate[${field}][fields][1]=height&populate[${field}][fields][2]=url`
}