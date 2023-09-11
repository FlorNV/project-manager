export const formatDate = (date) => {
  const dateFormatted = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const hourFormatted = date
    .toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    })
    .toLowerCase()

  return `${dateFormatted} ${hourFormatted}`
}
