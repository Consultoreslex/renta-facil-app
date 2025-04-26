export const sendToGoogleSheet = async (data: any) => {
  try {
    await fetch(import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error enviando a Google Sheets:', error)
  }
}
 
