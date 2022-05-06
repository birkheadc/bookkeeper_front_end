#TODO

##Add currency support. Back end is just holding the bare value (ie. 100 in back end would be 100 cents or $1.00 in usd, or 100 won in KRW or 100 yen in JPY).

Only thing that needs to change in back end is it needs to save the currency type in a setting.

Front end needs to recognize that "100" should be displayed as "$1.00", or "50" should be "0.50" in USD, but in KRW it should be "₩100" or "₩50" if KRW.

##Summary page needs a lot of work

###Include / ignore transaction types by check-box
###Calculate percentages.
ie Earnings: 58% cash 41% card 1% direct-deposit, Expenses: 48% restock 15% rent 13% electric 4% delivery fees etc etc.
Check a box to include / ignore numbers from this percentage as well

##Ability to browse by day/week/month/year

##Quick select buttons on summary prompt to automatically select today/this week/month/year, maybe select week/month of (x day)

##Password change function - back end is already fully in place