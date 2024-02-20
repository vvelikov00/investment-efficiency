import { Investment } from './components/Investment'

function App(): JSX.Element {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          height: '100vh',
          padding: 0,
          margin: 0
        }}
      >
        <Investment />
      </div>
    </>
  )
}

export default App
