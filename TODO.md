#TODO

##Add label to checkbox in report for expenses.
If checked, add that expense into the same day's cash.

##Add capitization/character rules to transaction types:

only alphabet or [' ', '_', '-']

when displaying in front end, _ should be replaced by a space. Each Word Should Be Capitalized.

however, in back end, store words as all_lower_case_with_spaces_replaced_with_underscores.

Ie: "Direct Deposit" should be changed to "direct_deposit" on the back end, then changed back to "Direct Deposit" for front end.

direct_deposit Direct deposit Direct Deposit DIRECT_DEPOSIT etc should all be equal as far as the back end is concerned.

##Add currency support. Back end is just holding the bare value (ie. 100 in back end would be 100 cents or $1.00 in usd, or 100 won in KRW or 100 yen in JPY).

Only thing that needs to change in back end is it needs to save the currency type in a setting.

Front end needs to recognize that "100" should be displayed as "$1.00", or "50" should be "0.50" in USD, but in KRW it should be "₩100" or "₩50" if KRW.