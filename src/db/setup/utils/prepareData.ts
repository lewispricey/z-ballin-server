import {
  AccountData,
  CategoryData,
  UserData,
  TransactionData,
} from "../data/Types";

export const prepareUsers: any = (usersData: UserData[]) => {
  return usersData.map((user) => {
    return [user.email, user.password];
  });
};

export const prepareCategories: any = (categorysData: CategoryData[]) => {
  return categorysData.map((category) => {
    return [category.category_name, category.isExpense];
  });
};

export const prepareAccounts: any = (
  accountsData: AccountData[],
  users: any
) => {
  const userLookup: any = {};

  users.forEach((user: any) => {
    userLookup[user.email] = user.user_id;
  });

  return accountsData.map(({ email, account_name, account_type, balance }) => {
    return [userLookup[email], account_name, account_type, balance];
  });
};

export const prepareTransactions: any = (
  transactionsData: TransactionData[],
  accounts: any,
  categories: any
) => {
  const accountLookup: any = {};

  accounts.forEach((account: any) => {
    accountLookup[account.account_name] = {
      accountId: account.account_id,
      userId: account.user_id,
    };
  });

  const categoryLookup: any = {};

  categories.forEach((category: any) => {
    categoryLookup[category.category_name] = category.category_id;
  });

  return transactionsData.map((transaction) => {
    return [
      accountLookup[transaction.account_name].userId,
      accountLookup[transaction.account_name].accountId,
      transaction.isExpense,
      transaction.amount,
      transaction.date,
      transaction.description,
      categoryLookup[transaction.category_name],
    ];
  });
};
