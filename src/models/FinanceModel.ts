export interface FinanceInfo {
  id: number;
  value: string;
  description?: string;
  type: 'INCOME' | 'EXPENSE';
}

export class FinanceModel {
  id: number;
  value: string;
  description: string;
  type: string;

  constructor(finance: FinanceInfo) {
    this.id = finance.id;
    this.value = finance.value;
    this.description = finance.description || 'Sem descrição';
    this.type = finance.type;
  }
}
