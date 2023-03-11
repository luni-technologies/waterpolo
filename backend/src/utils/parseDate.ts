import moment from 'moment-timezone'
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

	let m = moment.tz(
		`${dateArr[0]}-${dateArr[1]}-${dateArr[2]} ${dateArr[3]}`,
		'Europe/Budapest'
	)
	return m.isValid() ? m.toDate() : null
}
