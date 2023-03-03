import moment from 'moment'
import 'moment/locale/hu'

export function parseDate(date: string): Date | null {
	moment.locale('hu')
	const months = moment.localeData().months()
	const monthsShort = moment.localeData().monthsShort()
	date = date.replace('febr.', 'feb.')
	let dateArr = date.replace(/\./g, '').split(' ')
	dateArr[1] = (
		months.findIndex((x) => x.toLowerCase() === dateArr[1]) + 1 ||
		monthsShort.findIndex(
			(x) => x.toLowerCase().replace(/\./g, '') === dateArr[1]
		) + 1
	).toString()

	dateArr[1].length === 1 ? (dateArr[1] = `0${dateArr[1]}`) : null

	let m = moment.utc(
		`${dateArr[0]}-${dateArr[1]}-${dateArr[2]}T${dateArr[3]}:00+0${
			moment().utcOffset() / 60
		}:00`
	)
	return m.isValid() ? m.toDate() : null
}
