# TODO

## Add currency support. Back end is just holding the bare value (ie. 100 in back end would be 100 cents or $1.00 in usd, or 100 won in KRW or 100 yen in JPY).

Only thing that needs to change in back end is it needs to save the currency type in a setting.

Front end needs to recognize that "100" should be displayed as "$1.00", or "50" should be "0.50" in USD, but in KRW it should be "₩100" or "₩50" if KRW.

## Summary page needs a lot of work

### Include / ignore transaction types by check-box
### Calculate percentages.
ie Earnings: 58% cash 41% card 1% direct-deposit, Expenses: 48% restock 15% rent 13% electric 4% delivery fees etc etc.
Check a box to include / ignore numbers from this percentage as well

## It's possible that the way new default transactions are created in ReportForm.jsx will break something. The date format of the model created by the front-end is different than that of the one received from the back-end.

## Add ability to register multiple e-mail addresses to send reports to. The front-end should call an api end-point, supplying those addresses to send to. The back-end does not do this automatically like the last iteration.

## Add a 'summary' section to the report that comes from the back end to easier display average/totals/earning% for week/month

## Add Days of the Week above Week view / Month view, make Month view stagger so that day 1 starts in the right place and wraps to the next row on sunday

## Somehow make a week fit horizontally on the screen when on PC. Make everything scroll vertically on mobile

## Add Next/Prev buttons to browse screen to go to the next day/week/month depending on mode

## Reformat settings page

## Reformat log-in page