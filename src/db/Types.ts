export type User = {
  user_id: number;
  email: string;
  password: string;
  created_at: string;
};

export type Account = {
  account_id: number;
  user_id: number;
  account_name: string;
  account_type: string;
  balance: number;
};

export type Category = {
  category_id: number;
  category_name: string;
  isExpense: boolean;
};

export type Transaction = {
  transaction_id: number;
  user_id: number;
  account_id: number;
  isExpense: boolean;
  amount: number;
  date: string;
  description: string;
  category_id: number;
};
