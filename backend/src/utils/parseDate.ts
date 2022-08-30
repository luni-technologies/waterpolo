import moment from 'moment'

const monthMap = [
	{
		index: '01',
		value: 'jan',
	},
	{
		index: '02',
		value: 'febr',
	},
	{
		index: '03',
		value: 'márc',
	},
	{
		index: '04',
		value: 'ápr',
	},
	{
		index: '05',
		value: 'máj',
	},
	{
		index: '06',
		value: 'jún',
	},
	{
		index: '07',
		value: 'júl',
	},
	{
		index: '08',
		value: 'aug',
	},
	{
		index: '09',
		value: 'szept',
	},
	{
		index: '10',
		value: 'okt',
	},
	{
		index: '11',
		value: 'nov',
	},
	{
		index: '12',
		value: 'dec',
	},
]

export function parseDate(date: string): Date | null {
	let dateArr = date.replace(/\./g, '').split(' ')
	dateArr[1] = monthMap.find((x) => x.value == dateArr[1])?.index!

	let m = moment.utc(
		`${dateArr[0]}-${dateArr[1]}-${dateArr[2]}T${dateArr[3]}:00+02:00`
	)
	return m.isValid() ? m.toDate() : null
}
