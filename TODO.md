#TODO

##Add label to checkbox in report for expenses.
If checked, add that expense into the same day's cash.

##Add currency support. Back end is just holding the bare value (ie. 100 in back end would be 100 cents or $1.00 in usd, or 100 won in KRW or 100 yen in JPY).

Only thing that needs to change in back end is it needs to save the currency type in a setting.

Front end needs to recognize that "100" should be displayed as "$1.00", or "50" should be "0.50" in USD, but in KRW it should be "₩100" or "₩50" if KRW.