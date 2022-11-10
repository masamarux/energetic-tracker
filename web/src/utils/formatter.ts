import { format } from 'date-fns'

export const priceFormatter = new Intl.NumberFormat('pt-Br', {
  style: 'currency',
  currency: 'BRL',
})

export const clearPriceFormatting = (price: number | string) => {
  return String(price).replace(/\./g, '').replace(',', '.')
}

export const dateFormatter = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy')
} 