export type UserData = {
  email: string;
  password: string;
};

export type AccountData = {
  email: string;
  account_name: string;
  account_type: string;
  balance: number;
};

export type CategoryData = {
  category_name: string;
  isExpense: boolean;
};

export type TransactionData = {
  email: string;
  account_name: string;
  isExpense: boolean;
  amount: number;
  date: string;
  description: string;
  category_name: string;
};

export type DataTypes = {
  users: UserData[];
  accounts: AccountData[];
  categories: CategoryData[];
  transactions: TransactionData[];
};
