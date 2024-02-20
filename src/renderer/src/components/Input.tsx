import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode, useRef, useState } from 'react'
import '../style/input.css'

export type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'id'
> & {
  id: string
  label?: string
  leftItem?: ReactNode | string
  rightItem?: string
  marginBottom?: string
}

export const Input: FC<InputProps> = ({
  label,
  id,
  leftItem,
  rightItem,
  marginBottom,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: marginBottom ?? '20px',
        width: '100%'
      }}
    >
      <label
        htmlFor={id}
        style={{
          fontWeight: 500
        }}
      >
        {label}
      </label>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          height: '40px',
          borderRadius: '5px',
          border: focused ? '1px solid #4d90fe' : '1px solid #d9d9d9',
          transition: 'border 0.2s'
        }}
        onClick={() => inputRef.current?.focus()}
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: '16px',
            padding: '0 5px'
          }}
        >
          {leftItem}
        </div>
        <input
          id={id}
          {...props}
          ref={inputRef}
          style={{
            height: '100%',
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            ...props.style
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <div
          style={{
            fontWeight: 500,
            fontSize: '16px',
            padding: '0 5px'
          }}
        >
          {rightItem}
        </div>
      </div>
    </div>
  )
}
