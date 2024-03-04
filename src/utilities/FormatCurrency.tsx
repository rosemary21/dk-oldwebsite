/* eslint-disable react-refresh/only-export-components */

const CURRENCYFORMATTER = new Intl.NumberFormat(undefined, {
    currency: "NGN",
    style: "currency"
})

export default function formatCurrency(number: number) {
    return CURRENCYFORMATTER.format(number)
}
