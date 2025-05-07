import { parse, startOfDay, endOfDay, isValid } from 'date-fns'

/**
 * 문자열로 된 timestart/timeend 범위에 선택 날짜(dateStr)가 포함되는지 판단
 */
export function isDateInRange(dateStr: string, startStr: string, endStr: string): boolean {
  try {
    const dayStart = startOfDay(new Date(dateStr))
    const dayEnd = endOfDay(new Date(dateStr))

    const start = parse(startStr, 'yyyy-MM-dd HH:mm', new Date())
    const end = parse(endStr, 'yyyy-MM-dd HH:mm', new Date())

    if (!isValid(start) || !isValid(end)) return false

    return start <= dayEnd && end >= dayStart
  } catch (e) {
    console.warn('[isDateInRange] 날짜 비교 중 오류:', e)
    return false
  }
}
