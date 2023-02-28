import { Utils } from "..";

export default function retrieveExpenseCategories() {
  try {
    const settings = JSON.parse(window.localStorage.getItem('settings'))
    return settings.expenseCategories;
  }
  catch {
    Utils.devlog('Expense Categories not found');
    return [];
  }
}