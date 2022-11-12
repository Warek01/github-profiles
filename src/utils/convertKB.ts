/** Convert KiloBytes to MegaBytes/GigaBytes */
const convertKB = (amount: string | number): string => {
  let res: string | number

  if (typeof amount === 'string') res = parseInt(amount)
  else res = amount

  if (res > 2 ** 20) res = `${(res / 2 ** 20).toFixed(2)} GB`
  else if (res > 2 ** 10) res = `${(res / 2 ** 10).toFixed(2)} MB`
  else res = `${res} KB`

  return res
}

export default convertKB
