export const extractParams = (eventBody: any): any => {
    const decodedMsg = Buffer.from(eventBody, "base64").toString();
    return Object.fromEntries(
        new URLSearchParams(decodedMsg)
    )
}