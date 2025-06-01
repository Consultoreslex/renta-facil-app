export const uploadPdfToDrive = async (blob: Blob) => {
  const base64 = await blobToBase64(blob)
  const response = await fetch('TU_WEBAPP_URL', {
    method: 'POST',
    headers: { 'Content-Type': blob.type },
    body: base64.split(',')[1], // Remove data:... prefix
  })
  const url = await response.text()
  return url
}

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
