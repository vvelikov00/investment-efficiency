import { ReactNode, useState } from 'react'
import { Input } from './Input'

export const Investment = (): ReactNode => {
  const [discountRate, setDiscountRate] = useState<string>('0')
  const [initialInvestment, setInitialInvestment] = useState<string>('0')
  const [table, setTable] = useState<{ n: number; value: string | undefined }[]>([
    { n: 1, value: undefined }
  ])
  const [hovered, setHovered] = useState<number>(-1)
  const [result, setResult] = useState<string>('')
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px',
        width: 'max-content',
        height: '100vh',
        padding: '10px 20px',
        margin: 0
      }}
    >
      <Input
        label="Дисконтна ставка"
        id="discountRate"
        type="number"
        min={0}
        max={100}
        step={0.01}
        defaultValue={0}
        rightItem="%"
        required
        value={discountRate}
        onChange={(e) => setDiscountRate(e.target.value)}
      />
      <Input
        label="Първоначална инвестиция"
        id="initialInvestment"
        type="number"
        min={0}
        rightItem="лв."
        required
        value={initialInvestment}
        onChange={(e) => setInitialInvestment(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Парични потоци</th>
          </tr>
        </thead>
        <tbody>
          {table.map(({ n, value }, i) => (
            <tr key={n} onMouseOver={() => setHovered(i)} onMouseLeave={() => setHovered(-1)}>
              <td
                align="center"
                style={{
                  width: '40px'
                }}
              >
                {hovered === i ? (
                  <button
                    style={{
                      width: '100%!important',
                      height: '100%',
                      padding: '5px 10px'
                    }}
                    onClick={() => {
                      const newTable = [...table]
                      newTable.filter((_, index) => index !== i)
                      setTable(newTable)
                    }}
                  >
                    -
                  </button>
                ) : (
                  i + 1
                )}
              </td>
              <td>
                <Input
                  key={i}
                  id={`table-cell-${i}`}
                  type="number"
                  min={0}
                  rightItem="лв."
                  required
                  onChange={(e) => {
                    const newTable = [...table]
                    newTable[i] = { n: i + 1, value: e.target.value }
                    setTable(newTable)
                  }}
                  value={value ?? ''}
                  marginBottom="0px"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td
              style={{
                padding: '0 10px'
              }}
            ></td>
            <td>
              <button
                style={{
                  width: '100%',
                  height: '100%'
                }}
                onClick={() => setTable([...table, { n: table.length + 1, value: undefined }])}
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        style={{
          width: '100%',
          marginTop: '20px'
        }}
        onClick={(e) => {
          e.preventDefault()
          let sum = 0
          table.forEach((value, i) => {
            sum += Number(value.value) / Math.pow(1 + Number(discountRate) / 100, i + 1)
          })
          setResult((sum - Number(initialInvestment)).toFixed(2))
        }}
      >
        Изчисли
      </button>
      {result && <Input label="Резултат" id="result" value={result} rightItem="лв." disabled />}
    </div>
  )
}
