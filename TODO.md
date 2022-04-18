#TODO

##Add label to checkbox in report for expenses.
If checked, add that expense into the same day's cash.

##Add Date input box to form.

##Add capitization/character rules to transaction types:

only alphabet or [' ', '_', '-']

when displaying in front end, _ should be replaced by a space. Each Word Should Be Capitalized.

however, in back end, store words as all_lower_case_with_spaces_replaced_with_underscores.

Ie: "Direct Deposit" should be changed to "direct_deposit" on the back end, then changed back to "Direct Deposit" for front end.

direct_deposit Direct deposit Direct Deposit DIRECT_DEPOSIT etc should all be equal as far as the back end is concerned.