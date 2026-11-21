import { education, record } from '../content/record'
import { Section } from './Section'

export function RecordTable() {
  return (
    <Section id="record" title="Record" aside="Where I have worked and what changed while I was there, newest first.">
      <table className="w-full border-collapse text-left">
        <thead className="max-md:sr-only">
          <tr className="border-b border-ink font-display text-lg">
            <th scope="col" className="w-[9.5rem] py-2 pr-4 font-semibold">
              Dates
            </th>
            <th scope="col" className="w-[32%] py-2 pr-4 font-semibold">
              Role
            </th>
            <th scope="col" className="py-2 font-semibold">
              What changed
            </th>
          </tr>
        </thead>
        <tbody>
          {record.map((entry) => (
            <tr key={`${entry.company}-${entry.dates}`} className="border-b border-rule align-top max-md:block max-md:py-5 max-md:first:pt-0">
              <td className="py-4 pr-4 text-[0.95rem] text-pencil max-md:block max-md:p-0">{entry.dates}</td>
              <th scope="row" className="py-4 pr-4 font-normal max-md:block max-md:p-0 max-md:pt-1">
                <span className="block font-display text-xl font-semibold leading-tight">{entry.role}</span>
                <span className="block text-[0.95rem] text-pencil">{entry.company}</span>
              </th>
              <td className="py-4 text-[0.975rem] max-md:block max-md:p-0 max-md:pt-2">{entry.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6">
        <span className="font-display text-xl font-semibold">{education.degree}</span>
        <span className="block text-[0.95rem] text-pencil">
          {education.school}, {education.dates}
        </span>
      </p>
    </Section>
  )
}
