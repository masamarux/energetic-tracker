import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getMonthName(month: number) {
  const date = new Date();
  if(month) date.setMonth(month);
  
  return format(new Date(date), "MMMM", { locale: ptBR });
}